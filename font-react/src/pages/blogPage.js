import React, { useState ,useEffect} from "react";
import PropTypes from "prop-types";
import { BlogContent } from "../data/blogContent";
import "./blogPage.css";
import Header from "../components/header";
import Footer from "../components/footer";
import FilterMenu from "../components/filtermenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import Word from "./word";

const API = process.env.REACT_APP_API;

const search_word = window.localStorage.getItem("word");


const BlogPage = ({ results }) => {


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

  function title_(v){

    let newTitle = ''

    if(v.indexOf(':') !=  -1 ){
        
     newTitle = v.substring(0, v.indexOf(':') );

    }else{
 
      newTitle = v;

    }

    return newTitle;
  } 


  const img = "https://m.media-amazon.com/images/G/08/gc/designs/livepreview/amazon_squidink_noto_email_v2016_fr-main._CB463436975_.png";

  const imgs = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Fnac_Logo.svg/998px-Fnac_Logo.svg.png";
  return (
    <div className="main">
      <Header />
      <FilterMenu />
      <div className="all-results-container blogpage-container">
        <p className="result-count">
          Meilleurs Produits sur les  {products.length} resultats
        </p>
        <div className="blog-content">
          {products.map((item) => (

          
           //console.log(item.best_seller);
           
          
         [item.best_seller && (<a href={item.liens} className="blog-card">
              <div className="blog-text-container">
                <div className="category">
                  <img src="https://m.media-amazon.com/images/G/08/gc/designs/livepreview/amazon_squidink_noto_email_v2016_fr-main._CB463436975_.png" className="blog-icon"/>
                  <p> amazon </p>
                </div>
                <h3>{title_(item.titre)}</h3>
                <p className="blog-excerpt">{`${item.titre}`}</p>
                <p className="blog-date">{`${item.note}`}</p>
                <p className="blog-date" style={{color:'#2D3C86'}}>Best Seller</p>

              </div>
              <div className="blog-img-container">
                <img src={item.image} alt={item.titre} />
              </div>
            </a>)
         ]
          

          
  ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
