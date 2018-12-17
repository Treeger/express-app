import fs from 'fs';
import EventEmitter from 'events';

export default class DirWatcher extends EventEmitter{
    constructor() {
        super();
        this.files = {}
    }

    watch(path, delay) {
        setInterval(()=> {
            fs.readdir(path, (err, files) => {
                files.forEach(fileName => {
                    const filePath = path + fileName;
                    const fileNameCached = this.files[fileName];
                    const mtime = fs.statSync(filePath).mtime;
                    if (!fileNameCached || (fileNameCached && fileNameCached !== mtime)) {
                        this.files[fileName] = mtime;
                        this.emit('dirwatcher:changed​', filePath);
                    }

                });
            });
        }, delay);
    }
}