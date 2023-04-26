import Footer from "./footer/Footer";
import NavigationBar from "./navbar/Navbar";

import "./layout.css";

const FormLayout = (props) => {
  return (
    <div className="layout">
      <NavigationBar className="navbar" />
      <main className="container  mt-4 mb-4">{props.children}</main>
      <Footer className="footer" />
    </div>
  );
};

export default FormLayout;