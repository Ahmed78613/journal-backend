const data = require("../data");
const fs = require("fs");

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
		// put
		journal.push(body);
		fs.writeFileSync("./data.json", JSON.stringify(journal, null, 2));
		res.send("Added");
	} catch (error) {
		console.log(error);
	}
};

const addNewComment = async (req, res) => {
	const { id } = req.params;
	const { body } = req;
	console.log(body);

	try {
		// get
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);
		// find & update comments Array
		const newJournals = journal.map((journal) => {
			if (id === journal.id) {
				return { ...journal, comments: [...journal.comments, body] };
				// journal.comments.push(body);
			}
		});
		console.log(newJournals.comments);
		// update data.json
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getAllJournals, postNewJournal, addNewComment };
