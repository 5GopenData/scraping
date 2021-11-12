import "../styles.css";
import "../search.css";
import React, { Component, useEffect,  } from "react";
import Logo from "../components/logo";
import SearchBox from "../components/searchbox";
import BoxMenuDrop from "../components/boxmenudrop";
import ProfileMenuDrop from "../components/profilemenudrop";
import { useHistory } from "react-router-dom";
import { Content } from "../data/content";
import { Link } from "react-router-dom";
import { faBatteryEmpty } from "@fortawesome/free-solid-svg-icons";
import Word from "./word";

const API = process.env.REACT_APP_API;

const search_word = 'Livre+de+cuisine';

function Home() {
  
  

  const history = useHistory();

  const redirection = (chemin) =>{
    let url = "http://localhost:5005/search/" + chemin;
    window.location = url;
  }

  // These values will be shown in the search dropdown
  // The name property is the actual text and the value property is the link
  const options = [
    {
      name: "Tout",
      value: "all"
    },
  
    { name: "Descriptions", value: "works" },
    { name: "images", value: "images" },
    { name: "Comparateurs", value: "writing" }

  ];



  // Website search
  const searchWebsite = () => {
    
    let path = document.querySelector(".search-input").value;

    

    redirection(path);
 
    let newPath = path.split('%20').join('+');


    window.localStorage.setItem("word",newPath);

    console.log(newPath);




 /* // search_word
    if (path) {
      history.push(`${API}/search/${path}/`);
    }

  //return <Redirect to={`${API}/search/${path}/`}  /> */

  };

  useEffect(() => {
    let inputField = document.querySelector(".search-input");
    //Trigger search when the enter key is pressed
    inputField.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        searchWebsite();
      }
    });
  // eslint-disable-next-line
}, []);

  // I'm Feeling Lucky search
  function feelingLucky() {
    let path = document.querySelector(".search-input").value;

    // Route to random page if search input is empty
    if (!path) {
      history.push(`/${options[Math.floor(Math.random() * options.length)].value}`);
      return;
    }

    /* Get all elements matching the search term */
    const item = Content.filter((item) => item.category === path);

    // Get the link of the first match
    // Redirect to first match, if it exists
    if (item[0]) {
      const url = item[0].link;
      window.location.href = url;
    } else if (path) {
      history.push(path);
    }
  }

  return (
    <div className="home main">
      <div className="top-menu">
        <span className="top-menu-item no-show-mobile">
          {" "}
          <a href="mailto:enjeckc1e0@gmail.com"> Email </a>
        </span>
        <span className="top-menu-item no-show-mobile">
          {" "}
          <a href="https://github.com/enjeck"> GitHub </a>
        </span>
        <BoxMenuDrop />
        <ProfileMenuDrop />
      </div>
     <div className="flex-center">
      <div className="search-container">
        <div className="frontpage-logo">
          <Logo />
        </div>
          <SearchBox options={options} />
        <div className="search-btns">
          <input
            className="search-btn sw"
            type="button"
            value="Recherche G4"
            onClick={searchWebsite}
          />

           <input
            className="search-btn ifl"
            type="button"
            value="Recherche Recente" 
            onClick={feelingLucky}
          /> 

        </div>
      </div>
      </div>

      <footer className="footer">
        <div className="country">
          Cours scraping avec M. SAYS BEJAOUI        
        </div>
      </footer>
    </div>
  );
}
export default Home;
