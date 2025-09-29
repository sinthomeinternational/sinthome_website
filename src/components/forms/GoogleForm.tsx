import { useState } from 'react';

interface GoogleFormProps {
  formId: string;
  title: string;
  height?: string;
  className?: string;
  showLink?: boolean;
  linkText?: string;
}

export default function GoogleForm({
  formId,
  title,
  height = "600px",
  className = "",
  showLink = true,
  linkText = "Open form in new tab"
}: GoogleFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const formUrl = `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`;
  const directUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;

  return (
    <div className={`google-form-container ${className}`}>
      <div className="relative" style={{ minHeight: height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 rounded-lg">
            <div className="text-white">Loading form...</div>
          </div>
        )}

        <iframe
          src={formUrl}
          width="100%"
          height={height}
          style={{
            border: 0,
            display: isLoading ? 'none' : 'block',
            minHeight: height
          }}
          title={title}
          onLoad={() => setIsLoading(false)}
          className="rounded-lg bg-white"
        >
          Loading…
        </iframe>
      </div>

      {showLink && (
        <div className="mt-4 text-center">
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors underline"
          >
            {linkText}
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>
      )}
    </div>
  );
}