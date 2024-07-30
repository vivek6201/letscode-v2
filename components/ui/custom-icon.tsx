import { LucideProps } from "lucide-react";

function CustomIcon({
  iconName: Icon,
}: {
  iconName: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) {
  return <Icon size={17} />;
}

export default CustomIcon;
