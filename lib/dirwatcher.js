import fs from 'fs';
import EventEmitter from 'events';


export default class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.files = {}
    }

    watch(path, delay) {
        setInterval(() => {
            fs.readdir(path, (err, files) => {
                if(err) console.error(err);
                files.forEach(fileName => {
                    const filePath = path + fileName;
                    const fileNameCached = this.files[fileName];
                    fs.stat(filePath, mtime => {
                        if (!fileNameCached || (fileNameCached && fileNameCached !== mtime)) {
                            this.files[fileName] = mtime;
                            this.emit(changedEventName, filePath);
                        }
                    });

                });
            });
        }, delay);
    }
}

export const changedEventName = 'dirwatcher:changed​';