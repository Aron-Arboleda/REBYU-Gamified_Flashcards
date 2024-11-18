import "./Header.css";
const Header = ({ children }) => {
  return (
    <div className="header">
      <div className="header_wrapper">{children}</div>
    </div>
  );
};

export default Header;
