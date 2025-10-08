import { useState } from 'react';
import ContactCard from './ContactCard';
import QRCodeModal from './QRCodeModal';

// Helper function to get public assets with correct base path
function getPublicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
}

// QR code URLs
const QR_CODES = {
  wechat: getPublicAsset('/qr-codes/wechat-qr-latest.png'),
  rednote: getPublicAsset('/qr-codes/rednote-qr-latest.png'),
  bilibili: getPublicAsset('/qr-codes/bilibili-qr-latest.png')
};

export default function ContactMethods() {
  const [activeModal, setActiveModal] = useState<'wechat' | 'rednote' | 'bilibili' | null>(null);

  const contactMethods = [
    {
      id: 'wechat',
      title: 'WeChat',
      subtitle: 'Scan QR code to add us on WeChat',
      color: 'rgb(7, 193, 96)',
      icon: (
        <svg className="w-7 h-7" style={{ color: 'rgb(7, 193, 96)' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
        </svg>
      ),
      onClick: () => setActiveModal('wechat')
    },
    {
      id: 'rednote',
      title: 'RedNote',
      subtitle: 'Follow us on 小红书 for updates',
      color: 'rgb(255, 45, 85)',
      icon: (
        <svg className="w-7 h-7" style={{ color: 'rgb(255, 45, 85)' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-13h4v2h-4zm0 4h4v2h-4zm0 4h4v2h-4z"/>
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <text x="12" y="16" fontSize="10" fill="currentColor" textAnchor="middle" fontWeight="bold">小</text>
        </svg>
      ),
      onClick: () => setActiveModal('rednote')
    },
    {
      id: 'bilibili',
      title: 'Bilibili',
      subtitle: 'Watch our videos and follow us',
      color: 'rgb(0, 161, 214)',
      icon: (
        <svg className="w-7 h-7" style={{ color: 'rgb(0, 161, 214)' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/>
        </svg>
      ),
      onClick: () => setActiveModal('bilibili')
    },
    {
      id: 'email',
      title: 'Email',
      subtitle: 'Send us an email directly',
      color: 'rgb(168, 85, 247)',
      icon: (
        <svg className="w-7 h-7" style={{ color: 'rgb(168, 85, 247)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: 'mailto:contact@sinthome.org',
      isEmail: true
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--theme-text-primary)' }}>
          Connect With Us
        </h2>
        <p className="text-lg" style={{ color: 'var(--theme-text-muted)' }}>
          Choose your preferred platform to get in touch
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {contactMethods.map((method) => (
          <ContactCard
            key={method.id}
            title={method.title}
            subtitle={method.subtitle}
            icon={method.icon}
            color={method.color}
            onClick={method.id !== 'email' ? method.onClick : undefined}
            href={method.href}
            isEmail={method.isEmail}
          />
        ))}
      </div>

      {/* QR Code Modals */}
      <QRCodeModal
        isOpen={activeModal === 'wechat'}
        onClose={() => setActiveModal(null)}
        platform="wechat"
        qrCodeUrl={QR_CODES.wechat}
      />
      <QRCodeModal
        isOpen={activeModal === 'rednote'}
        onClose={() => setActiveModal(null)}
        platform="rednote"
        qrCodeUrl={QR_CODES.rednote}
      />
      <QRCodeModal
        isOpen={activeModal === 'bilibili'}
        onClose={() => setActiveModal(null)}
        platform="bilibili"
        qrCodeUrl={QR_CODES.bilibili}
      />

      {/* Additional Information */}
      <div className="mt-16 text-center">
        <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>
          Response time: Usually within 24-48 hours
        </p>
        <p className="text-xs mt-2" style={{ color: 'var(--theme-text-secondary)' }}>
          For urgent matters, please contact us via WeChat
        </p>
      </div>
    </div>
  );
}