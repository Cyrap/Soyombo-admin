import {Button} from '@nextui-org/button';
import React from 'react';
import {auth} from '@/firebase/firebase'
import {signOut} from "firebase/auth"
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation'
import { UserIcon } from './UserIcon';
const LogoutButton = () => {
  const user = useUser();
  const router = useRouter();
  console.log(user?.user?.displayName);
  const logOut = async () =>{
    try{
      await signOut(auth);
      router.push("/");
    }catch(err){
      console.log(err);
    }
  }
  return (
    <Button onClick={logOut}  color="danger" variant="bordered" startContent={<UserIcon/>}>
    Гарах
    </Button>
  );
};

export default LogoutButton;
