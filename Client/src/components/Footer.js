import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import StarBorder from "@material-ui/icons/StarBorder";

// const NavItems = [
//   {
//     icon: <StarBorder />,
//     name: "Starred"
//   },
//   {
//     icon: <SendIcon />,
//     name: "Mail"
//   },
//   {
//     icon: <DraftsIcon />,
//     name: "Drafts"
//   }
// ];

const styles = theme => ({
  flex: {
    flexGrow: 1
  },
  appbar:{
    color: "dimgrey",
    "background-color": "white",
  },
  footer: {
  backgroundColor: "#fff",
  borderTop: "1px solid #ededed",
  padding: 0,
  position: "absolute",
  textAlign: "center",
  color: "#484848",
  bottom: 0,
  left: 0,
  right: 0,
  width: "100%",
  }
});

class Footer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.footer}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="subheading" color="inherit">
              {/* Footer  */}
            </Typography>

            <Typography color="inherit" variant="caption">
              {/* Yorganize
              your footer content. */}
            </Typography>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={6}>
            <FooterMenuList navItems={NavItems} />
          </Grid> */}

          <Divider />

          <AppBar position="static" className={classes.appbar}>
            <Toolbar variant="dense">
              <Typography
                variant="caption"
                color="inherit"
                className={classes.flex}
              >
                The wesbite is a univeristy project and not intended for actual use. Copyright © 2019
              </Typography>
              <Typography color="inherit" variant="caption">
                Terms and Conditions
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
      </Paper>
    );
  }
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
