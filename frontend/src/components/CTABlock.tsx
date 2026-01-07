import { Link } from "react-router";

export const CTABlock = () => {
  return (
    <div className="CTA-block">
      <h2>Redo för mer läsning?</h2>
      <Link className="theme-btn" to="/browse">
        Till böckerna!
      </Link>
    </div>
  );
};
