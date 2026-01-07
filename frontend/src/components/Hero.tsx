import Spinner from "../assets/GUL.svg?react";

export const Hero = () => {
  return (
    <>
      <div className="container hero">
        <h1>Samlar böckerna damm? Byt ut dem!</h1>
        <Spinner height={200} width={200} className="hero__spinner" />
      </div>
    </>
  );
};
