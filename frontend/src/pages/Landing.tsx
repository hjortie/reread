import { useNavigate } from "react-router";
import { useMe } from "../hooks/useMe";

export const Landing = () => {
  const user = useMe();
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
        <h1>Startsida</h1>

        {!user && (
          <>
            <button className="theme-btn" onClick={handleLoginClick}>
              Logga in
            </button>
            <button className="theme-btn" onClick={handleRegisterClick}>
              Registrera dig
            </button>
          </>
        )}
      </div>
    </>
  );
};
