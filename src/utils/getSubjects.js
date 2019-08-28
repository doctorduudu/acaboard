import { getCategories } from "./getCategories";

const categories = getCategories();

export function getSubjects(chosenCategory) {
  let cat = [];
  switch (chosenCategory) {
    case "bahs231":
      cat = categories.filter(category => category.id === "bahs231")[0]
        .subjects;
      break;
    case "bahs232":
      cat = categories.filter(category => category.id === "bahs232")[0]
        .subjects;
      break;
    case "bahs233":
      cat = categories.filter(category => category.id === "bahs233")[0]
        .subjects;
      break;
    case "bahs234":
      cat = categories.filter(category => category.id === "bahs234")[0]
        .subjects;
      break;
    case "bahs235":
      cat = categories.filter(category => category.id === "bahs235")[0]
        .subjects;
      break;
    case "bahs236":
      cat = categories.filter(category => category.id === "bahs236")[0]
        .subjects;
      break;
    case "bahs237":
      cat = categories.filter(category => category.id === "bahs237")[0]
        .subjects;
      break;
    case "bahs238":
      cat = categories.filter(category => category.id === "bahs238")[0]
        .subjects;
      break;
    case "bahs331":
      cat = categories.filter(category => category.id === "bahs331")[0]
        .subjects;
      break;
    case "bahs332":
      cat = categories.filter(category => category.id === "bahs332")[0]
        .subjects;
      break;
    case "bahs333":
      cat = categories.filter(category => category.id === "bahs333")[0]
        .subjects;
      break;
    case "bahs334":
      cat = categories.filter(category => category.id === "bahs334")[0]
        .subjects;
      break;
    case "bahs335":
      cat = categories.filter(category => category.id === "bahs335")[0]
        .subjects;
      break;
    case "bahs336":
      cat = categories.filter(category => category.id === "bahs336")[0]
        .subjects;
      break;
    case "bahs337":
      cat = categories.filter(category => category.id === "bahs337")[0]
        .subjects;
      break;
    case "meds302":
      cat = categories.filter(category => category.id === "meds302")[0]
        .subjects;
      break;
    case "psyc201":
      cat = categories.filter(category => category.id === "psyc201")[0]
        .subjects;
      break;
    case "soci306":
      cat = categories.filter(category => category.id === "soci306")[0]
        .subjects;
      break;
    default:
      cat = [{ name: "Choose Category First", id: "choose-category" }];
  }
  return cat;
}
