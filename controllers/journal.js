const data = require("../data");
const fs = require("fs");
const { generateUsername } = require("friendly-username-generator");
const { v4 } = require("uuid");

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
		// put
		journal.push(body);
		// write new
		fs.writeFileSync("./data.json", JSON.stringify(journal, null, 2));
		res.send("Added");
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
		// create random id
		body.commentId = v4();
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

const emojiCounter = async (req, res) => {
	const { id, emoji } = req.params;

	try {
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);
		const updatedEmoji = journal.map((ele) => {
			if (id === ele.id) {
				if (emoji === "one") {
					ele.emoji[0].emojiUsed
						? (ele.emoji[0].emojiUsed = false)
						: (ele.emoji[0].emojiUsed = true);
					ele.emoji[0].emojiUsed
						? (ele.emoji[0].emojiOne += 1)
						: (ele.emoji[0].emojiOne -= 1);
					return ele;
				} else if (emoji === "two") {
					ele.emoji[1].emojiUsed
						? (ele.emoji[1].emojiUsed = false)
						: (ele.emoji[1].emojiUsed = true);
					ele.emoji[1].emojiUsed
						? (ele.emoji[1].emojiTwo += 1)
						: (ele.emoji[1].emojiTwo -= 1);
					return ele;
				} else if (emoji === "three") {
					ele.emoji[2].emojiUsed
						? (ele.emoji[2].emojiUsed = false)
						: (ele.emoji[2].emojiUsed = true);
					ele.emoji[2].emojiUsed
						? (ele.emoji[2].emojiThree += 1)
						: (ele.emoji[2].emojiThree -= 1);
					return ele;
				} else return ele;
			}
		});

		// update data.json file with new data
		fs.writeFileSync("./data.json", JSON.stringify(updatedEmoji, null, 2));
		res.send("Emoji count updated");
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllJournals,
	postNewJournal,
	addNewComment,
	getJournal,
	emojiCounter,
};
