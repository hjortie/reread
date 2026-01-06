import { useMe } from "../hooks/useMe";
import { Hero } from "../components/Hero";
import { Guide } from "../components/Guide";
import { UserActions } from "../components/UserActions";

export const Landing = () => {
  const { user } = useMe();

  return (
    <>
      <div className="landing container">
        <Hero />
        <Guide />

        {!user && <UserActions />}
      </div>
    </>
  );
};
