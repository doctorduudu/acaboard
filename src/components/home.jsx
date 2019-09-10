import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { getCategories } from "../utils/getCategories";
import { getSubjects } from "../utils/getSubjects";
import { getSubjectsList } from "../utils/getSubjectsList";
// import HomeFilesInit from "./common/homeFilesInit";
import firebase from "firebase";
import { getFiles } from "../getFiles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    flexBasis: 200,
    width: 300
  }
}));

const Home = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    category: "",
    subject: ""
  });
  const [results, setResults] = React.useState(getFiles);
  const [changed, setChanged] = React.useState(false);
  const [noFIleFound, setNoFileFound] = React.useState(false);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  let contentReloader = setTimeout(function() {
    setChanged(!changed);
  }, 1000);
  if (results.length !== 0 || noFIleFound) {
    clearTimeout(contentReloader);
  }

  const handleFindFile = event => {
    event.preventDefault();
    setResults([]);

    const category = values.category;
    const subject = values.subject;

    const docRef = firebase.firestore().collection("files");
    let resultsInit = [];

    if (category === "" && subject === "") {
      alert("Please Select a Category, Subject or Both");
      return;
    } else if (category !== "" && subject === "") {
      docRef
        .where("category", "==", category)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            resultsInit.push(doc.data());
          });
        });
    } else if (category === "" && subject !== "") {
      docRef
        .where("subject", "==", subject)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            resultsInit.push(doc.data());
          });
        });
    } else {
      docRef
        .where("category", "==", category)
        .where("subject", "==", subject)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            resultsInit.push(doc.data());
          });
        });
    }

    setResults(resultsInit);

    setChanged(!changed);
    const fileShower = document.getElementById("file-shower");
    viewFiles();
    console.log(fileShower);

    console.log("category:", category, "subject:", subject);
    console.log("searching for file now");
  };
  console.log("results", results);

  function viewFiles() {
    setChanged(!changed);
  }

  function handleDownload(fileName) {
    const storageRef = firebase.storage().ref(`files/${fileName}`);

    storageRef.getDownloadURL().then(function(url) {
      window.location.href = url;
    });
  }

  const categories = getCategories();
  const subjectsList = getSubjectsList();
  const renderSubject = () => getSubjects(values.category);

  return (
    <React.Fragment>
      <div>
        <Paper className="home-paper">
          <Typography
            variant="h5"
            component="h3"
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "5px",
              fontSize: "20px"
            }}
          >
            How to find files
          </Typography>
          <Typography
            variant="body1"
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "5px",
              fontSize: "15px"
            }}
          >
            Select one, or both(for specificity)
          </Typography>
          <Grid container>
            <Grid item md={4}>
              <List>
                <ListItem>
                  <CheckCircleOutlineIcon />
                  <ListItemText>Category</ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={4}>
              <List>
                <ListItem>
                  <CheckCircleOutlineIcon />
                  <ListItemText>Subject</ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={4}>
              <List>
                <ListItem>
                  <CheckCircleOutlineIcon />
                  <ListItemText>Click Find File</ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div style={{ margin: "auto", marginBottom: "15px" }}>
        <form>
          <Grid
            item
            container
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "auto"
            }}
          >
            <Grid item lg={4}>
              <TextField
                select
                label="Select Category"
                className={clsx(classes.margin, classes.textField)}
                value={values.category}
                onChange={handleChange("category")}
              >
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item lg={4}>
              <TextField
                select
                label="Select Subject"
                className={clsx(classes.margin, classes.textField)}
                value={values.subject}
                onChange={handleChange("subject")}
              >
                {(values.category &&
                  renderSubject().map(subject => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))) ||
                  subjectsList.map(subject => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item lg={4}>
              <Button
                // disabled={!Boolean(values.category) && !Boolean(values.subject)}
                type="submit"
                onClick={handleFindFile}
                variant="contained"
                style={{ width: 250, marginTop: 12 }}
                className="find-button primary-backgroud"
              >
                Find Files
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Divider />
      <div style={{ marginTop: 10 }}>
        {noFIleFound ? (
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <div style={{ display: "inline-block" }}>
              Sorry No File Matched Your Search
            </div>
          </div>
        ) : (
          results.map(result => (
            <Paper
              key={result.name}
              className="file-paper"
              style={{
                width: "80%",
                margin: "auto",
                marginBottom: "10px"
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                style={{
                  padding: "5px",
                  fontSize: "15px",
                  fontWeight: 600
                }}
              >
                {result.name}
              </Typography>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h5"
                  component="h3"
                  style={{
                    padding: "5px",
                    fontSize: "12px"
                  }}
                >
                  {result.category}
                </Typography>
                <Typography
                  variant="h5"
                  component="h3"
                  style={{
                    padding: "5px",
                    fontSize: "12px"
                  }}
                >
                  {result.subject}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  className="download-button primary-backgroud"
                  onClick={() => handleDownload(result.name)}
                >
                  <CloudDownloadIcon />
                </Button>
              </div>
            </Paper>
          ))
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
