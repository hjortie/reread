import Frame from "../assets/footer_book.svg?react";
export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__decoration">
          <Frame />
        </div>
        <div className="footer__content">
          <div className="footer__content--text container">
            © Elin Hjortskull, 2025
          </div>
        </div>
      </footer>
    </>
  );
};
