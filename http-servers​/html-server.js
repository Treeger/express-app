const http = require('http');
const port = 3000;
const fs = require('fs');
const { Transform } = require('stream');

const requestHandler = (request, response) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    const partial = fs.createReadStream('index.html','utf8');

    const myImportantText = 'How your doing?';

    const textReplacer = new Transform({
        readableObjectMode: true,
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().replace(/{message}/, myImportantText));
            callback();
        }
    });

    partial.pipe(textReplacer).pipe(response);
};


const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something went wrong: ', err)
    }
    console.log(`server is listening on ${port}`)
});