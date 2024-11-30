import { useMemo } from 'react';

interface TruncateOptions {
  text: string;
  limit?: number;
  suffix?: string;
}

export const useTruncateText = ({
  text,
  limit = 300,
  suffix = '...'
}: TruncateOptions): string => {
  const truncatedText = useMemo(() => {
    if (!text) return '';
    if (text.length <= limit) return text;

    // Find the last space before the limit to avoid cutting words
    const lastSpace = text.substring(0, limit).lastIndexOf(' ');
    const truncated = text.substring(0, lastSpace > 0 ? lastSpace : limit);

    return `${truncated}${suffix}`;
  }, [text, limit, suffix]);

  return truncatedText;
}; 