const Hapi = require('@hapi/hapi');
const Path = require('path');

const init = async () => {
	const server = Hapi.server({
		port: process.env.PORT || 8080,
		host: 'localhost',
	});

	// register static file server plugin
	await server.register(require('@hapi/inert'));

	// route
	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			// this route will serve the 'static' directory
			directory: {
				path: Path.join(__dirname, 'static'),
				index: ['index.html'],
			},
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
