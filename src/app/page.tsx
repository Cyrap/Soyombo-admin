'use client'
import Navbar from '../components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import {NextUIProvider} from '@nextui-org/react'
import Login from '@/components/Login/page'
import { useUser } from "@/context/UserContext";
import Admin from '@/components/Admin/page'
export default function Home() {
  const user = useUser();
  return(<div>
   <NextUIProvider>
    <main className='text-foreground bg-background'>
    <Navbar/>
    {!user?.user &&
    <Login/>
    }
    {user?.user && 
     <Admin/>
    }
    <Footer/>
    </main>
   </NextUIProvider> 
  </div>
  )
}