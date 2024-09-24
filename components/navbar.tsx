import { Navbar as NextUINavbar, NavbarContent } from "@nextui-org/navbar";

import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  return (
    <NextUINavbar isBlurred isBordered maxWidth="xl" position="sticky">
      <NavbarContent className=" basis-1 pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};
