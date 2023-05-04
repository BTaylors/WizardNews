const express = require("express");
const PORT = 1337;
const morgan = require("morgan");
const app = express();

// Middleware
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path}`);
	next();
});
app.use(morgan("dev"));
app.use(express.static("public"));

// To be able to accept JSON
app.use(express.json());

// Routes
app.use("/api", require("./routes"));

// Catch All
app.get("*", (req, res, next) => {
	res.status(404).send("Oops, that endpoint doesn't exist!");
});

// Error Handler
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500);
	res.send({
		name: err.name,
		message: err.message,
		// stack: err.stack,
	});
});

app.listen(PORT, () => {
	console.log(`App listening in port ${PORT}`);
});
