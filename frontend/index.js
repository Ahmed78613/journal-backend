const form = document.getElementById("my-form");

form.addEventListener("submit", fetchData);

async function fetchData(e) {
	e.preventDefault();
	try {
		const res = await fetch("http://localhost:3000/journal");
		const data = await res.json();
		console.log(data);
	} catch (error) {}
}
