'use state'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, } from "@nextui-org/react";
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="h-[35px] text-xs bg-gray-600 ">
      <NavbarContent>

        <NavbarBrand className="text-xs">
        <Link href='/Contact' className="text-xs">
          Холбоо барих
        </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
   
        <NavbarItem>
            <Link href="https://news.xopom.com/"
            className="p-[10px] text-white text-xs"
            >
            FB
            </Link>

            <Link href="https://news.xopom.com/"
            className="p-[10px] text-white text-xs">
            Twitter
            </Link>

            <Link href="https://news.xopom.com/"
            className="p-[10px] text-white text-xs"
            >
            Instagram
            </Link>
        </NavbarItem>

      </NavbarContent>
    </Navbar>
  );
}
