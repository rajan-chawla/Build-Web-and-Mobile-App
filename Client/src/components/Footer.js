import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
/**
 * sticky footer
 */
const Footer = () => {
  const footStyle = {
    backgroundColor: "#2872d6",
    position: "fixed",
    marginTop: "40px",
    height: "40px",
    bottom: "0px",
    width: "100%",
    zIndex: "50"
  };
  return (
    <footer style={footStyle} className="py-2 text-white-50">
      <div className="container text-center">
        <small>
          The wesbite is a univeristy project and not intended for actual use. Copyright © 2020.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
