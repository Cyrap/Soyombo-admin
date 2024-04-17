'use state'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import {AcmeLogo} from "./Logo";
import { useUser } from "@/context/UserContext";
import UserDropdown from "./UserDropdown";
import SubNavbar from "./SubNavbar"
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user  = useUser();
  const menuItems = [
    "Profile",
    "Dashboard",
    "Log Out",
  ];

  return (
    <>
    <SubNavbar/>
    <Navbar onMenuOpenChange={setIsMenuOpen} className="customcss">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
        <Link href='/'>
          <AcmeLogo />
        </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent justify="end">
        {!user?.user && 
        <NavbarItem>
          <Button as={Link} color="primary" href="/" variant="flat">
            Нэвтрэх
          </Button>
        </NavbarItem>
        }
        {user?.user &&
        <UserDropdown/>
        }

      </NavbarContent>
      <NavbarMenu>
        
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>

    </>
  );
}
