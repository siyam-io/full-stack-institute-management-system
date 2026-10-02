'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  locale: string;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
    
    try {
      fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: typeof window !== 'undefined' ? window.location.href : '',
          message: error.message || String(error),
          stack: error.stack || errorInfo.componentStack || '',
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error('Failed to log error to API:', err));
    } catch (e) {
      console.error('Error logging failed:', e);
    }
  }

  public componentDidMount() {
    if (typeof window !== 'undefined') {
      const handleWindowError = (event: ErrorEvent) => {
        try {
          fetch('/api/log-error', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: window.location.href,
              message: event.message || 'Window error',
              stack: event.error?.stack || '',
              timestamp: new Date().toISOString()
            })
          }).catch(err => console.error('Failed to log window error:', err));
        } catch (e) {
          console.error(e);
        }
      };

      const handlePromiseRejection = (event: PromiseRejectionEvent) => {
        try {
          fetch('/api/log-error', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: window.location.href,
              message: event.reason?.message || String(event.reason) || 'Unhandled promise rejection',
              stack: event.reason?.stack || '',
              timestamp: new Date().toISOString()
            })
          }).catch(err => console.error('Failed to log promise rejection:', err));
        } catch (e) {
          console.error(e);
        }
      };

      window.addEventListener('error', handleWindowError);
      window.addEventListener('unhandledrejection', handlePromiseRejection);

      (this as any)._cleanup = () => {
        window.removeEventListener('error', handleWindowError);
        window.removeEventListener('unhandledrejection', handlePromiseRejection);
      };
    }
  }

  public componentWillUnmount() {
    if ((this as any)._cleanup) {
      (this as any)._cleanup();
    }
  }

  public render() {
    if (this.state.hasError) {
      const isBn = this.props.locale === 'bn';
      return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center px-4 py-16 text-center">
          <div className="glass-card max-w-md p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-power-red/15 rounded-full blur-2xl"></div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4 animate-pulse">
              {isBn ? 'কিছু একটা ভুল হয়েছে' : 'Something Went Wrong'}
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              {isBn 
                ? 'দুঃখিত, অ্যাপ্লিকেশনটি লোড করতে সমস্যা হয়েছে। আমাদের কারিগরি টিমকে জানানো হয়েছে।' 
                : 'An unexpected error occurred. Our technical team has been notified.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                if (typeof window !== 'undefined') window.location.reload();
              }}
              className="btn-primary w-full py-4 text-center font-bold tracking-widest text-xs uppercase"
            >
              {isBn ? 'পেজটি রিলোড করুন' : 'Reload Page'}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
