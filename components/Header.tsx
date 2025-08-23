import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

import { Navigation } from "./navigation";
import { WelcomeMsg } from "./welcome-msg";
import { Loader2 } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-500 to bg-blue-600 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <div className="hidden lg:flex">
              <h1 className="text-3xl font-semibold text-white">Finlytics</h1>
            </div>
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-white/50" />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
      </div>
    </header>
  );
};

export default Header;
