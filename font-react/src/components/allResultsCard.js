import React, { useState } from "react";
import PropTypes from "prop-types";
import "./allResultsCard.css";

const AllResultsCard = ({ results }) => {


  const [filteredResults] = useState(results);

  
  //console.log(results[0].titre.indexOf(':'));

  function title_(v){

    let newTitle = ''

    if(v.indexOf(':') !=  -1 ){
        
     newTitle = v.substring(0, v.indexOf(':') );

    }else{
 
      newTitle = v;

    }

    return newTitle;
  } 


  

  function formatURL(u) {
    // Split a given url into its various parts
    let urltext = u;
    let url = new URL(urltext);
    let domain = url.origin
    let pathname = url.pathname
    let paths = pathname.split('/');
    paths = paths.filter(Boolean);
    return [domain, paths]
  }
  

  function prix(p){

    let np = '';

    if(p == null){

      np = 'Sur Abonnement';

    }else{

      np = p;

    }

    return np;

  }

  return (
    <div className="results-content">
      {results.map((item) => (
        <div className="result-card">
          <a href={`${item.liens}`}>
            <p> 
              {`${formatURL(item.liens)[0]}`}  
              {formatURL(item.liens)[1].map((path) => (
                <span>{` › ${path}`}</span>
              ))  } 
            </p>
            <h3>{`${title_(`${item.titre}`)}`}</h3>
          </a>
          
          <p className="excerpt" >
          <span style={{fontWeight:'bold', color:'orange'}}> Prix :
          
            {prix(item.prix)}
           
           </span> 
          <br/>
            {`${item.titre}`}</p>

        </div>
      ))}
    </div>
  );
};

AllResultsCard.propTypes = {
  results: PropTypes.array
};

export default AllResultsCard;
