
import * as React from "react";
import { IconProps, icons } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomIconProps extends Omit<IconProps, "ref"> {
  name: string;
  fallback?: string;
  className?: string;
}

const Icon = React.forwardRef<SVGSVGElement, CustomIconProps>(
  ({ name, fallback, className, ...props }, ref) => {
    const LucideIcon = icons[name as keyof typeof icons] || 
                      (fallback ? icons[fallback as keyof typeof icons] : null);

    if (!LucideIcon) {
      return null;
    }

    return (
      <LucideIcon
        ref={ref}
        className={cn("", className)}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
