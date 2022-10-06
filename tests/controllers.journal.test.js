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

describe("API server", () => {
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

	// getAllJournals Function
	it("responds to get /journal with a status of 200", () => {
		request(api).get("/journal").expect(200);
	});
});

// const getAllJournals = async (req, res) => {
// 	try {
// 		const jsonString = await fs.readFileSync("./data.json", "utf-8");
// 		const journal = await JSON.parse(jsonString);
// 		res.send(journal);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
