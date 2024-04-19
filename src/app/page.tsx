'use client'
import Navbar from '../components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { NextUIProvider } from '@nextui-org/react'
import Login from '@/components/Login/page'
import { useUser } from "@/context/UserContext";
import Admin from '@/components/Admin/page'
import HomeLoading from '@/components/HomeLoading/page'
export default function Home() {
  const userContext = useUser();

  if (userContext?.loading) {
    
    // Return loading indicator or placeholder while user data is loading
    return<>
      <Navbar/>
      <HomeLoading/>
       </>
  }

  return (
    <div>
      <NextUIProvider>
        <main className='text-foreground bg-background'>
          <Navbar/>
          {/* Only render login form if user is not logged in and user data has been loaded */}
          {!userContext?.user &&
            <Login/>
          }
          {userContext?.user && 
            <Admin/>
          }
          <Footer/>
        </main>
      </NextUIProvider> 
    </div>
  );
}
