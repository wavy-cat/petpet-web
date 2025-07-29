import { buttonVariants } from '@/components/ui/button';
import { ArrowDownToLine } from 'lucide-react';

interface Props {
  url: string | null;
}

export default function DownloadButton({ url }: Props) {
  const classes = buttonVariants({ size: 'sm', variant: 'secondary' });

  if (!url) {
    return (
      <button disabled className={classes}>
        <ArrowDownToLine />
        Download
      </button>
    );
  }

  return (
    <a
      href={url}
      className={classes}
      download
      target="_blank"
      rel="noopener noreferrer"
    >
      <ArrowDownToLine />
      Download
    </a>
  );
}
