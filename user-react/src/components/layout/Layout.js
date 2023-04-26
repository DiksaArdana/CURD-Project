import Footer from "./footer/Footer";
import NavigationBar from "./navbar/Navbar";

import "./layout.css";

const Layout = (props) => {
  return (
    <div className="layout">
      <NavigationBar/>
      <main className="sm:px-6 sm:py-24 lg:px-9 ">
        <div className="content">
          {props.children}
        </div>
      </main>
      <Footer className="footer " />
    </div>
  );
};

export default Layout;