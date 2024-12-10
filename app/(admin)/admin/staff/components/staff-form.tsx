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
import { useCallback } from "react";

import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash,ImagePlus, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AlertModal } from '@/components/modal/alert-modal';
import Title from '@/app/(admin)/components/title/Title';
import { staffSchema } from '@/app/(admin)/types/zod.types';
import { createStaff,deleteStaff,updateStaff } from '@/app/(admin)/actions/staff/staff.action';
import toast from 'react-hot-toast';
import { CldUploadWidget } from 'next-cloudinary';
import { YearPicker } from '@/components/ui/yearPicker';

interface StaffFormProps {
  initialData?: any| null 
}

export const StaffForm: React.FC<StaffFormProps> = ({
  initialData , 
  
}) => {
  const params = useParams<{id : string}>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open,setOpen]=  useState<boolean>(false)
  const title = initialData ? 'Edit Staff' : 'Create Staff';
  const toastMessage = initialData ? 'Staff updated Succefully!' : 'Staff Created Succefully!';
  const action = initialData ? 'Save changes' : 'Create';
  const formSchema = staffSchema;

  const defaultValues = initialData
    ? initialData
    : {
        name :"",
        birth :new Date() ,
        job :"",
        image :"",
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await updateStaff(params.id,data)
      } else {
        await createStaff(data);
      }
      
      router.refresh();
      router.push(`/admin/staff`);
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
      await deleteStaff(params.id)
      toast.success("Staff Deleted Succefully!");
      router.push(`/admin/staff`);
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
          <div className='flex flex-col gap-2'>
          <div className='w-full flex gap-2 justify-start items-center'>
          <FormField
          control={form.control}
          name="name"
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
               <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job</FormLabel>
              <FormControl>
                <Input placeholder="job" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
               <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
            <FormLabel>Birth</FormLabel>
            <YearPicker onChange={field.onChange} value={field.value} />
            <FormMessage />
          </FormItem>
          )}
        />
          </div>
          <div>
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

          </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};
