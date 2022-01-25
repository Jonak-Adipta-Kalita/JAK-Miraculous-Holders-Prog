const dex = document.getElementById('dex');
const fetchHolders = async () => {
    const url = "/holders.json";
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	const holders = data.holder.map((result, index) => ({
		...result,
		id: index + 1,
		image: `./images/${result.image}`
	}));
	displayHolders(holders);
};

const displayHolders = (holder) => {
    const holdersHTMLString = holder
        .map((holdere) => (`
			<li class="card" onclick="selectHolder(${holdere.id})">
				<img class="card-image" src="${holdere.image}"/>
				<h2 class="card-title">${holdere.id}. ${holdere.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = holdersHTMLString;
};

const selectHolder = async (id) => {
	const url = `\holders.json`;
	const res = await fetch(url);
	const holdere = await res.json();
	displayPopup(holdere, id);
};

const displayPopup = (holdere, id) => {
	const image = `./images/${holdere.holder[id - 1].image}`;
	let kwami;
	
	if (!holdere.holder[id - 1].kwami[1]) {
		kwami = Array(holdere.holder[id - 1].kwami).map((kwamie) => kwamie[0]);
	} else {
		kwami = Array(holdere.holder[id - 1].kwami).map((kwamie) => kwamie.join(", "));
	}

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${holdere.holder[id - 1].id + 1}. ${holdere.holder[id - 1].name}
				</h2>
				<p><small>Real Name: </small>${holdere.holder[id - 1].real_name}</p>
				<p><small>Kwami: </small>${kwami}</p>
				<p><small>Magical Words: </small>${holdere.holder[id - 1].magical_words}</p>
				<p><small>Main Power: </small>${holdere.holder[id - 1].main_power}</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchHolders();
