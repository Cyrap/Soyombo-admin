'use client'
import React, { use } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useUser } from "@/context/UserContext";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
export default function App() {
  const user = useUser();
  const userImage = (user?.user?.photoURL);
  const pathName = usePathname();
  return (
    <Dropdown>
    <DropdownTrigger>
      <div className="relative">
        <button className="h-[2.4rem] w-[2.4rem] rounded-full overflow-hidden flex justify-center items-center">
          <Image
            src={userImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5958mvxyOALrWelcizzxdX48KqChi9Vh2Sr_NETQ&s'} 
            className="object-cover rounded-full" 
            alt="User"
            width={100}
            height={100}
          />
        </button>
      </div>
    </DropdownTrigger>
    <DropdownMenu aria-label="Static Actions">
      <DropdownItem key="delete">
        <LogoutButton/>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  
  );
}
