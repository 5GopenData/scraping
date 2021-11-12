import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="country">
        Cours Scraping 
      </div>
      <div className="footer-links">
        <div className="footer-links-section">
          <Link to="/about"> A propos </Link>
          <Link to="/projects"> Description </Link>
          <Link to="/blog"> Blog</Link>
          <a href="mailto:angeraphaelouanne@gmail.com"> Email </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
