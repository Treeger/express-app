import Importer from "./lib/importer"
import DirWatcher, {changedEventName} from "./lib/dirwatcher"

const watcher = new DirWatcher();
watcher.watch('./data/', 2000);

watcher.on(changedEventName, (filePath) => {
    Importer.import(filePath).then(parsedCsv => console.log(parsedCsv));
});