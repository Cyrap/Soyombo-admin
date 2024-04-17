"use client";
import Navbar from "../Navbar/Navbar";
import { useRouter } from 'next/navigation'
import React, { useState } from "react";
import {auth} from "../../firebase/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useUser } from "@/context/UserContext";
const CreateUser = () => {
  const router = useRouter();
  const [email, setNewEmail] = useState("");
  const [password, setNewPassword] = useState("");
  const user = useUser();
  const Singinn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(user, "sign up success");
      user && router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (user) {
    console.log(user);
  }

  return (
    <>
      <Navbar />
      <div className="h-[87vh] flex items-center justify-center ">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Sign up</h2>
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
                onChange={(e) => {
                  setNewEmail(e.target.value);
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
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </div>
            <button
              onClick={Singinn}
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;