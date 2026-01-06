import { useNavigate } from "react-router";
import { useMe } from "../hooks/useMe";
import { Hero } from "../components/Hero";
import { Guide } from "../components/Guide";

export const Landing = () => {
  const { user } = useMe();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="landing container">
        <Hero />
        <Guide />

        {!user && (
          <>
            <div className="row justify-content-center g-1">
              <button className="theme-btn" onClick={handleLoginClick}>
                Logga in
              </button>
              <button className="theme-btn" onClick={handleRegisterClick}>
                Registrera dig
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
