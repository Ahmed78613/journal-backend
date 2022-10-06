const request = require("supertest");
const app = require("../app");

describe("API server", () => {
	let api;
	beforeAll(() => {
		api = app.listen(6000, () => {
			console.log(`Example app listening on port 5000`);
		});
	});

	afterAll((done) => {
		console.log("gracefully stopping test server");
		api.close(done);
	});

	// GET /journal
	it("responds to get /journal with a status of 200", () => {
		request(api).get("/journal").expect(200);
	});
	// GET /journal/:id
	it("responds to get /:id with a status of 200", () => {
		request(api).get("/journal/1").expect(200);
	});
	// GET /journal/1/emojiOne
	it("responds to get /journal/1/emojiOne with a status of 200", () => {
		request(api).get("/journal/1/emojiOne").expect(200);
	});
	// GET /journal/1/emojiTwo
	it("responds to get /journal/1/emojiTwo with a status of 200", () => {
		request(api).get("/journal/1/emojiTwo").expect(200);
	});
	// GET /journal/1/emojiThree
	it("responds to get /journal/1/emojiThree with a status of 200", () => {
		request(api).get("/journal/1/emojiThree").expect(200);
	});
	// GET /journal/:id/like
	it("responds to get /journal/1/emojiThree with a status of 200", () => {
		request(api).get("/journal/e2ryt9dzkh/like").expect(200);
	});
	// GET /journal/:id/dislike
	it("responds to get /journal/1/emojiThree with a status of 200", () => {
		request(api).get("/journal/e2ryt9dzkh/dislike").expect(200);
	});
	// POST /journal/
	it("responds to post /journal/ with a status of 200", () => {
		request(api)
			.post("journal/")
			.send({
				id: 1,
				title: "1st  Post",
				content: "Test",
				username: "hello1243",
				icon: "https://xsgames.co/randomusers/assets/avatars/pixel/12.jpg",
				emojiOne: 124,
				emojiTwo: 69,
				emojiThree: 62,
				gif: "",
				date: "02/10/90",
				time: "12:24",
				comments: [
					{
						commentId: "e2ryt9dzkh",
						commentUsername: "magnificent-panda343",
						commentIcon:
							"https://xsgames.co/randomusers/assets/avatars/pixel/42.jpg",
						commentBody: "New comment",
						commentDate: "34/12/20",
						commentTime: "12:32",
						like: 45,
						dislike: 38,
					},
					{
						commentId: "vVG5aldLlB",
						commentUsername: "puzzling-fox416",
						commentIcon:
							"https://xsgames.co/randomusers/assets/avatars/pixel/41.jpg",
						commentBody: "1st comment",
						commentDate: "03/05/20",
						commentTime: "12:24",
						like: 8,
						dislike: 7,
					},
				],
			})
			.expect(200);
	});
	// POST /:id/new-comment
	it("responds to post /:id/new-comment with a status of 200", () => {
		request(api)
			.post("journal/")
			.send({
				commentId: "e2ryt9dzkh",
				commentUsername: "magnificent-panda343",
				commentIcon:
					"https://xsgames.co/randomusers/assets/avatars/pixel/42.jpg",
				commentBody: "New comment",
				commentDate: "34/12/20",
				commentTime: "12:32",
				like: 45,
				dislike: 38,
			})
			.expect(200);
	});
});
