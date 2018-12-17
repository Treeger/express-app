import Papa from 'papaparse';
import fs from 'fs'

export default class Importer {
    static import(path) {
        return new Promise((res, rej) =>{
            fs.readFile(path, 'utf8', (err,data)=>{
                if(err) rej(err);
                res(Papa.parse(data));
            });
        });
    }

    static importSync(path) {
        const csv = fs.readFileSync(path, 'utf8');
        return Papa.parse(csv);
    }
}