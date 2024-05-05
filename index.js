const Server = import('bare-server-node');
const http = import('http');
const nodeStatic = import('node-static');


const bare =  Server('/bare/', '');
const serve = new nodeStatic.Server('static/');

const server = http.createServer();

server.on('request', (request, response) => {
    if (bare.route_request(request, response)) return true;
    serve.serve(request, response);
});

server.on('upgrade', (req, socket, head) => {
	if(bare.route_upgrade(req, socket, head))return;
	socket.end();
});

server.listen(process.env.PORT || 8080);
