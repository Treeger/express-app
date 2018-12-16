import mainConfig from "./config/main";
import {User, Product} from "./models"
import Importer from "./lib/importer"

//console.log(mainConfig.name);

// const user = new User;
// const product = new Product();

const path = './data/sample.csv';
const result = Importer.import(path);
console.log(result);