const express = require("express");
const router = express.Router();
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

router.route("/").get(getAllJournals).post(postNewJournal);
router.route("/:id/new-comment").post(addNewComment);
router.route("/:id").get(getJournal);
router.route("/:id/emojiOne").get(emojiOneIncrement);
router.route("/:id/emojiTwo").get(emojiTwoIncrement);
router.route("/:id/emojiThree").get(emojiThreeIncrement);
router.route("/:commentId/like").get(likeIncrement);
router.route("/:commentId/dislike").get(dislikeIncrement);

module.exports = router;
