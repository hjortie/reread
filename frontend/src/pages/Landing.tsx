import { useNavigate } from "react-router";

export const Landing = () => {
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

        <button className="theme-btn" onClick={handleLoginClick}>
          Logga in
        </button>
        <button className="theme-btn" onClick={handleRegisterClick}>
          Registrera dig
        </button>
      </div>
    </>
  );
};
