import { NavButton } from "@/features/nav-button";
import { useScrollToTop } from "@/shared/lib";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  
  return (
    <section>
      <h2>Упс, что-то пошло не так...</h2>
      <NavButton
        direction="prev"
        text="&lt; На главную"
        onClick={() => navigate("/")}
      />
    </section>
  );
};

export default ErrorPage;
