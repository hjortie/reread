import Logo from "../assets/logo.svg?react";

export const Header = () => {
  return (
    <>
      <header className="container">
        <div className="logo">
          <Logo width={100} height={100} />
        </div>
        <h1>ReRead</h1>
      </header>
    </>
  );
};
