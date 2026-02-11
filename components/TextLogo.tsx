import { cn } from "@/lib/utils";

export default function TextLogo({
  classname,
  size,
  shortOnMobile,
}: {
  classname?: string;
  size?: "xl" | "lg" | "md" | "sm";
  shortOnMobile?: boolean;
}) {
  const sizes = {
    xl: "text-5xl",
    lg: "text-4xl",
    md: "text-2xl",
    sm: "text-xl",
  };
  return (
    <div>
      <h1 className={cn("font-concert-one font-bold ", size && sizes[size], classname)}>
        {shortOnMobile && (
          <span className="sm:hidden">
            <span className="text-amber-400">N</span>
            <span className="text-blue-400">F</span>
            <span className="text-green-400">R</span>
          </span>
        )}
        <span className={cn(shortOnMobile && "hidden sm:inline")}>
          <span className="text-amber-400">NEW</span>{" "}
          <span className="text-blue-400">FREE</span>{" "}
          <span className="text-green-400">REWARDS</span>
        </span>
      </h1>
    </div>
  );
}
