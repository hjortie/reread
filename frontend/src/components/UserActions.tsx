import { useNavigate } from "react-router";

export const UserActions = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <section className="user-actions">
      <button className="theme-btn" onClick={handleLoginClick}>
        Logga in
      </button>
      <button className="theme-btn" onClick={handleRegisterClick}>
        Registrera dig
      </button>
    </section>
  );
};
