const app = require("../app");
const request = require("supertest");

describe("API server", () => {
	let api;
	beforeAll(() => {
		api = app.listen(8000, () => {
			console.log(`Example app listening on port 5000`);
		});
	});

	afterAll((done) => {
		console.log("gracefully stopping test server");
		api.close(done);
	});

	it("responds to get / with a status of 200", (done) => {
		request(api).get("/").expect(200, done);
	});

	it("retrieves all journals", (done) => {
		request(api).get("/journal").expect(200, done);
	});

	it("retrieves a specific pokemon", (done) => {
		request(api).get("/journal/1").expect(200, done);

		// check to see data in the future / Cant compare 2 objects
	});
	let testJournal = {
		title: "Testing POST",
		content: "Test",
		username: "siddav83",
		icon: "https://xsgames.co/randomusers/assets/avatars/pixel/16.jpg",
		emojiOne: 0,
		emojiTwo: 0,
		emojiThree: 0,
		gif: "",
		date: "23/12/2022",
		time: "12:24",
		comments: [
			{
				commentId: "helloTest",
				commentUsername: "David Siddle3",
				commentIcon:
					"https://xsgames.co/randomusers/assets/avatars/pixel/42.jpg",
				commentBody: "New comment Test",
				commentDate: "34/12/20",
				commentTime: "12:32",
				like: 0,
				dislike: 0,
			},
		],
	};

	// it('reponds to a post request with status code 201', async (done) => {
	//     const data = await request(api).get('/journal/');
	//    const length =  data.body.length

	//    const datatwo = await request(api).post('/journal').send(JSON.stringify(testJournal))

	//    expect(datatwo.body.length).toBe(length + 1);

	// //    expect(data.body.length).toBe(length);
	//     // const line = data.body.length
	//     // console.log(line)

	//         // .post('/journal')
	//         // .send(JSON.stringify(testJournal))
	//         // .expect(201)
	//         // .expect((JSON.stringify(testJournal)), done)
	// }, 20000)
	// it('responds to delete /journal/:id with status 204', async () => {
	//     await request(api).delete('/journal/4').expect(204);
	//     const updatedPokes = await request(api).get('/journal');
	//     expect(updatedPokes.body.length).toBe(3);
	// })
});
