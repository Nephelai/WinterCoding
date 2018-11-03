var todos = require('./index.server.controller');

module.exports = function(app) {
	app.get("/", function (req, res) {
	  res.render("../src/index.html");
	});

    app.route("/api/getTodo")
        .get(todos.getTodo);

    app.route("/api/SaveTodo")
    	.post(todos.saveTodo);

	app.route("/api/deleteTodo")
		.post(todos.deleteTodo);

	app.route("/api/revertTodo")
		.post(todos.revertTodo);
};
