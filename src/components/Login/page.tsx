"use client";
import React, { useState } from "react";
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { googleProvider } from "@/firebase/firebase";
import { useUser } from "@/context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const user = useUser();
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

  return (
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="border-1 p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Нэвтрэх</h2>
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-semibold"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded"
                onChange={(e) => { setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 font-semibold"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded"
                onChange={(e) => {setPassword(e.target.value);
                }}
              />
            </div>
            <div className="container mx-auto flex justify-between items-center">
              <button
                onClick={submit}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Login
              </button>
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
