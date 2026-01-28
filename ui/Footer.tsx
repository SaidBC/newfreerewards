import TextLogo from "@/components/TextLogo";

export default function Footer() {
  return (
    <footer className=" bg-card text-card-foreground border-t text-sm text-center">
      <div className="container h-(--footer-height) mx-auto flex items-center justify-center gap-2">
        <span>&copy; {new Date().getFullYear()}</span>
        <TextLogo />
        <span>. All rights reserved.</span>
      </div>
    </footer>
  );
}
