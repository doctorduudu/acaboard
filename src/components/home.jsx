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
import HomeFilesInit from "./common/homeFilesInit";
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

// class Home extends Component {
//   state = {
//     category: "",
//     subject: "",
//     results: []
//   };

//   async componentDidMount() {
//     const results = await getFiles();
//     this.setState({ results });
//   }

//   render() {
//     console.log(this.state.results);
//     return (
//       <React.Fragment>
//         {this.state.results.map(result => (
//           <Paper
//             key={result.name}
//             className="file-paper"
//             style={{
//               width: "80%",
//               margin: "auto",
//               marginBottom: "10px"
//             }}
//           >
//             <Typography
//               variant="h5"
//               component="h3"
//               style={{
//                 padding: "5px",
//                 fontSize: "15px",
//                 fontWeight: 600
//               }}
//             >
//               {result.name}
//             </Typography>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <Typography
//                 variant="h5"
//                 component="h3"
//                 style={{
//                   padding: "5px",
//                   fontSize: "12px"
//                 }}
//               >
//                 {result.category}
//               </Typography>
//               <Typography
//                 variant="h5"
//                 component="h3"
//                 style={{
//                   padding: "5px",
//                   fontSize: "12px"
//                 }}
//               >
//                 {result.subject}
//               </Typography>
//               <Button
//                 size="small"
//                 color="primary"
//                 className="download-button primary-backgroud"
//               >
//                 <CloudDownloadIcon />
//               </Button>
//             </div>
//           </Paper>
//         ))}
//       </React.Fragment>
//     );
//   }
// }

// export default Home;

const Home = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    category: "",
    subject: ""
  });
  const [results, setResults] = React.useState([]);
  const [changed, setChanged] = React.useState(false);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFindFile = event => {
    event.preventDefault();

    const category = values.category;
    const subject = values.subject;

    if (category === "" && subject === "") {
      alert("Please Select a Category, Subject or Both");
      return;
    }

    const docRef = firebase.firestore().collection("files");
    let resultsInit = [];

    docRef
      .where("category", "==", category)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          resultsInit.push(doc.data());
        });
      });

    setResults(resultsInit);

    console.log("category:", category, "subject:", subject);
    console.log("searching for file now");
  };

  function viewFiles() {
    setChanged(!changed);
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
      <HomeFilesInit />
    </React.Fragment>
  );
};

export default Home;
