const express = require("express");
const router = express.Router();
const {
	getAllJournals,
	postNewJournal,
	addNewComment,
} = require("../controllers/journal");

router.get("/", getAllJournals);
router.post("/", postNewJournal);
router.post("/new-comment/:id", addNewComment);

module.exports = router;
