const express = require("express");

const app = express();
const router = express.Router();
const postBank = require("../postBank");
const posts = postBank.list();

router.get("/", (req, res) => {
	const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>

      ${posts
				.map(
					(post) => `
        <div class='news-item'>
          <p><a href="/api/posts/${post.id}">${post.title}</a>
            <span class="news-position">${post.id}. ▲</span>
            ${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
				)
				.join("")}
    </div>
  </body>
</html>`;

	res.send(html);
});

router.get("/:id", (req, res) => {
	try {
		const id = Number(req.params.id);
		const post = posts.find((post) => post.id === id);
		const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      <div class='news-item'>
      <p id="home"><a href="/api/posts/">Home</a>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            ${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
          <small class="news-details">
          ${post.content} details</small>
        </div>
			
    </div>
  </body>
</html>`;
		res.send(html);
		if (!post) {
			const error = new Error("No post found with that id 👎");
			next({
				name: "id error",
				message: error.message,
				stack: error.stack,
			});
		}
	} catch (error) {}
});

module.exports = router;
