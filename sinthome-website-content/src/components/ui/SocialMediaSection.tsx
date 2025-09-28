import { useState } from 'react';
import SocialMediaButton from './SocialMediaButton';
import SocialMediaModal from './SocialMediaModal';

interface SocialPlatform {
  id: string;
  name: string;
  url: string;
  handle?: string;
  show: boolean;
}

interface SocialMediaSectionProps {
  config: any;
}

export default function SocialMediaSection({ config }: SocialMediaSectionProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const socialPlatforms: SocialPlatform[] = [
    {
      id: 'twitter',
      name: 'Twitter',
      url: config.urls.twitter,
      handle: config.social.twitter,
      show: true
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: config.urls.instagram,
      handle: config.social.instagram,
      show: true
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: config.urls.linkedin,
      handle: config.social.linkedin,
      show: true
    },
    {
      id: 'github',
      name: 'GitHub',
      url: config.urls.github,
      handle: config.social.github,
      show: true
    },
    {
      id: 'facebook',
      name: 'Facebook',
      url: config.urls.facebook,
      handle: config.social.facebook,
      show: true
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: config.urls.youtube,
      handle: 'sinthome',
      show: true
    },
    {
      id: 'wechat',
      name: 'WeChat',
      url: config.urls.wechat,
      handle: 'sinthome',
      show: true
    },
    {
      id: 'bilibili',
      name: 'Bilibili',
      url: config.urls.bilibili,
      handle: 'sinthome',
      show: true
    },
    {
      id: 'xiaohongshu',
      name: 'Xiaohongshu',
      url: config.urls.xiaohongshu,
      handle: 'sinthome',
      show: true
    }
  ];

  const visiblePlatforms = socialPlatforms.filter(p => p.show);

  return (
    <>
      {visiblePlatforms.map((platform) => (
        <div key={platform.id} className="flex flex-col items-center gap-2">
          <SocialMediaButton
            platform={platform.id}
            onClick={() => setActiveModal(platform.id)}
            size="lg"
          />
          <span className="text-sm text-gray-600">{platform.name}</span>
        </div>
      ))}

      {visiblePlatforms.map((platform) => (
        <SocialMediaModal
          key={platform.id}
          isOpen={activeModal === platform.id}
          onClose={() => setActiveModal(null)}
          platform={platform.id}
          url={platform.url}
          handle={platform.handle}
        />
      ))}
    </>
  );
}