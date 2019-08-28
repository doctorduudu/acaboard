import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className="navbar primary-backgroud">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            // component={Link}
            // to="/"
            id="navbar-brand"
            className={classes.title}
            variant="h5"
            noWrap
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "15px",
              fontStyle: "cursive"
            }}
          >
            UGMSA ACABOARD
          </Typography>
          {/* <Button color="inherit" component={Link} to="/upload">
            Upload
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
