"use client";
import { MotionDiv,MotionButton,MotionH2, MotionH1} from "@/app/lib/types/motion";
import { cn } from "@/lib/utils";
import { motion, stagger } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { createPrefrences } from "../../actions/preferences/preferences";
import { redirect, useRouter } from "next/navigation";



type Genre = {
    id: string;
    title: string;
  };

interface PrefrencesProps {
    genres: Genre[]
}

const Preferences : React.FC<PrefrencesProps> = ({genres}) => {
    const [selectedGenres,setSelectedGenres] = useState<string[]>([])
    const router = useRouter()

    const handleOnClick = (genre:string) => {
       if(selectedGenres.includes(genre)){
        const newArr = selectedGenres.filter((item) => item !== genre)
        setSelectedGenres(newArr)
       }
       else {
        setSelectedGenres([...selectedGenres,genre])
       }
    }
    const onSubmit =async () => {
      if(selectedGenres.length < 3){
        return toast.error("Please Select at least 3 Genres")
      }
      await createPrefrences({
        genres : selectedGenres
      })
      toast.success("your Prefrences added successfully")
      router.push('/')
    }
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24">
        <MotionH1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            bounce: 0.4
          }}
          className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white via-white/80 to-white bg-clip-text text-transparent"
        >
         Select Your Anime Preferences
        </MotionH1>
        
        <MotionDiv 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.2,
            duration: 0.5,
            ease: "easeOut"
          }}
          className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
        >
          <MotionH2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-semibold mb-6 text-white/90"
          >
            Select Your Favorite Genres
          </MotionH2>
          
          <MotionDiv
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {genres.map((genre, index) => (
              <MotionButton
              onClick={() => handleOnClick(genre.id)}
              key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.3
                    }
                  }
                }}
                className={cn(
                    `relative group flex items-center justify-center p-4 rounded-xl 
                           bg-gradient-to-br from-white/10 to-white/5
                           hover:from-white/20 hover:to-white/10
                           transition-all duration-300 ease-out
                           hover:scale-105 transform cursor-pointer
                           before:absolute before:inset-0 before:rounded-xl
                           before:bg-gradient-to-br before:from-white/10 before:to-white/5
                           before:opacity-0 before:transition-opacity before:duration-300
                           hover:before:opacity-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]` , selectedGenres.includes(genre.id) && 'from-white/20 to-white/10 before:opacity-100 scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                )} 
              >
                <span className="text-base font-medium leading-none text-white relative z-10">
                  {genre.title}
                </span>
              </MotionButton>
            ))}
          </MotionDiv>
          
          <MotionDiv
            className="mt-8 flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-black hover:bg-white/90 rounded-lg transition-colors"
              onClick={onSubmit}
            >
              Save Preferences
            </MotionButton>
          </MotionDiv>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Preferences;