import { CldUploadWidget } from 'next-cloudinary';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
interface CloudinaryUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxFiles?: number;
  className?: string;
}

const  CloudinaryUpload = ({
  value = [],
  onChange,
  maxFiles = 5,
  className,
}: CloudinaryUploadProps) => {
  const onUpload = useCallback(
    (result: any) => {
      if (value.length >= maxFiles) {
        return;
      }
      
      const imageUrl = result.info?.secure_url;
      if (imageUrl) {
        onChange([...value, imageUrl]);
      }
    },
    [value, onChange, maxFiles]
  );

  const onRemove = useCallback(
    (url: string) => {
      onChange(value.filter((current) => current !== url));
    },
    [onChange, value]
  );

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-4">
        <CldUploadWidget
          uploadPreset={'z1w6dtxd'}
          onUpload={onUpload}
          options={{
            maxFiles,
            resourceType: 'image',
            clientAllowedFormats: ['image'],
          }}
        >
          {({ open }) => (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => open()}
              disabled={value.length >= maxFiles}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Upload Images
              {maxFiles > 1 && (
                <span className="ml-2 text-xs text-muted-foreground">
                  ({value.length}/{maxFiles})
                </span>
              )}
            </Button>
          )}
        </CldUploadWidget>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {value.map((url) => (
            <div key={url} className="relative group aspect-square">
              <Image
                src={url}
                alt="Upload"
                className="object-cover w-full h-full rounded-lg"
                width={1000}
                height={1000}
              />
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="absolute top-2 right-2 p-1 bg-destructive rounded-full text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CloudinaryUpload;