import Icon, { type IconProps } from "@/shared/ui/icons/Icon";

interface ButtonWithIconProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon: IconProps;
}

const ButtonWithIcon = ({
  onClick,
  disabled,
  className,
  icon,
}: ButtonWithIconProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      type="button"
    >
      <Icon name={icon.name} size={icon.size} viewBox={icon.viewBox} />
    </button>
  );
};

export default ButtonWithIcon;
