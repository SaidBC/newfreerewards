export default function MenuToggle({ open }: { open: boolean }) {
  return (
    <div className="relative w-8 h-5 flex flex-col justify-between items-center group">
      <span
        className={`block h-0.75 w-full bg-foreground rounded transform transition-all duration-300 ease-in-out origin-center ${
          open ? "rotate-45 translate-y-2.25" : ""
        }`}
      />
      <span
        className={`block h-0.75 w-full bg-foreground rounded transition-all duration-300 ease-in-out ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-0.75 w-full bg-foreground rounded transform transition-all duration-300 ease-in-out origin-center ${
          open ? "-rotate-45 -translate-y-2.25" : ""
        }`}
      />
      <span className="sr-only">Toggle Menu</span>
    </div>
  );
}
