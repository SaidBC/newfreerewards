import { cn } from "@/lib/utils";

export default function TextLogo({
  classname,
  size,
}: {
  classname?: string;
  size?: "xl" | "lg" | "md" | "sm";
}) {
  const sizes = {
    xl: "text-5xl",
    lg: "text-4xl",
    md: "text-2xl",
    sm: "text-xl",
  };
  return (
    <div>
      <h1 className={cn("font-concert-one font-bold ", size && sizes[size])}>
        <span className="text-amber-400">NEW</span>{" "}
        <span className="text-blue-400">FREE</span>{" "}
        <span className="text-green-400">REWARDS</span>
      </h1>
    </div>
  );
}
