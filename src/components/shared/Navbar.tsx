"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo, { MobileLogo } from "../ui/logo";
import { ThemeSwitcher } from "../ui/theme-switcher";

const Navbar = () => {
  const pathname = usePathname();
  const whiteList = ["/sign-in", "/sign-up", "/wizerd"];
  if (whiteList.includes(pathname)) {
    return null;
  }
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

function DesktopNavbar() {
  return (
    <div className="hidden md:block border-separate border-b bg-background">
      <nav className="container flex items-center justify-between px-8 mx-auto">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
        </div>
        <div className="space-x-4">
          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  );
}

function MobileNavbar() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className=" block md:hidden border-separate bg-foreground">
      <nav
        className={cn(
          "container flex items-center justify-between px-4",
          theme === "dark" ? "bg-black" : "bg-white"
        )}
      >
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <MobileLogo />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
