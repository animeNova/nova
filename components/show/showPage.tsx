'use client'
import React from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Details from '../details/details'
import CharactersWrapper from '../character/CharactersWrapper'
import CharacterCard from '../character/CharacterCard'
import StaffsWrapper from '../staff/StaffsWrapper'
import StaffCard from '../staff/StaffCard'
import Recommended from '@/app/(root)/(pages)/show/[id]/components/recommended'
import Link from 'next/link'
import Relations from '@/app/(root)/(pages)/show/[id]/components/relation'
import TrailerBtn from '../ui/trailer-btn'


interface ShowPageProps {
    data: {
        id:string;
        title:string;
        relativeTitle:string;
        airing:string;
        description:string;
        image:string,
        backgroundImage:string | null;
        images:string[] | null,
        rating:number;
        season:string;
        status:string;
        trailer:string | null;
        type:'TV'|'MOVIE';
        video:string;
        lang : {
            id : string;
            title:string;
        };
        creator :{
            id:string;
            name:string;
            image:string | null;
        };
        studio:{
            id:string;
            title:string;
            image:string | null;
        };
        showCasts: {
            cast : {
                id:string;
                name:string;
                image:string;
                birth:string;
                job:string;
            }
        }[];
        showGenres :{
            genre: {
                id:string;
                title:string;
            }
        }[];
        charachter : {
            id:string;
            name:string;
            image:string | null;
            castId: {
                image:string| null;
            }
        }[] | null
    } 

}

const ShowPage : React.FC<ShowPageProps> = ({
    data
}) => {
  
  return (
    <div className='space-y-8'>
    <div className="w-full h-[40vh]  relative " >
    <div className="aspect-video h-full w-full rounded-md" >
    <video src={data.video} autoPlay loop muted playsInline className="w-full h-full object-cover rounded-md" />
    </div>
    {
        data.trailer && (
            <TrailerBtn isFixed link={data.trailer} />
        )
    }


  </div>
 


    <div>
        <Tabs defaultValue="overview" className="w-full  space-y-5 ">
    <TabsList className='bg-background flex md:inline-flex flex-wrap md:flex-nowrap gap-2  md:gap-5 mb-16 md:mb-4 ' >
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="relations">Relations</TabsTrigger>
        <TabsTrigger value="characters">Characters</TabsTrigger>
        <TabsTrigger value="staff">Staff</TabsTrigger>
        <TabsTrigger value="recommended">Alternative</TabsTrigger>
        {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
    </TabsList>
    <TabsContent value="overview" className='w-full'>
    <div className='md:mx-4 flex justify-center md:justify-start items-center gap-7 w-full flex-wrap md:flex-nowrap pt-8'>
        {/* Poster */}
        <div className=' relative'>
            <Image src={data.image} width={1000} height={1000} className='rounded-md h-[350px] w-[240px] md:h-[400px] md:w-[350px]' alt='' />
            <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold absolute top-3 right-3'>
            {data.rating}
            </div>
        </div>
        
        <div className='space-y-7 w-full'>
            {/* title/rating */}
            <div className='flex-col flex md:flex-row gap-3 justify-center md:justify-start items-center md:text-start'>
                <div className='text-center '>
                    <h1 className='text-4xl md:text-7xl font-bold'>{data.title}</h1>
                    
                </div>
            </div>
            {/* Functions */}
        {/* <ShowFunctions /> */}
        </div>
    </div>
    </TabsContent>
    <TabsContent value="relations">
        <Relations />
    </TabsContent>
    <TabsContent value="details">
        <div className='flex justify-between md:justify-start items-start mx-3 md:gap-16 flex-wrap w-full'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl md:text-4xl font-bold'>Details</h1>
                <div className='flex flex-col gap-5'>
                    <Details name='Type' value={data.type} />
                    <Details name='Status' value={data.status} />
                    <Details name='Season' value={data.season} />
                    <Details name='aired' value={data.airing} />
                    <Details name='relativeTitle' value={data.relativeTitle}/>
                    <Details name='creator' link={`/creator/${data.creator.id}`} value={data.creator.name} />
                    <Details name='studio' link={`/studio/${data.studio.id}`}  value={data.studio.title} />
                    <Details name='Language' value={data.lang.title} />
                    <div className='flex gap-5'>
                    <p className='text-foreground/70 text-xl'>genres</p>
                    <div className='flex gap-2'>
                    {data.showGenres.map((genre) => (
                        <Link href={`/genre/${genre.genre.id}`} key={genre.genre.id}>
                        <p className='text-foreground text-xl hover:underline decoration-primary'>{genre.genre.title}</p>
                        </Link>
                    ))}
                    </div>
                 
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl md:text-4xl font-bold'>Description</h1>
                <p className='max-w-[250px] md:max-w-[500px] lg:max-w-[1000px] text-black/70 dark:text-white/70 text-lg'>
                {data.description}
                </p>
            </div>
        </div>
    </TabsContent>
    <TabsContent value="characters">
        <CharactersWrapper>
            {data.charachter?.map((char) => (
                    <CharacterCard id={char.id} name={char.name} image={char.image} key={char.id} castImage={char.castId.image} />
            ))}
        
        </CharactersWrapper>
    </TabsContent>
    <TabsContent value="staff">
        <StaffsWrapper>
            {
                data.showCasts.map((cast) => (
                    <StaffCard id={cast.cast.id} image={cast.cast.image} job={cast.cast.job} name={cast.cast.name}
                    key={cast.cast.id}
                    />

                ))
            }
        </StaffsWrapper>
    </TabsContent>
    <TabsContent value="recommended">
      <Recommended />
    </TabsContent>
    </Tabs>
    </div>
    </div>
  )
}

export default ShowPage
