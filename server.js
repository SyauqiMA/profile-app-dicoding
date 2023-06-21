const Hapi = require('@hapi/hapi');

const init = async () => {
	const server = Hapi.server({
		port: 3000,
		host: 'localhost',
	});

	// register static file server plugin
	await server.register(require('@hapi/inert'));

	// route
	server.route({
		method: 'GET',
		path: '/',
		handler: function (request, h) {
			// return file
			return h.file('./static/index.html');
		},
	});
	await server.start();
	console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();
