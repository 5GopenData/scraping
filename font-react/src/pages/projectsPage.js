import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import { ProjectsContent } from "../data/projectsContent";
import "./projectsPage.css";
import Header from "../components/header";
import Footer from "../components/footer";
import FilterMenu from "../components/filtermenu";
import Word from "./word";


const API = process.env.REACT_APP_API;

const search_word = window.localStorage.getItem("word");


const ProjectsPage = ({ }) => {


  const [products, setProduct] = useState([]);
  
  console.log("-----------getProduct----------");

  const getProducts = async () => {

    const res = await fetch(`${API}/products/${search_word}/`);

    const data = await res.json();

    setProduct(data);


  };


  function prix(p){

    let np = '';

    if(p == null){

      np = 'Sur Abonnement';

    }else{

      np = p;

    }

    return np;

  }


  function note(p){

    let np = '';

    if(p == null){

      np = 'Non disponible';

    }else{

      np = p;

    }

    return np;

  }

  function autor(p){

    let np = '';

    if(p == ''){

      np = 'Non Disponible';

    }else{

      np = p;

    }

    return np;

  }

  function cmt(p){

    let np = '';

    if(p == null){

      np = '0';

    }else{

      np = p;

    }

    return np;

  }



  function best(p){

    let np = '';

    if(p == false){

      np = '';

    }else{

      np = 'Best-Seller';

    }

    return np;

  }


  useEffect(()=>{

    getProducts();



  },[])
  
  return (
    <div className="main">
      <Header />
      <FilterMenu />
      <div className="all-results-container">
        <p className="result-count">
        A propos {products.length} resultats trouvés (10.67 secondes)
        </p>
        <div className="projects-content">
          {products.map((item) => (
            <div className="projects-card">
              <a href={`${item.liens}`} className="project-link">
                <h3>{`${item.titre}`}</h3>
              </a>
              <div className="projects-details">
                <div className="projects-img-container">
                  <img src={item.image} alt={item.titre} />
                </div>
                <div className="projects-text-container">
                  <p className="projects-excerpt" style={{marginBottom: '10px'}}>{`${item.titre}`}</p>
                  <p className="projects-tools">Prix : <span style={{color:'#000', fontWeight:'bolder'}}> {prix(item.prix)} </span> </p>
                  <p className="projects-tools">Note : <span style={{color:'#000', fontWeight:'bolder'}}> {note(item.note)} </span> </p>
                  <p className="projects-tools">Nombre d'évaluateur : <span style={{color:'#000', fontWeight:'bolder'}}> {cmt(item.nbre_cmt)} </span> </p>
                  <p className="projects-tools">Format : <span style={{color:'#000', fontWeight:'bolder'}}> {`${item.format}`} </span> </p>
                  <p className="projects-tools">Auteurs : <span style={{color:'#000', fontWeight:'bolder'}}> {autor(item.auteur)} </span> </p>
                  <p className="projects-tools"><span style={{color:'#F39C12'}}> {best(item.best_seller)}  </span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
