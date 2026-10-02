'use client';

import React from 'react';

interface ContactInfoProps {
  data: {
    address: string;
    phone: { number: string; label: string };
    whatsapp: { number: string; label: string };
    email: { address: string; secondaryAddress?: string; label: string };
    hours: { label: string; schedule: string };
  };
}

import { MapPin, Phone, MessageCircle, Clock, Mail } from 'lucide-react';

const ContactInfo = ({ data }: ContactInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      {/* Address */}
      <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-700 shadow-2xl relative overflow-hidden animate-fade-in">
        <div className="absolute top-0 left-0 w-full h-1 bg-prestige-gold opacity-30"></div>
        <div className="mb-6 p-4 bg-white/5 rounded-2xl text-prestige-gold group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl border border-white/5">
          <MapPin className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <h4 className="font-bold text-white mb-4 tracking-tight text-lg">Institutional Location</h4>
        <p className="text-gray-400 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
          {data.address}
        </p>
      </div>

      {/* Phone */}
      <a 
        href={`tel:${data.phone.number.replace(/\s+/g, '')}`} 
        className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-700 shadow-2xl relative overflow-hidden animate-fade-in [animation-delay:100ms]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-power-red opacity-30"></div>
        <div className="mb-6 p-4 bg-white/5 rounded-2xl text-power-red group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl border border-white/5">
          <Phone className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <h4 className="font-bold text-white mb-4 tracking-tight text-lg">{data.phone.label}</h4>
        <p className="text-gray-400 text-base font-bold tracking-tight">{data.phone.number}</p>
      </a>

      {/* WhatsApp */}
      <a 
        href={`https://wa.me/${data.whatsapp.number.replace(/[^0-9]/g, '')}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-700 shadow-2xl relative overflow-hidden animate-fade-in [animation-delay:200ms]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 opacity-30"></div>
        <div className="mb-6 p-4 bg-white/5 rounded-2xl text-green-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl border border-white/5">
          <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <h4 className="font-bold text-white mb-4 tracking-tight text-lg">{data.whatsapp.label}</h4>
        <p className="text-gray-400 text-base font-bold tracking-tight">{data.whatsapp.number}</p>
      </a>

      {/* Email */}
      <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-700 shadow-2xl relative overflow-hidden animate-fade-in [animation-delay:250ms]">
        <div className="absolute top-0 left-0 w-full h-1 bg-prestige-gold opacity-30"></div>
        <div className="mb-6 p-4 bg-white/5 rounded-2xl text-prestige-gold group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl border border-white/5">
          <Mail className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <h4 className="font-bold text-white mb-4 tracking-tight text-lg">{data.email.label}</h4>
        <div className="flex flex-col gap-2">
          <a href={`mailto:${data.email.address}`} className="text-gray-400 text-sm font-bold hover:text-prestige-gold transition-colors break-all">
            {data.email.address}
          </a>
          {data.email.secondaryAddress && (
            <a href={`mailto:${data.email.secondaryAddress}`} className="text-gray-400 text-sm font-bold hover:text-prestige-gold transition-colors break-all">
              {data.email.secondaryAddress}
            </a>
          )}
        </div>
      </div>

      {/* Hours */}
      <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-700 shadow-2xl relative overflow-hidden animate-fade-in [animation-delay:300ms]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-400 opacity-30"></div>
        <div className="mb-6 p-4 bg-white/5 rounded-2xl text-gray-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl border border-white/5">
          <Clock className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <h4 className="font-bold text-white mb-4 tracking-tight text-lg">{data.hours.label}</h4>
        <p className="text-gray-400 text-[10px] font-bold tracking-widest">{data.hours.schedule}</p>
      </div>
    </div>
  );
};

export default ContactInfo;
