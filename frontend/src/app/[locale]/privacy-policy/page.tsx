import React from 'react';
import fs from 'fs';
import path from 'path';
import LegalPage from '@/components/legal/LegalPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const filePath = path.join(process.cwd(), `content/${locale}/privacy.json`);
  let data: any = { title: "Privacy Policy" };
  
  try {
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    console.error("Error loading privacy metadata:", e);
  }

  return {
    title: `${data.title} | CIB`,
    description: `Read the official ${data.title} of The Culinary Institute of Bangladesh.`,
    alternates: {
      canonical: `https://cibdhk.com/${locale}/privacy-policy`,
      languages: {
        'en': 'https://cibdhk.com/en/privacy-policy',
        'bn': 'https://cibdhk.com/bn/privacy-policy',
        'x-default': 'https://cibdhk.com/en/privacy-policy',
      }
    }
  };
}

export default function PrivacyPolicyPage({ params: { locale } }: Props) {
  const filePath = path.join(process.cwd(), `content/${locale}/privacy.json`);
  let data: any = { title: "Privacy Policy", lastUpdated: "", content: [] };
  
  try {
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading privacy page data:", error);
  }

  return (
    <LegalPage 
      title={data.title}
      lastUpdated={data.lastUpdated}
      content={data.content}
    />
  );
}
