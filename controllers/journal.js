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

				return {
					...journal, 
					comments: [ body, ...journal.comments]
				}
			}
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
		const specifcJournal  = journal.filter((journal) => id === journal.id)	
			if(specifcJournal.length>0){
				res.send(specifcJournal[0]);
			}else{
				res.send("error - id does not exist")
			}
	} catch (error) {
		console.log(error);
	}
};




// const emojiCounter = async (req, res) => {
// 	const { id , emoji} = req.params; 

// 	try {
// 		const jsonString = await fs.readFileSync("./data.json", "utf-8");
// 		const journal = await JSON.parse(jsonString);
// 		// console.log(emoji)


// 		if(emoji == "one"){

// 			const emojis = journal.map((ele) => {
// 				if (id === ele.id) {
// 					// console.log(ele.emoji[0])
// 					return {
// 						...ele,
// 						emoji: [
// 							...ele.emoji, 
// 							{
// 								emojiUsed : ele.emoji[0].emojiUsed ? false : true,
// 							 	emojiOne: ele.emoji[0].emojiUsed ? ele.emoji[0].emojiOne - 1 : ele.emoji[0].emojiOne + 1
// 							}
// 						]	
// 					}
// 					// return {
// 					// 	...journal, 
// 					// 	comments: [ body, ...journal.comments]
// 					// }
// 				}
// 			});
// 			console.log(emojis[0].emoji)

// 		}else if(emoji == "two"){

// 		}else if(emoji == "three"){

// 		}else{
// 			res.send("nothing")
// 		}


// 	} catch (error) {
// 		console.log(error);
// 	}
// };



const emojiCounter = async (req, res) => {
	const { id , emoji} = req.params; 

	try {
		const jsonString = await fs.readFileSync("./data.json", "utf-8");
		const journal = await JSON.parse(jsonString);
		// console.log(emoji)
			const updatedEmoji = journal.map((ele) => {
				if (id === ele.id) {
					if(emoji === "one"){
						ele.emoji[0].emojiUsed ? ele.emoji[0].emojiUsed = false : ele.emoji[0].emojiUsed = true;
						ele.emoji[0].emojiUsed ? ele.emoji[0].emojiOne +=1 : ele.emoji[0].emojiOne -=1 ;	
						return ele; 
					}else if( emoji === "two"){
						ele.emoji[1].emojiUsed ? ele.emoji[1].emojiUsed = false  : ele.emoji[1].emojiUsed = true;
						ele.emoji[1].emojiUsed ? ele.emoji[1].emojiTwo +=1 : ele.emoji[1].emojiTwo -=1 ;	
						return ele; 
					}else if(emoji === "three"){
						ele.emoji[2].emojiUsed ? ele.emoji[2].emojiUsed = false  : ele.emoji[2].emojiUsed = true;
						ele.emoji[2].emojiUsed ? ele.emoji[2].emojiThree +=1 : ele.emoji[2].emojiThree -=1 ;	
						return ele; 
					}else return ele; 		
				}
			});

			// update data.json file with new data
			fs.writeFileSync("./data.json", JSON.stringify(updatedEmoji, null, 2));
			res.send("Emoji count updated");

	} catch (error) {
		console.log(error);
	}
};















module.exports = { getAllJournals, postNewJournal, addNewComment, getJournal, emojiCounter};
