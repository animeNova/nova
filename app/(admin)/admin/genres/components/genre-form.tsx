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
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { AlertModal } from '@/components/modal/alert-modal';
import Title from '@/app/(admin)/components/title/Title';
import { genreSchema } from '@/app/(admin)/types/zod.types';
import { createGenre, deleteGenre, updateGenre } from '@/app/(admin)/actions/genre/genre.action';
import toast from 'react-hot-toast';

interface GenerFormProps {
  initialData?: any| null 
}

export const GenerForm: React.FC<GenerFormProps> = ({
  initialData , 
  
}) => {
  const params = useParams<{id : string}>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open,setOpen]=  useState<boolean>(false)
  const title = initialData ? 'Edit gener' : 'Create gener';
  const toastMessage = initialData ? 'Genre updated Succefully!' : 'Gener Created Succefully!';
  const action = initialData ? 'Save changes' : 'Create';
  const formSchema = genreSchema;

  const defaultValues = initialData
    ? initialData
    : {
        title: '',
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await updateGenre(params.id,data)
      } else {
        await createGenre(data);
      }
      
      router.refresh();
      router.push(`/admin/genres`);
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
      await deleteGenre(params.id)
      toast.success("Genre Deleted Succefully!");
      router.push(`/admin/genres`);
    } catch (error: any) {
      toast.error('Uh oh! Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='mx-4 space-y-3'>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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