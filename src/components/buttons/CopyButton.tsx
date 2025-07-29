"use client"

import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface Props {
  url: string | null;
}

export default function CopyButton({ url }: Props) {
  const copyClick = () => {
    if (url) {
      navigator.clipboard.writeText(url).catch((err) => {
        console.error('Failed to copy the text:', err);
      })
      toast("Link copied!", {
        closeButton: true,
      });
    };
  };

  return (
    <Button disabled={!url} size="sm" className="cursor-pointer" onClick={copyClick}>
      <Copy />
      Copy Link
    </Button>
  );
}
