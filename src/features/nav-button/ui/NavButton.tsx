import { useTheme } from "@/shared/lib";

interface NavButtonProps {
  direction: "next" | "prev";
  text: string;
  onClick: () => void;
}

const NavButton = ({ direction, text, onClick }: NavButtonProps) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`navSection ${direction === "next" ? "next" : "prev"} ${
        isDark ? "dark" : ""
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className={`navButton ${isDark ? "dark" : ""}`}
      >
        {text}
      </button>
    </div>
  );
};

export default NavButton;
