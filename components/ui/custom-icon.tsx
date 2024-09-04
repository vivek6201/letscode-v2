import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import React from "react";

const CustomIcon = React.forwardRef(
  ({
    className,
    iconName: Icon,
  }: {
    iconName: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    className?: string;
  }, ref: React.Ref<SVGSVGElement>) => {
    return <Icon ref={ref} size={17} className={cn(className)} />;
  }
);

CustomIcon.displayName = "CustomIcon"
export default CustomIcon;
