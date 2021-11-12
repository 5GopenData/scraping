import React, { useState, useEffect } from "react";
import AllResultsCard from "./allResultsCard";
import { Content } from "../data/content";
import AccordionComponent from "./accordion";
import Word from "../pages/word";

const API = process.env.REACT_APP_API;




const All = () => {


  const search_word = window.localStorage.getItem("word");

  console.log("-----------word----------");

  console.log(search_word);  

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



  console.log(products[0]);


  const first = Content.slice(0,1);
  const theRest = products;

  return (

    <div className="all-results-container">
      <h2 className="result-count">{products.length} resultats trouvés (10.67 secondes)</h2>
      <AccordionComponent results={products} />
      <AllResultsCard results={products} />
 {/*    <AllResultsCard results={theRest} />
 */}   </div>
 
  );
};

export default All;
