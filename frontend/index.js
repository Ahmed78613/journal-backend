const form = document.getElementById("my-form");

form.addEventListener("submit", postNewJournal);

async function postNewJournal(e) {
	// Prevent Refresh
	e.preventDefault();
	// Setting Id
	const resOne = await fetch("http://localhost:3000/journal");
	const dataOne = await resOne.json();
	// Date & Time
	const date = Date.now();
	const today = new Date(date);
	const todaysDate = today.toLocaleDateString();
	const time = new Date().toLocaleTimeString();
	// New Journal
	const newEntry = {
		id: dataOne.length + 1,
		title: e.target.title.value,
		content: e.target.body.value,
		username: "",
		icon: "",
		emoji: [
			{
				emojiUsed: false,
				emojiOne: 0,
			},
			{
				emojiUsed: false,
				emojiTwo: 0,
			},
			{
				emojiUsed: false,
				emojiThree: 0,
			},
		],
		gif: [],
		date: todaysDate,
		time: time,
		comments: [{}],
	};

	sendToBackend(newEntry);
}

async function sendToBackend(newEntry) {
	try {
		fetch("http://localhost:3000/journal/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newEntry),
		});
	} catch (error) {}
}
