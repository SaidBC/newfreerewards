import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import TextLogo from "@/components/TextLogo";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex w-full h-(--header-height) items-center justify-between">
          <TextLogo size="md" />
          <MobileNav className="lg:hidden" />
          <MainNav className="hidden lg:flex" />
        </div>
      </div>
    </header>
  );
}
