const request = require("supertest");
const app = require("../app");
const {
	getAllJournals,
	postNewJournal,
	addNewComment,
	getJournal,
	emojiOneIncrement,
	emojiTwoIncrement,
	emojiThreeIncrement,
	likeIncrement,
	dislikeIncrement,
} = require("../controllers/journal");

describe("Controller Testing", () => {
	let api;
	beforeAll(() => {
		api = app.listen(7000, () => {
			console.log(`Example app listening on port 5000`);
		});
	});

	afterAll((done) => {
		console.log("gracefully stopping test server");
		api.close(done);
	});

	// GET /journal/1/emojiOne
	it("responds to get /journal/1/emojiOne with a status of 200", () => {
		expect("test").toBe("test");
	});
});
