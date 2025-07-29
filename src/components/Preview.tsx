import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface DynamicImageProps {
  src: string | null;
  disabledText: string;
}

const Preview: React.FC<DynamicImageProps> = ({ src, disabledText }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (src) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [src]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="text-center w-full h-full">
      <div
        className="flex items-center justify-center
                   w-full h-full
                   md:w-[160px] md:h-[160px]
                   aspect-square
                   rounded-lg
                   mx-auto"
      >
        {!src ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm p-4">{disabledText}</p>
        ) : (
          <>
            {isLoading && <Loader2 className="animate-spin text-gray-500 dark:text-gray-400" size={32} />}

            {hasError && <p className="text-red-500 text-sm">Image not found</p>}

            <img
              key={src}
              className={`w-full h-full md:w-[128px] md:h-[128px] object-contain ${isLoading || hasError ? 'hidden' : 'block'}`}
              src={src}
              alt="User pet preview"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Preview;
