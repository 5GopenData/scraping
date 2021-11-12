import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";
import AllResultsCard from "../components/allResultsCard";
import Header from "../components/header";
import Footer from "../components/footer";
import FilterMenu from "../components/filtermenu";

function NotFound() {
  // Get url pathname to use as search value
  const urlPathname = window.location.pathname;
  var rx = /[^/](.*)/g;
  var arr = rx.exec(urlPathname);
  let val = " ";
  if (arr) {
    val = arr[0];
  }

  return (
    <div className="main">
      <Header />
      <FilterMenu />
      <div className="all-results-container notfound-page">
        <div className="suggest">
          <p> Le moteur Groupe 4 recherche votre requette : </p>
          <div className="suggestions">
            <Link to="/all"> Tout </Link>
            <Link to="/about"> Description </Link>
            <Link to="/works"> Images </Link>
            <Link to="/social"> Comparateurs </Link>
          </div>
        </div>
        <div className="notfound-details">
          <p>
            {" "}
            Partienter quelque seconde pour: <b> {val} </b>  ...
          </p>
         
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default NotFound;
