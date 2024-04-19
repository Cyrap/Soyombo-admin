'use client'
import React from "react";
import Image from "next/image";
import logo from '../../app/nav.png'
export const AcmeLogo = () => (
    <Image
            src={logo} 
            alt="User"
            width={100}
            height={20}
            />
);
