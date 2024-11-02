'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, ImagePlus, Trash, Trash2, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AlertModal } from '@/components/modal/alert-modal';
import Title from '@/app/(admin)/components/title/Title';
import { characterSchema } from '@/app/(admin)/types/zod.types';
import { createCharacter, deleteCharacter, updateCharacter } from '@/app/(admin)/actions/characters/characters.action';
import toast from 'react-hot-toast';
import { CldUploadWidget } from 'next-cloudinary';
import { cn } from '@/lib/utils';
import { searchShow } from '@/app/(admin)/actions/show/show.server';
import { SearchSelect } from '@/components/ui/search-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,SelectLabel } from '@/components/ui/select';

interface CharacterFormProps {
  initialData?: any| null 
}

export const CharacterForm: React.FC<CharacterFormProps> = ({
  initialData , 
  
}) => {
  const params = useParams<{id : string,characterId:string}>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open,setOpen]=  useState<boolean>(false)
  const title = initialData ? 'Edit character' : 'Create character';
  const toastMessage = initialData ? 'Character updated Succefully!' : 'Character Created Succefully!';
  const action = initialData ? 'Save changes' : 'Create';
  const formSchema = characterSchema;

  const defaultValues = initialData
    ? initialData
    : {
        name : "" ,
        image : "",
        showId : params.id
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await updateCharacter(params.characterId,data)
      } else {
        await createCharacter(data);
      }
      
      router.refresh();
      router.push(`/admin/shows/${params.id}/characters`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
 
    
  };

  const onDelete =async () => {
    try {
      setLoading(true);
      await deleteCharacter(params.characterId)
      toast.success("Character Deleted Succefully!");
      router.push(`/admin/shows/${params.id}/chraracters`);
    } catch (error: any) {
      toast.error('Uh oh! Something went wrong.');
    } finally {
      setLoading(false);
    }
  }
  const handleUploadSuccess = useCallback(
    (result: any) => {
      form.setValue("image", result.info.secure_url);
    },
    [form]
  );

  const handleRemoveImage = useCallback(() => {
    form.setValue("image", "");
  }, [form]);
  const imageUrl = form.watch("image");

 
  return (
    <div className='mx-4 space-y-3'>
    <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <Title title={title} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {imageUrl ? (
                        <div className="relative w-full overflow-hidden rounded-lg border">
                          <img
                            src={imageUrl}
                            alt="Preview"
                            className="h-64 w-64 object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2"
                            onClick={handleRemoveImage}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <CldUploadWidget
                          uploadPreset="z1w6dtxd"
                          onSuccess={handleUploadSuccess}
                        >
                          {({ open }) => (
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                              onClick={() => open()}
                            >
                              <ImagePlus className="mr-2 h-4 w-4" />
                              Upload Image
                            </Button>
                          )}
                        </CldUploadWidget>
                      )}
                      <input type="hidden" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
          />
     
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};
