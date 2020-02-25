import React, { useContext, Component } from "react";
import Listing from "./Listing";
import "../css/home.css";
import { HeaderContext } from "./HeaderContext";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Toaster from './Toaster';
import styles from './componentStyles/Home.module.css';
import { StylesContext } from "@material-ui/styles";



/**
 * landing page includes listing component
 * and passes context values as props to it
 */
const Home = () => {
  const [values, setValues] = useContext(HeaderContext);
  return (
    <div> 

        <div className={styles.homeImage}>
          <span className={styles.homeImageTxt}>
            Be the first to try out new exciting products!
          </span>
        </div>

        <div className='container' >

        
    <Container >
      <br/>
            <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
              Our Products
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            
      </Container>

      <div className="row">
        <Listing
          searchTerm={values.searchTerm}
          searchType={values.searchType}
        />
      </div>
      </div>

    </div>
  );
};
export default Home;
