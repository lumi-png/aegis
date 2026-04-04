const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-4">
      <aside>
        <p>Copyright &copy; {new Date().getFullYear()} - Miguel R. Buccat</p>
        <p>
          <a href="https://github.com/lumi-png/aegis" className="link link-hover" target="_blank" rel="noopener noreferrer">Source Code</a>
          {" | "}
          <a href="https://github.com/lumi-png/aegis/blob/main/LICENSE" className="link link-hover" target="_blank" rel="noopener noreferrer">License</a>
          {" | "}
          <a href="https://github.com/lumi-png" className="link link-hover" target="_blank" rel="noopener noreferrer">Author</a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
