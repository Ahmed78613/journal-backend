const form = document.getElementById("my-form");
const journalsContainer = document.getElementById("journals__container");

form.addEventListener("submit", postNewJournal);

async function postNewJournal(e) {
	// Prevent Refresh
	e.preventDefault();
	// Setting Id
	const resOne = await fetch(
		"https://futureproof-journal.herokuapp.com/journal"
	);
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
		fetch("https://futureproof-journal.herokuapp.com/journal/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newEntry),
		});
	} catch (error) {}
}

async function appendAllJournals() {
	try {
		const res = await fetch(
			"https://futureproof-journal.herokuapp.com/journal"
		);
		const data = await res.json();
		// Iterate over every journal entry
		data.map((entry) => {
			// create
			const div = document.createElement("div");
			const id = document.createElement("p");
			const title = document.createElement("h3");
			const content = document.createElement("p");
			const icon = document.createElement("img");
			const username = document.createElement("p");
			const date = document.createElement("p");
			const time = document.createElement("p");
			const form = document.createElement("form");
			const commentInput = document.createElement("input");
			const viewBtn = document.createElement("button");
			const commentBtn = document.createElement("button");
			// append
			div.appendChild(id);
			div.appendChild(title);
			div.appendChild(content);
			div.appendChild(icon);
			div.appendChild(username);
			div.appendChild(date);
			div.appendChild(time);
			div.appendChild(form);
			div.appendChild(commentInput);
			div.appendChild(viewBtn);
			div.appendChild(commentBtn);
			// append to form
			form.append(commentInput);
			form.append(viewBtn);
			form.append(commentBtn);
			// assign content
			id.textContent = entry.id;
			title.textContent = entry.title;
			content.textContent = entry.content;
			icon.src = entry.icon;
			username.textContent = entry.username;
			date.textContent = entry.date;
			time.textContent = entry.time;
			form.setAttribute("id", "my-form");
			commentInput.setAttribute("name", "comment");
			viewBtn.textContent = "View";
			commentBtn.textContent = "Comment";
			// add event listeners
			form.addEventListener("submit", (e) => {
				addComment(e, entry.id);
			});
			// append Div to existing container
			journalsContainer.appendChild(div);
		});
	} catch (error) {}
}

appendAllJournals();

async function addComment(e, id) {
	e.preventDefault();
	// extract comment
	const commentData = e.target.comment.value;
	// Date & Time
	const date = Date.now();
	const today = new Date(date);
	const todaysDate = today.toLocaleDateString();
	const time = new Date().toLocaleTimeString();

	const comment = {
		commentUsername: "",
		commentIcon: "",
		commentBody: commentData,
		commentDate: todaysDate,
		commentTime: time,
	};
	// Post req function
	storeCommentInBackend(comment, id);
}

async function storeCommentInBackend(comment, id) {
	try {
		fetch(
			`https://futureproof-journal.herokuapp.com/journal/${id}/new-comment`,
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(comment),
			}
		);
	} catch (error) {
		console.log(error);
	}
}
