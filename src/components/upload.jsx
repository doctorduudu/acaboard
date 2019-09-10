import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { makeStyles } from "@material-ui/core/styles";
import { getCategories } from "../utils/getCategories";
import { getSubjects } from "../utils/getSubjects";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import * as firebase from "firebase";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

class StudentRegisterForm extends Form {
  state = {
    data: {
      fileName: "",
      category: "",
      subject: "",
      acaboardCode: "",
      chooseFile: ""
    },
    errors: {},
    file: {},
    uploadDone: 0
  };

  schema = {
    fileName: Joi.string()
      .min(3)
      .required()
      .label("File Name"),
    category: Joi.string()
      .required()
      .label("Category/Module"),
    subject: Joi.string()
      .required()
      .label("Subject"),
    acaboardCode: Joi.string().label("Acaboard Code"),
    chooseFile: Joi.string()
  };

  doSubmit = () => {
    const { data, file } = this.state;

    if (data.acaboardCode !== "acacode") {
      alert("invalid acaboard code");
      return;
    }

    // Call the server
    let newFile = {};
    newFile.name = data.fileName;
    newFile.category = data.category;
    newFile.subject = data.subject;
    newFile.file = file;
    newFile.uploadDate = Date.now();

    // console.log("Submitted");
    // console.log("files", this.state.file);
    // console.log("new file details", newFile);

    // Create a storage ref
    const storageRef = firebase.storage().ref(`files/${newFile.name}`);

    // upload the file
    const task = storageRef.put(newFile.file);

    // Watch the state changes
    task.on("state_changed", function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      let uploader = document.getElementById("uploader");
      uploader.style.display = "block";
      uploader.textContent = `upload progress: ${Math.round(progress)}%`;
      if (progress >= 100) {
        alert("successfully uploaded file");
      }
      // console.log("Upload is " + progress + "% done");
    });

    // task.on("state_changed", function error(error) {
    //   console.log(error.task);
    // });

    firebase
      .firestore()
      .collection("files")
      .add({
        name: newFile.name,
        category: newFile.category,
        subject: newFile.subject,
        uploadDate: newFile.uploadDate
      })
      .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
        // alert("file successfully uploaded");
        // this.setState({ uploadDone: true });
      })
      .catch(function(error) {
        // console.log("Error adding document: ", error);
        alert("error uploading file");
      });

    if (this.state.uploadDone === true) {
      this.setState({
        data: {
          fileName: "",
          category: "",
          subject: "",
          acaboardCode: "",
          chooseFile: ""
        }
      });
    }
  };

  categories = getCategories();

  renderSubject = () => getSubjects(this.state.data.category);

  render() {
    const classes = useStyles;

    return (
      <Container
        component="main"
        maxWidth="sm"
        style={{
          marginTop: "5vh",
          backgroundColor: "#eee",
          padding: "4rem",
          borderRadius: "6px"
        }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Grid justify="center" alignItems="center" item container>
            <Avatar className="upload-page-avatar primary-backgroud">
              <CloudUploadIcon />
            </Avatar>
            <br />
            <Typography
              component="h1"
              variant="h5"
              style={{ marginLeft: "10px" }}
            >
              Upload File
            </Typography>
          </Grid>
          {/* {this.state.uploadProgress && ( */}
          <div id="uploader" style={{ display: "none" }}></div>

          <form className={classes.form} onSubmit={this.handleSubmit}>
            {this.renderTextField("fileName", "File Name")}
            {this.renderSelect(
              "category",
              "Select Category/Module",
              this.categories
            )}
            {this.state.data.category &&
              this.renderSelect(
                "subject",
                "Select Subject",
                this.renderSubject()
              )}
            {this.renderTextField("acaboardCode", "Acaboard Code")}
            {this.renderFileInput(
              "chooseFile",
              "Choose a File:  ",
              this.state.file
            )}
            {this.renderSubmitButton("Upload")}
          </form>
        </div>
      </Container>
    );
  }
}

export default StudentRegisterForm;
