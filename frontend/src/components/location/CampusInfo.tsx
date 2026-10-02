import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface Campus {
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
}

interface CampusInfoProps {
  campus: Campus;
}

export default function CampusInfo({ campus }: CampusInfoProps) {
  const infoItems = [
    {
      icon: MapPin,
      label: 'Address',
      value: campus.address,
      href: null,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: campus.phone,
      href: `tel:${campus.phone}`,
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: campus.whatsapp,
      href: `https://wa.me/880${campus.whatsapp.replace(/^\+880/, '').replace(/-/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: campus.email,
      href: `mailto:${campus.email}`,
    },
    {
      icon: Clock,
      label: 'Hours',
      value: campus.hours,
      href: null,
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Get in Touch
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          const content = (
            <>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-500/20 mb-4">
                <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {item.label}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed break-words">
                {item.value}
              </p>
            </>
          );

          return (
            <div
              key={index}
              className="p-6 rounded-xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-lg border border-white/20 dark:border-white/10 hover:bg-white/90 dark:hover:bg-slate-800/70 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="block text-gray-900 dark:text-white no-underline hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {content}
                </a>
              ) : (
                <div>{content}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
