"use client";
import AnimeCard from '@/components/cards/AnimeCard'
import SidebarFilter from '@/components/filter/Filter'
import { Button } from '@/components/ui/button'
import OrderbyFilter from '@/components/ui/orderbyFilter'
import React, { useCallback, useEffect } from 'react';
import Wrapper from './wrapper';
import { useGetShows } from '@/hooks/useGetShows'
import CardSkeleton from '@/components/cardSkeleton/CardSkeleton';
import useFilterValues from '@/hooks/useFilterValues';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';



const page = () => {
  const searchParams = useSearchParams()
  const pageNum = searchParams.get('page') || 1;
  const router = useRouter()
  const pathname = usePathname()
  const {season,genres,order} = useFilterValues()
  const {data,isLoading,refetch,isRefetching} = useGetShows({
    limit : 10 ,
    page :Number(pageNum) ,
    orderBy : order,
    season : season ,
    genres : genres
  })
  useEffect(() => {
    refetch()  
  },[page,order,pageNum,genres,season])

  const createQueryString = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value.toString())
 
      return params.toString()
    },
    [searchParams]
  )
  return (
    <Wrapper>
    <div className='space-y-6'>
     <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-semibold uppercase'>Catalog</h1>
        <div className='flex justify-center items-center gap-2'>
        <OrderbyFilter />
        <SidebarFilter />
        </div>
   
     </div>
    {isLoading || isRefetching ? (
      <CardSkeleton count={14} />
    ) : (
      <div className='flex-wrap flex justify-center items-center gap-4 md:gap-14'>
      {
        data?.result.map((show) => (
          <AnimeCard id={show.id} image={show.image} video={show.video} title={show.title} year={show.airing} key={show.id}  />
        ))
      }
    </div>
    )}

        <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => router.push(pathname + '?' + createQueryString('page',data?.currentpage! - 1)) }
            className={data?.currentpage! <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-muted"}
            aria-disabled={data?.currentpage! <= 1}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="flex h-9 items-center justify-center px-4 text-sm">
            Page {data?.currentpage} of {data?.totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
              onClick={() => router.push(pathname + '?' + createQueryString('page',data?.currentpage! + 1)) }
            className={data?.currentpage! >= data?.totalPages!  ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-muted"}
            aria-disabled={data?.currentpage! >= data?.totalPages!}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </div>
    </Wrapper>
  )
}

export default page
