"use client"

import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface Props {
  url: string | null;
}

export default function CopyButton({ url }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const copyClick = () => {
    if (url) {
      navigator.clipboard.writeText(url).then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1200);
      }).catch((err) => {
        console.error('Failed to copy the text:', err);
      });
    }
  };

  return (
    <Button disabled={!url} size="sm" className="cursor-pointer" onClick={copyClick}>
      {isCopied ? (
        <>
          <Check />
          Copied!
        </>
      ) : (
        <>
          <Copy />
          Copy Link
        </>
      )}
    </Button>
  );
}
