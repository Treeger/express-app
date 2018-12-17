import Importer from "./lib/importer"
import DirWatcher from "./lib/dirwatcher"

const watcher = new DirWatcher();
watcher.watch('./data/', 2000);

watcher.on('dirwatcher:changed​', (filePath) => {
    Importer.import(filePath).then(parsedCsv => console.log(parsedCsv));
});