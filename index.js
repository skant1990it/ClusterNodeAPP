var cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    http = require('http'),
    fs = require('fs');
if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
}
else {
    http.createServer(function (request, response) {
        fs.readFile("index.html", function (err, file) {
            response.writeHead(200, {"Content-Type": "text/html"});
            console.log(file);
            response.write(file);
            response.end();
        });
    }).listen(8000);
}
