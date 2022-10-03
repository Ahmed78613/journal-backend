const express = require("express");
const router = express.Router();
const {
	getAllJournals,
	postNewJournal,
	addNewComment,
	getJournal,
	emojiCounter
} = require("../controllers/journal");

router.get("/", getAllJournals);
router.post("/", postNewJournal);
router.post("/:id/new-comment", addNewComment);
router.get("/:id", getJournal );
router.post("/:id/emoji/:emoji", emojiCounter);





module.exports = router;
