import React, { useState } from "react";
import "./accordion.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const AccordionComponent = ({results}) => {

  const [filteredResults] = useState(results);

  const classes = useStyles();

  return (
    <div className="accordion-container">
      <div className="accordion-sub-container">
        <div className={classes.root}>
          <h2 style={{ fontWeight: "normal", color: "#333" }}>
            Resultats de la recherche : <span style={{color:"#2D3C86"}}> Groupe 4 Search  </span>
          </h2>

          <img />
          
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Nombre de resulats sur Amazon
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              {results.length} : articles trouvés
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
              Nombre de resulats sur la Fnac
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                0 : articles trouvés
              </Typography>
            </AccordionDetails>
          </Accordion>
         
         
        </div>
      </div>
    </div>
  );
};

export default AccordionComponent;
