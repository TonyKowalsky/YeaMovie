import { iconPaths } from "./icons";

type IconName = keyof typeof iconPaths;

export interface IconProps {
  name: IconName;
  size: number;
  viewBox?: string;
}

const Icon = ({ name, size = 16, viewBox = "0 0 16 16" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={iconPaths[name]} />
  </svg>
);

export default Icon;
