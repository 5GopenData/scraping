import React from "react";
import { ImagesContent } from "../data/imagesContent";
import "./imagesPage.css";
import Header from "../components/header";
import Footer from "../components/footer";
import FilterMenu from "../components/filtermenu";
import {useState, useEffect} from 'react';



const API = process.env.REACT_APP_API;

const search_word = window.localStorage.getItem("word");


const ImagesPage = ({ results }) => {

  const [products, setProduct] = useState([]);
  
  console.log("-----------getProduct----------");

  const getProducts = async () => {

    const res = await fetch(`${API}/products/${search_word}/`);

    const data = await res.json();

    setProduct(data);


  };


  useEffect(()=>{

    getProducts();

  },[])

  return (
    <div className="main">
      <Header />
      <FilterMenu />
      <div className="images-content">
        {products.map((item) => (
          <div className="images--card">
            <a href={item.liens} className="images--img-container">
              <img src={item.image} alt={item.titre} />
            </a>
            <a href={item.link} className="images--text-container">
              <p className="images--name">{`${item.titre}`}</p>
            </a>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ImagesPage;
