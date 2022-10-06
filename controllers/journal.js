const data = require("../data");
const fs = require("fs");
const { generateUsername } = require("friendly-username-generator");
const shortid = require("shortid");

const getAllJournals = async (req, res) => {
	try {
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);
		res.send(journal);
	} catch (error) {
		console.log(error);
	}
};

const postNewJournal = async (req, res) => {
	const { body } = req;
	try {
		// get
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);
		// create random username
		body.username = generateUsername();
		// create random icon
		const randomNum = Math.floor(Math.random() * 53);
		const avatar = `https://xsgames.co/randomusers/assets/avatars/pixel/${randomNum}.jpg`;
		body.icon = avatar;
		// Set Id
		body.id = journal.length + 1;
		// push new journal entry
		journal.push(body);
		// write new
		fs.writeFileSync("./data.json", JSON.stringify(journal, null, 2));
		console.log(body);
		res.status(201).send(journal);
	} catch (error) {
		console.log(error);
	}
};

const addNewComment = async (req, res) => {
	const { id } = req.params;
	const { body } = req;

	try {
		// get
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);
		// create random username
		body.commentUsername = generateUsername();
		// create random icon
		const randomNum = Math.floor(Math.random() * 53);
		const avatar = `https://xsgames.co/randomusers/assets/avatars/pixel/${randomNum}.jpg`;
		body.commentIcon = avatar;
		// Set random id
		body.commentId = shortid.generate();
		// find & update comments Array
		const newJournals = journal.map((journal) => {
			if (id == journal.id) {
				return {
					...journal,
					comments: [body, ...journal.comments],
				};
			} else return journal;
		});
		// update data.json file with new data
		fs.writeFileSync("./data.json", JSON.stringify(newJournals, null, 2));
		res.send("Added a new");
	} catch (error) {
		console.log(error);
	}
};

const getJournal = async (req, res) => {
	const { id } = req.params;
	try {
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);

		//filter journal by id
		const specificJournal = journal.filter((journal) => id == journal.id);
		if (specificJournal.length > 0) {
			res.send(specificJournal[0]);
		} else {
			res.send("error - id does not exist");
		}
	} catch (error) {
		console.log(error);
	}
};

// Emoji 1
const emojiOneIncrement = async (req, res) => {
	const { id } = req.params;
	try {
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);
		const updatedJournal = journal.map((entry) => {
			if (id == entry.id) {
				entry.emojiOne += 1;
				return entry;
			} else {
				return entry;
			}
		});
		// update data.json file with new data
		fs.writeFileSync("./data.json", JSON.stringify(updatedJournal, null, 2));
		res.send("Dope count updated");
	} catch (error) {
		console.log(error);
	}
};
// Emoji 2
const emojiTwoIncrement = async (req, res) => {
	const { id } = req.params;
	try {
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);
		const updatedJournal = journal.map((entry) => {
			if (id == entry.id) {
				entry.emojiTwo += 1;
				return entry;
			} else {
				return entry;
			}
		});
		// update data.json file with new data
		fs.writeFileSync("./data.json", JSON.stringify(updatedJournal, null, 2));
		res.send("Dope count updated");
	} catch (error) {
		console.log(error);
	}
};
// Emoji 3
const emojiThreeIncrement = async (req, res) => {
	const { id } = req.params;
	try {
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);
		const updatedJournal = journal.map((entry) => {
			if (id == entry.id) {
				entry.emojiThree += 1;
				return entry;
			} else {
				return entry;
			}
		});
		// update data.json file with new data
		fs.writeFileSync("./data.json", JSON.stringify(updatedJournal, null, 2));
		res.send("Dope count updated");
	} catch (error) {
		console.log(error);
	}
};

// Like
const likeIncrement = async (req, res) => {
	const { commentId } = req.params;
	try {
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);
		const updatedJournal = journal.map((entry) => {
			for (let i = 0; i < entry.comments.length; i++) {
				if (entry.comments[i].commentId == commentId) {
					entry.comments[i].like += 1;
				}
			}
			return entry;
		});
		console.log(updatedJournal);
		// update data.json file with new data
		fs.writeFileSync("./data.json", JSON.stringify(updatedJournal, null, 2));
		res.send(updatedJournal);
	} catch (error) {
		console.log(error);
	}
};

// Dislike
const dislikeIncrement = async (req, res) => {
	const { commentId } = req.params;
	try {
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);
		const updatedJournal = journal.map((entry) => {
			for (let i = 0; i < entry.comments.length; i++) {
				if (entry.comments[i].commentId == commentId) {
					entry.comments[i].dislike += 1;
				}
			}
			return entry;
		});
		console.log(updatedJournal);
		// update data.json file with new data
		fs.writeFileSync("./data.json", JSON.stringify(updatedJournal, null, 2));
		res.send(updatedJournal);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllJournals,
	postNewJournal,
	addNewComment,
	getJournal,
	emojiOneIncrement,
	emojiTwoIncrement,
	emojiThreeIncrement,
	likeIncrement,
	dislikeIncrement,
};
