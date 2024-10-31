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
import { CalendarIcon, ImagePlus, Trash, Trash2, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AlertModal } from '@/components/modal/alert-modal';
import Title from '@/app/(admin)/components/title/Title';
import { showSchema } from '@/app/(admin)/types/zod.types';
import { createshow,updateshow,deleteshow} from '@/app/(admin)/actions/show/show.server';
import toast from 'react-hot-toast';
import { Textarea } from "@/components/ui/textarea"
import { MultiSelect } from "@/components/ui/multi-select";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';
import { ImageUpload } from '@/components/ui/imageUploadBtn';
import { CldUploadWidget } from 'next-cloudinary';
import { language } from '@/drizzle/db/schema';

interface ShowFormProps {
  initialData?: any| null ,
  genres : {
    id : string;
    title : string;
  }[];
  casts : {
    id : string;
    name:string;
  }[];
  studios : {
    id : string;
    name : string;
  }[];
  creators : {
    id : string;
    name : string;
  }[];
  languages : {
    id :string;
    title :string;
  }[]
}



export const ShowForm: React.FC<ShowFormProps> = ({
  initialData , 
  genres,
  casts,
  studios,
  creators,
  languages
}) => {
  const params = useParams<{id : string}>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open,setOpen]=  useState<boolean>(false)
  const title = initialData ? 'Edit show' : 'Create show';
  const toastMessage = initialData ? 'Show updated Succefully!' : 'Show Created Succefully!';
  const action = initialData ? 'Save changes' : 'Create';
  const formSchema = showSchema;

  const defaultValues = initialData
    ? initialData
    : {
        title: '',
        relativeTitle:"" ,
        description : "" ,
        status : "" ,
        season : "" ,
        type :"" ,
        rating : 0, 
        image :"" ,
        languageId: "" ,
        creatorId:"",
        studioId:"",
        genreIds:[],
        staffs:[] ,
        airing : new Date()
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await updateshow(params.id,data)
      } else {
        await createshow(data);
      }
      
      router.refresh();
      router.push(`/admin/shows`);
      toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  
  };

  const onDelete =async () => {
    try {
      setLoading(true);
      await deleteshow(params.id)
      toast.success("Show Deleted Succefully!");
      router.push(`/admin/shows`);
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
    <div className='mx-4 space-y-3 '>
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
          <div className='flex justify-start items-center gap-8 w-full flex-wrap'>
          <FormField
          control={form.control}
          name="title"
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} className='w-[150px] md:w-auto' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
            />
          <FormField
          control={form.control}
          name="relativeTitle"
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>relative Title</FormLabel>
              <FormControl>
                <Input placeholder="relativeTitle" {...field} className='w-[150px] md:w-auto' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
            />
          <FormField
          control={form.control}
          name="status"
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger className='w-[150px]'>
                    <SelectValue placeholder="Select a status"  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='w-[120px]'>
                  <SelectItem value="finshed">Finshed</SelectItem>
                  <SelectItem value="airing">Airing</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
            />
   
          <FormField
          control={form.control}
          name="type"
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger className='w-[150px]'>
                    <SelectValue placeholder="Select a type"  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='w-[120px]'>
                  <SelectItem value="TV">TV</SelectItem>
                  <SelectItem value="MOVIE">MOVIE</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
            />
          <FormField
          control={form.control}
          name="season"
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>season</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger className='w-[150px]'>
                    <SelectValue placeholder="Select a season"  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='w-[120px]'>
                  <SelectItem value="summer">summer</SelectItem>
                  <SelectItem value="winter">winter</SelectItem>
                  <SelectItem value="spring">spring</SelectItem>
                  <SelectItem value="fall">fall</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="studioId"
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>studio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger className='w-[150px]'>
                    <SelectValue placeholder="Select a studio"  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='w-[170px]'>
                  {
                    studios.map((studio) => (
                      <SelectItem value={studio.id} key={studio.id}>{studio.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
            />
          <FormField
          control={form.control}
          name="languageId"
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger className='w-[170px]'>
                    <SelectValue placeholder="Select a language"  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='w-[170px]'>
                  {
                    languages.map((lang) => (
                      <SelectItem value={lang.id} key={lang.id}>{lang.title}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
            />
          <FormField
          control={form.control}
          name="creatorId"
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>creator</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger className='w-[155px]'>
                    <SelectValue placeholder="Select a creator"  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='w-[170px]'>
                  {
                    creators.map((creator) => (
                      <SelectItem value={creator.id} key={creator.id}>{creator.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
          />
           <FormField
          control={form.control}
          name="rating"
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>rating</FormLabel>
              <FormControl>
                <Input placeholder="rating" {...field} type='number' min={1} max={10}  className='w-[130px] md:w-auto' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
             <FormField
          control={form.control}
          name="airing"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Aired</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value as any ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value as any}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          <div>
          <FormField
          control={form.control}
          name="description"
          
          render={({ field }) => (
            <FormItem >
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
            />
          </div>
          <div>
          <FormField
          control={form.control}
          name="staffs"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Cast</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={casts.map((cast) => ({
                      value : cast.id ,
                      label :cast.name
                    }))}
                    onValueChange={field.onChange} 
                    defaultValue={form.watch('staffs')}
                  />
                </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
     

      
          </div>
          <div>
          <FormField
            control={form.control}
            name="genreIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genres</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={genres.map((genre) => ({
                      value : genre.id ,
                      label :genre.title
                    }))}
                    onValueChange={field.onChange} 
                    defaultValue={form.watch('genreIds')}
                  />
                </FormControl>
           
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
                            className="h-32 w-32 object-cover"
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
                              className="w-full h-[150px]"
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
          <Button disabled={loading} className="ml-auto disabled:bg-primary/80" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};
