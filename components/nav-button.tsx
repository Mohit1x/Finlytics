import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

type Prop = {
  href: string;
  label: string;
  isActive?: boolean;
};

export const NavButton = ({ href, label, isActive }: Prop) => {
  return (
    <Button
      asChild
      variant={"outline"}
      size={"sm"}
      className={cn(
        "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus:bg-white/30 transition text-white/80",
        isActive ? "bg-white/10 text-white font-semibold" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
