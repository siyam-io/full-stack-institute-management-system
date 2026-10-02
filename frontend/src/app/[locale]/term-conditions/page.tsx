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
  const filePath = path.join(process.cwd(), `content/${locale}/terms.json`);
  let data: any = { title: "Terms & Conditions" };
  
  try {
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    console.error("Error loading terms metadata:", e);
  }

  return {
    title: `${data.title} | Culinary Academy`,
    description: `Read the official ${data.title} of Culinary Academy.`,
    alternates: {
      canonical: `https://culinaryacademy.com/${locale}/term-conditions`,
      languages: {
        'en': 'https://culinaryacademy.com/en/term-conditions',
        'bn': 'https://culinaryacademy.com/bn/term-conditions',
        'x-default': 'https://culinaryacademy.com/en/term-conditions',
      }
    }
  };
}

export default function TermConditionsPage({ params: { locale } }: Props) {
  const filePath = path.join(process.cwd(), `content/${locale}/terms.json`);
  let data: any = { title: "Terms & Conditions", lastUpdated: "", content: [] };
  
  try {
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (error) {
    console.error("Error loading terms page data:", error);
  }

  return (
    <LegalPage 
      title={data.title}
      lastUpdated={data.lastUpdated}
      content={data.content}
    />
  );
}
