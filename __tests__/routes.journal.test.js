const request = require("supertest");
const app = require("../app");

describe("API server", () => {
	let api;

	beforeAll(() => {
		api = app.listen(9000, () => {
			console.log(`Example app listening on port 5000`);
		});
	});

	afterAll((done) => {
		console.log("gracefully stopping test server");
		api.close(done);
	});

	// GET /journal
	it("responds to get /journal with a status of 200", async () => {
		const res = await request(api).get("/journal");
		expect(res.statusCode).toBe(200);
	});
	// GET /journal/:id
	it("responds to get /:id with a status of 200", async () => {
		const res = await request(api).get("/journal/1");
		expect(res.statusCode).toBe(200);
	});
	// GET /journal/1/emojiOne
	it("responds to get /journal/1/emojiOne with a status of 200", async () => {
		const res = await request(api).get("/journal/1/emojiOne");
		expect(res.statusCode).toBe(200);
	});
	// GET /journal/1/emojiTwo
	it("responds to get /journal/1/emojiTwo with a status of 200", async (done) => {
		const res = await request(api).get("/journal/1/emojiTwo");
		expect(res.statusCode).toBe(200);
	});
	// GET /journal/1/emojiThree
	it("responds to get /journal/1/emojiThree with a status of 200", async (done) => {
		const res = await request(api).get("/journal/1/emojiThree");
		expect(res.statusCode).toBe(200);
	});
	// GET /journal/:id/like
	it("responds to get /journal/:commentId/like with a status of 200", async () => {
		const res = await request(api).get("/journal/e2ryt9dzkh/like");
		expect(res.statusCode).toBe(200);
	});
	// GET /journal/:id/dislike
	it("responds to get /journal/:commentId/dislike with a status of 200", async (done) => {
		const res = await request(api).get("/journal/e2ryt9dzkh/dislike");
		expect(res.statusCode).toBe(200);
	});
	// POST /journal/
	it("responds to post /journal/ with a status of 200", async () => {
		const res = await request(api).post("journal/").send({
			id: 0,
			title: "1st  Post",
			content: "Test",
			username: "",
			icon: "",
			emojiOne: 0,
			emojiTwo: 0,
			emojiThree: 0,
			gif: "",
			date: "02/10/90",
			time: "12:24",
			comments: [],
		});

		const data = res.status;
		expect(data.statusCode).toBe(201);
	});

	// POST /:id/new-comment
	it("responds to post /:id/new-comment with a status of 200", async () => {
		const res = await request(api).post("journal/").send({
			commentId: "",
			commentUsername: "",
			commentIcon: "",
			commentBody: "New comment",
			commentDate: "34/12/20",
			commentTime: "12:32",
			like: 0,
			dislike: 0,
		});

		const data = res.status;
		expect(data.statusCode).toBe(201);
	});
});
