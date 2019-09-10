import React, { Component } from "react";
import * as firebase from "firebase";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Button from "@material-ui/core/Button";
import { getFiles } from "../../getFiles";

class HomeFilesInit extends Component {
  state = {
    results: []
  };

  componentDidMount() {
    const results = getFiles();
    this.setState({ results });
    console.log(this.state.results);
  }

  handleDownload = fileName => {
    const storageRef = firebase.storage().ref(`files/${fileName}`);

    storageRef.getDownloadURL().then(function(url) {
      // var xhr = new XMLHttpRequest();
      // xhr.responseType = "blob";
      // xhr.onload = function(event) {
      //   var blob = xhr.response;
      // };
      // xhr.open("GET", url);
      // xhr.send();

      // // <a href={url} target="_blank" id="download-file">download</a>

      // let downloadButton = document.createElement("a");
      // downloadButton.href = url;
      // // downloadButton.target = "_blank";
      // console.log(url);
      // downloadButton.click();
      window.location.href = url;
    });
  };

  render() {
    const { results } = this.state;
    console.log(this.state.results);

    return (
      <div style={{ marginTop: 10 }}>
        {results.map(result => (
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
                onClick={() => this.handleDownload(result.name)}
              >
                <CloudDownloadIcon />
              </Button>
            </div>
          </Paper>
        ))}
      </div>
    );
  }
}

export default HomeFilesInit;
