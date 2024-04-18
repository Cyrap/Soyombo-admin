"use client";
import React, { useState } from "react";
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { googleProvider } from "@/firebase/firebase";
import { useUser } from "@/context/UserContext";
import {Input,Button} from "@nextui-org/react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const user = useUser();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  console.log(user);
  const submit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth, "user");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userCredential = result.user;
      console.log(userCredential, "userCREDENTIAL");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (input:any) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  };

  const handleChange = (e:any) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  };
  return (
    <>
      <div className="min-h-[75vh] flex justify-center items-center">
        <div className="border-1 p-8 rounded shadow-md w-96 h-full object-cover">
          <h2 className="text-2xl font-bold mb-4">Нэвтрэх</h2>
          <div>
          <Input
      onChange={handleChange}
      type="email"
      label="Email"
      variant="bordered"
      isInvalid={!isValidEmail}
      className="max-w-xs pb-[20px]"
    />
            <Input
              onChange={(e) => {setPassword(e.target.value);
              }}
      label="Password"
      variant="bordered"
      placeholder="Enter your password"
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs pb-[30px]"
    />
            <div className="container mx-auto flex justify-between items-center">
              <Button  variant="bordered"
                onClick={submit}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Login
                </Button>  
              <button
                onClick={signInWithGoogle}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                login whit google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
