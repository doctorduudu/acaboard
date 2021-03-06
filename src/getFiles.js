import * as firebase from "firebase";

export function getFiles() {
  const docRef = firebase.firestore().collection("files");
  let results = [];

  docRef
    .orderBy("uploadDate", "desc")
    .limit(6)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const file = doc.data();
        results.push(file);
      });
    });

  return results;
}
