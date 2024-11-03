import React from 'react'
import { Button } from '../ui/button'
import { Bookmark, Check, Eye, Play, Plus, Star } from 'lucide-react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Details from '../details/details'
import CharactersWrapper from '../character/CharactersWrapper'
import CharacterCard from '../character/CharacterCard'
import StaffsWrapper from '../staff/StaffsWrapper'
import StaffCard from '../staff/StaffCard'

const AnimePage = () => {
  return (
    <div className='space-y-8'>
    <div className="w-full h-[40vh]  relative " >
    <div className="aspect-video h-full w-full rounded-md" >
    <video src={"/assets/anime.webm"} autoPlay loop muted playsInline className="w-full h-full object-cover " />
    </div>
  
    <div className='absolute bottom-4 right-4'>
        <Button variant={'secondary'} className='text-lg'><Play/> Watch Trailer</Button>
     </div>

  </div>
 


    <div>
        <Tabs defaultValue="overview" className="w-full  space-y-5 ">
    <TabsList className='bg-background flex md:inline-flex flex-wrap md:flex-nowrap  md:gap-5 mb-16 md:mb-4 ' >
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="relations">Relations</TabsTrigger>
        <TabsTrigger value="characters">Characters</TabsTrigger>
        <TabsTrigger value="staff">Staff</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
    </TabsList>
    <TabsContent value="overview" className='w-full'>
    <div className='md:mx-4 flex justify-center md:justify-start items-center gap-7 w-full flex-wrap md:flex-nowrap'>
        {/* Poster */}
        <div>
            <Image src={'https://m.media-amazon.com/images/I/81s+jxE5KEL._AC_SL1500_.jpg'} width={1000} height={1000} className='rounded-md h-[350px] w-[240px] md:h-[400px] md:w-[350px]' alt='' />
        </div>
        
        <div className='space-y-7 w-full'>
            {/* title/rating */}
            <div className='flex flex-col gap-3 justify-center md:justify-start items-start'>
                <div className='text-center md:text-start w-full'>
                    <h1 className='text-4xl md:text-7xl font-bold'>Chainsaw Man</h1>
                </div>
                <div className='flex justify-center md:justify-start  items-center gap-2 w-full mx-3'>
                        <Star size={18} className='text-white/80' />
                       <p className='text-xl text-white/80'>8.38</p> 
                </div>
            </div>
            {/* Functions */}
            <div className='flex justify-center md:justify-between items-center w-full flex-wrap gap-4'>
                <div className='flex justify-start items-center gap-4 mx-3'>
                    <Button variant={'secondary'} className='p-4 md:text-lg '>
                        <Eye size={30} />
                        Watching
                        </Button>
                    <Button variant={'secondary'} className='p-4 md:text-lg'>
                        <Bookmark size={25}/>
                        To Watch
                        </Button>
                    <Button variant={'secondary'} className='p-4 md:text-lg'>
                        <Check size={25}/>
                        Watched
                        </Button>
                </div>
                <div>
                    <Button variant={'secondary'} className='p-4 text-lg'>
                        <Plus />
                        Add to Collection
                        </Button>
                </div>
            </div>
        </div>
    </div>
    </TabsContent>
    <TabsContent value="relations">Change your password here.</TabsContent>
    <TabsContent value="details">
        <div className='flex justify-between md:justify-start items-start mx-3 md:gap-16 flex-wrap w-full'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl md:text-4xl font-bold'>Details</h1>
                <div className='flex flex-col gap-5'>
                    <Details name='Type' value='TV' />
                    <Details name='Type' value='TV' />
                    <Details name='Type' value='TV' />
                    <Details name='Type' value='TV' />
                    <Details name='Type' value='TV' />
                    <Details name='Type' value='TV' />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl md:text-4xl font-bold'>Description</h1>
                <p className='max-w-[250px] md:max-w-[500px] lg:max-w-[1000px] text-black/70 dark:text-white/70 text-lg'>
                Chainsaw Man follows a lone 16-year-old boy named Denji who, after making a contract with a dog-like devil named Pochita, gains the ability to transform parts of his body into chainsaws. He is rescued by a mysterious woman named Makima and joins the Public Safety division, an organization dedicated to protecting Japan from devils.
                </p>
            </div>
        </div>
    </TabsContent>
    <TabsContent value="characters">
        <CharactersWrapper>
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
        </CharactersWrapper>
    </TabsContent>
    <TabsContent value="staff">
        <StaffsWrapper>
            <StaffCard/>
            <StaffCard/>
            <StaffCard/>
            <StaffCard/>
        </StaffsWrapper>
    </TabsContent>
    <TabsContent value="reviews">Change your password here.</TabsContent>
    </Tabs>
    </div>
    </div>
  )
}

export default AnimePage
