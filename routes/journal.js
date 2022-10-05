const express = require("express");
const router = express.Router();
const {
	getAllJournals,
	postNewJournal,
	addNewComment,
	getJournal,
	emojiCounter,
	incrementDope
} = require("../controllers/journal");

router.get("/", getAllJournals);
router.get("/:id/dope", incrementDope);
router.post("/", postNewJournal);
router.post("/:id/new-comment", addNewComment);
router.get("/:id", getJournal);
router.post("/:id/emoji/:emoji", emojiCounter);

module.exports = router;
