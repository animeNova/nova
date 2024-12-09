"use client";
import React, { useState } from 'react'
import { ThemeProvider } from '../ui/theme-provider';
import Navbar from "@/components/header/navbar";
import {HydrationBoundary, QueryClient , QueryClientProvider} from '@tanstack/react-query'
const Provider = ({
    children
} : {children:React.ReactNode}) => {
  const [queryClinet] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClinet}>
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    >
    
    <Navbar />
    <div className="pt-28 md:pt-16">     
    <main className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    {children}
    </main>
    </div>
    </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Provider
