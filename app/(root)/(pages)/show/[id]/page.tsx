import ShowPage from '@/components/show/showPage';
import React from 'react';
import { getShow } from '../../../actions/shows/show';
import { Metadata, ResolvingMetadata } from 'next';

interface PageProps {
    params: {
        id: string;
    }
}

// Generate dynamic metadata based on show data
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {id} = await params;
  // Fetch show data
  const showData = await getShow(id);
  
  // If no show data, return default metadata
  if (!showData) {
    return {
      title: 'Show Not Found | Nova',
      description: 'The requested show could not be found.'
    };
  }
  
  // Get parent metadata (to inherit any default values)
  const previousImages = (await parent).openGraph?.images || [];
  
  return {
    title: `${showData.title} | Nova`,
    description: showData.description || 'Watch this show on Nova.',
    openGraph: {
      title: showData.title,
      description: showData.description || 'Watch this show on Nova.',
      type: 'video.movie',
      images: [showData.image],
      videos: showData.trailer ? [{ url: showData.trailer }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: showData.title,
      description: showData.description || 'Watch this show on Nova.',
      images: [showData.image],
    },
    // Add structured data for rich results
    other: {
      'application-name': 'Nova',
      'og:site_name': 'Nova',
      'apple-mobile-web-app-title': 'Nova',
    }
  };
}

const page: React.FC<PageProps> = async props => {
    const params = await props.params;
    const data = await getShow(params.id);

    return (
      <>
      <ShowPage data={data as any} />
      </>
    )
}

export default page;
