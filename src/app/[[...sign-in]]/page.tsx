"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-plSkyLight to-white p-4">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="
            bg-white 
            w-full 
            max-w-md 
            p-8 
            md:p-12 
            rounded-2xl 
            shadow-2xl 
            transform 
            transition-all 
            duration-300 
            hover:scale-105 
            hover:shadow-3xl 
            border 
            border-gray-100 
            flex 
            flex-col 
            gap-4
            animate-fade-in-up
            opacity-0
            delay-200
          "
        >
          <div className="flex flex-col items-center justify-center mb-4 w-full">
            <div className="flex items-center justify-center space-x-3 mb-1">
              <Image 
                src="/logo1.jpg" 
                alt="EduSphere Logo" 
                width={60} 
                height={60} 
              />
              <div className="flex flex-col items-center">
                <h1 className="text-xl font-bold text-gray-800">BHS</h1>
                <span className="text-xs text-gray-500">Empowering Education</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-sm text-center text-gray-500 mb-4">
            Sign in to your account
          </h2>
          
          <Clerk.GlobalError className="text-sm text-red-400 text-center mb-4" />
          
          <div className="space-y-4">
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm text-gray-600">
                Username
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="
                  w-full 
                  p-3 
                  rounded-lg 
                  border 
                  border-gray-300 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  transition-all 
                  duration-300
                "
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
            
            <Clerk.Field name="password" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm text-gray-600">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="
                  w-full 
                  p-3 
                  rounded-lg 
                  border 
                  border-gray-300 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  transition-all 
                  duration-300
                "
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
          </div>
          
          <SignIn.Action
            submit
            className="
              w-full 
              bg-blue-500 
              text-white 
              py-3 
              rounded-lg 
              mt-6 
              font-semibold 
              hover:bg-blue-600 
              transition-colors 
              duration-300 
              ease-in-out 
              transform 
              hover:scale-[1.02] 
              active:scale-[0.98]
            "
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;