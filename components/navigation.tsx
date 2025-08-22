"use client";
import { useMedia } from "react-use";

import { usePathname, useRouter } from "next/navigation";
import { NavButton } from "./nav-button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const isMobile = useMedia("(max-width:1024px)", false);
  console.log(isMobile);

  const onCLick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant={"outline"}
            size={"sm"}
            className="text-white bg-white/10 hover:bg-white/20 outline-none focus-visible:ring-offset-0 focus-visible:ring-transparent border-none focus:bg-white/30 transition"
          >
            <Menu className="size-4" />
          </Button>
          <SheetContent side={"left"}>
            <nav className="flex flex-col space-y-2 pt-6">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  variant={route.href == pathName ? "outline" : "ghost"}
                  onClick={() => onCLick(route.href)}
                  className="flex justify-start"
                >
                  {route.label}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </SheetTrigger>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          label={route.label}
          href={route.href}
          isActive={pathName == route.href}
        />
      ))}
    </nav>
  );
};
