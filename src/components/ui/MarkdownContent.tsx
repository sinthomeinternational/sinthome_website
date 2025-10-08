import React from 'react';
import '../../styles/markdown-content.css';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * A robust markdown renderer that handles common markdown syntax
 * with proper typography for dark backgrounds.
 *
 * Features:
 * - Headers (##, ###)
 * - Bold and italic text
 * - Lists (unordered)
 * - Proper paragraph spacing
 * - Links
 * - Blockquotes
 * - Code (inline)
 * - Optimized typography for dark backgrounds
 */
export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {

  const parseMarkdown = (text: string): React.ReactElement[] => {
    const elements: React.ReactElement[] = [];
    // Normalize all line endings (CRLF, CR, literal \n) to LF
    const normalizedText = text
      .replace(/\r\n/g, '\n')  // Windows CRLF -> LF
      .replace(/\r/g, '\n')    // Old Mac CR -> LF
      .replace(/\\n/g, '\n'); // Literal \n -> LF
    const paragraphs = normalizedText.split(/\n\s*\n/).filter(para => para.trim());

    paragraphs.forEach((paragraph, idx) => {
      const trimmed = paragraph.trim();

      // Skip empty paragraphs
      if (!trimmed) return;

      // Headers - only process first line of the block as header
      const lines = trimmed.split('\n');
      const firstLine = lines[0];

      if (firstLine.startsWith('### ')) {
        elements.push(
          <h5 key={idx} className="text-lg font-semibold text-white mt-8 mb-4 border-l-2 border-red-600 pl-4">
            {parseInlineMarkdown(firstLine.substring(4))}
          </h5>
        );
        // Process remaining lines as separate content if they exist
        if (lines.length > 1) {
          const remainingContent = lines.slice(1).join('\n').trim();
          if (remainingContent) {
            elements.push(...parseMarkdown(remainingContent));
          }
        }
        return;
      }

      if (firstLine.startsWith('## ')) {
        elements.push(
          <h4 key={idx} className="text-xl font-bold text-white mt-8 mb-4 border-l-4 border-red-600 pl-4">
            {parseInlineMarkdown(firstLine.substring(3))}
          </h4>
        );
        // Process remaining lines as separate content if they exist
        if (lines.length > 1) {
          const remainingContent = lines.slice(1).join('\n').trim();
          if (remainingContent) {
            elements.push(...parseMarkdown(remainingContent));
          }
        }
        return;
      }

      if (firstLine.startsWith('# ')) {
        elements.push(
          <h3 key={idx} className="text-2xl font-bold text-white mt-8 mb-6 border-l-4 border-red-600 pl-4">
            {parseInlineMarkdown(firstLine.substring(2))}
          </h3>
        );
        // Process remaining lines as separate content if they exist
        if (lines.length > 1) {
          const remainingContent = lines.slice(1).join('\n').trim();
          if (remainingContent) {
            elements.push(...parseMarkdown(remainingContent));
          }
        }
        return;
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        const quoteContent = trimmed.split('\n')
          .map(line => line.replace(/^>\s?/, ''))
          .join(' ');

        elements.push(
          <blockquote key={idx} className="border-l-4 border-red-600 pl-6 py-4 my-6 bg-zinc-900/30 rounded-r-lg">
            <p className="text-lg text-zinc-400 italic leading-relaxed">
              {parseInlineMarkdown(quoteContent)}
            </p>
          </blockquote>
        );
        return;
      }

      // Lists
      if (trimmed.includes('- ') || trimmed.startsWith('- ')) {
        const listItems = trimmed.split('\n')
          .filter(line => line.trim().startsWith('- '))
          .map(line => line.trim().substring(2).trim());

        if (listItems.length > 0) {
          elements.push(
            <ul key={idx} className="list-none space-y-3 my-6 ml-0">
              {listItems.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-3 text-zinc-300 leading-relaxed">
                  <span className="text-red-500 font-bold mt-1 flex-shrink-0">→</span>
                  <span>{parseInlineMarkdown(item)}</span>
                </li>
              ))}
            </ul>
          );
          return;
        }
      }

      // Regular paragraphs
      elements.push(
        <p key={idx} className="text-zinc-300 mb-6 leading-relaxed text-base">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });

    return elements;
  };

  const parseInlineMarkdown = (text: string): React.ReactNode => {
    // Handle links first to avoid conflicts
    let processed = text;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links: Array<{ text: string; url: string; placeholder: string }> = [];

    let linkMatch;
    while ((linkMatch = linkRegex.exec(text)) !== null) {
      const placeholder = `__LINK_${links.length}__`;
      links.push({
        text: linkMatch[1],
        url: linkMatch[2],
        placeholder
      });
      processed = processed.replace(linkMatch[0], placeholder);
    }

    // Handle bold and italic
    const parts = processed.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|__LINK_\d+__)/);

    return parts.map((part, index) => {
      // Restore links
      const linkMatch = part.match(/^__LINK_(\d+)__$/);
      if (linkMatch) {
        const link = links[parseInt(linkMatch[1])];
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
          >
            {link.text}
          </a>
        );
      }

      // Bold text
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="text-zinc-100 font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Italic text
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={index} className="text-zinc-200 italic">
            {part.slice(1, -1)}
          </em>
        );
      }

      // Inline code
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="bg-zinc-800 text-red-400 px-2 py-1 rounded text-sm font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }

      return part;
    });
  };

  if (!content || !content.trim()) {
    return (
      <div className={`text-zinc-500 italic ${className}`}>
        No content available
      </div>
    );
  }

  return (
    <div className={`prose prose-invert max-w-none markdown-content ${className}`}>
      <div className="space-y-0">
        {parseMarkdown(content)}
      </div>
    </div>
  );
}