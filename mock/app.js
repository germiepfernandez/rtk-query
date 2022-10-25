const express = require("express");
const app = express();
app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
	// Request methods you wish to allow
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	// Pass to next layer of middleware
	next();
});

function generateRandomDelay() {
	const randomNum = 1000 + Math.random() * 1000;
	return Math.round(randomNum / 100) * 100;
}

const todos = [
	{
		id: "task_api_1",
		status: "ongoing",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Egestas purus viverra accumsan in. Eget est lorem ipsum dolor. Egestas sed tempus urna et. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Consectetur a erat nam at lectus urna duis. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. Consequat mauris nunc congue nisi vitae. At in tellus integer feugiat scelerisque varius. Vel orci porta non pulvinar neque laoreet suspendisse interdum. Proin sed libero enim sed faucibus turpis in eu mi. Non diam phasellus vestibulum lorem sed. Fermentum posuere urna nec tincidunt praesent. Diam ut venenatis tellus in metus vulputate eu scelerisque felis. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Velit euismod in pellentesque massa placerat duis. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi. Integer enim neque volutpat ac tincidunt vitae semper.",
	},
	{
		id: "task_api_2",
		status: "ongoing",
		description:
			"Ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Ac orci phasellus egestas tellus rutrum. Pulvinar mattis nunc sed blandit libero volutpat sed. Iaculis eu non diam phasellus vestibulum lorem sed. Eget sit amet tellus cras adipiscing enim. Morbi non arcu risus quis varius quam. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Arcu felis bibendum ut tristique et egestas. Elit pellentesque habitant morbi tristique senectus et netus et. Ut ornare lectus sit amet est. Orci phasellus egestas tellus rutrum. Ipsum dolor sit amet consectetur adipiscing elit ut. Aenean pharetra magna ac placerat vestibulum. Sit amet tellus cras adipiscing enim. Feugiat in fermentum posuere urna nec tincidunt. At urna condimentum mattis pellentesque id nibh. Cursus eget nunc scelerisque viverra mauris in. Leo a diam sollicitudin tempor id eu nisl nunc mi. Enim tortor at auctor urna nunc id cursus metus aliquam.",
	},
	{
		id: "task_api_3",
		status: "ongoing",
		description:
			"Eleifend mi in nulla posuere sollicitudin aliquam ultrices. Vel orci porta non pulvinar. Tellus elementum sagittis vitae et leo duis ut. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Nisi est sit amet facilisis magna. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Consequat nisl vel pretium lectus quam id leo in. Sit amet cursus sit amet dictum sit amet. Et magnis dis parturient montes nascetur ridiculus mus. Erat velit scelerisque in dictum non consectetur a erat nam. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Magna etiam tempor orci eu lobortis elementum nibh. Tincidunt lobortis feugiat vivamus at. Quis lectus nulla at volutpat diam ut venenatis tellus in. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Orci porta non pulvinar neque laoreet. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. In tellus integer feugiat scelerisque. Sed pulvinar proin gravida hendrerit lectus a.",
	},
	{
		id: "task_api_4",
		status: "ongoing",
		description:
			"Augue lacus viverra vitae congue eu consequat ac felis donec. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Id interdum velit laoreet id donec. Morbi quis commodo odio aenean. Sollicitudin tempor id eu nisl nunc mi ipsum. Blandit massa enim nec dui nunc mattis enim. Posuere ac ut consequat semper viverra nam libero justo laoreet. Aliquet eget sit amet tellus. Lobortis mattis aliquam faucibus purus in massa tempor. Sit amet facilisis magna etiam tempor. Dignissim suspendisse in est ante in nibh. Erat pellentesque adipiscing commodo elit at imperdiet dui. Amet volutpat consequat mauris nunc congue. Sed risus ultricies tristique nulla aliquet.",
	},
	{
		id: "task_api_5",
		status: "ongoing",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem donec massa sapien faucibus et. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Nibh nisl condimentum id venenatis. Ac tincidunt vitae semper quis lectus nulla at volutpat diam. Mauris ultrices eros in cursus turpis massa. Nam at lectus urna duis convallis convallis. Nascetur ridiculus mus mauris vitae ultricies leo integer. Arcu cursus vitae congue mauris rhoncus aenean vel. Massa enim nec dui nunc mattis enim ut tellus. Nam libero justo laoreet sit amet cursus sit amet dictum. Sed felis eget velit aliquet. Non nisi est sit amet facilisis magna etiam tempor orci. Nunc pulvinar sapien et ligula ullamcorper. Quam elementum pulvinar etiam non. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nibh tellus molestie nunc non blandit massa enim nec dui. Pulvinar mattis nunc sed blandit. Tristique et egestas quis ipsum. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus.",
	},
];

//READ Request Handlers
app.get("/", (req, res) => {
	res.send("Welcome to Edurekas REST API with Node.js Tutorial!!");
});

app.get("/api/todos", (req, res) => {
	setTimeout(() => {
		res.send(todos);
	}, generateRandomDelay());
});

app.get("/api/todos/:id", (req, res) => {
	const task = todos.find((c) => c.id === parseInt(req.params.id));

	if (!task) res.status(404).send({ success: false, message: `Task ${req.params.id} not found!` });
	res.send(task);
});

//CREATE Request Handler
app.post("/api/todos", (req, res) => {
	const task = {
		id: "task_api_" + (todos.length + 1),
		description: req.body.description,
		status: "ongoing",
	};

	todos.unshift(task);
	setTimeout(() => {
		res.send({ success: true, ...task });
	}, generateRandomDelay());
});

//UPDATE Request Handler
app.put("/api/todos/:id/completed", (req, res) => {
	const task = todos.find((c) => c.id === req.params.id);
	if (!task) {
		res.status(404).send({ success: false, message: `Task ${req.params.id} not found!` });
		return;
	}

	task.status = "completed";
	setTimeout(() => {
		res.send({ success: true, ...task });
	}, generateRandomDelay());
});

//DELETE Request Handler
app.delete("/api/todos/:id", (req, res) => {
	const task = todos.find((c) => c.id === req.params.id);
	if (!task) {
		res.status(404).send({ success: false, message: `Task ${req.params.id} not found!` });
		return;
	}

	const index = todos.indexOf(task);
	todos.splice(index, 1);

	setTimeout(() => {
		res.send({ success: true });
	}, generateRandomDelay());
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}..`));
