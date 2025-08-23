"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h1 className="text-white font-mdeium text-2xl lg:text-4xl">
        Welcome Back{isLoaded ? ", " : ""} {user?.firstName}!
      </h1>
      <p className="text-sm lg:text-base text-white/80">
        This is your Financial Overview Report
      </p>
    </div>
  );
};
