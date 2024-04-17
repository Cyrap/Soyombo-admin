'use client'
import Navbar from '../components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import News from '@/components/News/News'
import SwiperComponent from '@/components/Swiper/Swiper'
import {NextUIProvider} from '@nextui-org/react'
import Posts from '@/components/Posts/Posts'
export default function Home() {
  return(<div>
   <NextUIProvider>
    <main className='dark text-foreground bg-background'>
    <Navbar/>
    <div className='w-[100vw] flex justify-center'>
    <div className='w-[80vh]'>
    <Posts/>
    </div>
    </div>
    <Footer/>
    </main>
   </NextUIProvider> 
  </div>
  )
}


