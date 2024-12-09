import { clsx, type ClassValue } from "clsx"
import { motion, MotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge"
import type { Session } from "better-auth/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

type MotionVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & MotionProps;

export const MotionVideo: React.FC<MotionVideoProps> = motion.video;

type MotionImageProps = React.ImgHTMLAttributes<HTMLImageElement> & MotionProps;

export const MotionImage: React.FC<MotionImageProps> = motion.img;

export interface UserMilldreware {
  session : Session;
  user : {
    id :string;
    role : string;
    banned : boolean;
  }
}


export interface UserPrefrences {
  userId : string;
  genreId :string;
}