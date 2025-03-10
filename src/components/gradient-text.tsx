import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type GradientTextPropsT = {
  children: React.ReactNode;
  size?: string;
  classes?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export default function GradientTextL({
  size,
  children,
  className,
  ...props
}: GradientTextPropsT) {
  return (
    <>
      <div
        className={cn(
          `bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-semibold `,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
