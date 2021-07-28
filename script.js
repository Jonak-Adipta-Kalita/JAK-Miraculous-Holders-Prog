const dex = document.getElementById('dex');
const fetchHeros = async () => {
    const url = "/heros.json";
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	const heros = data.hero.map((result, index) => ({
		...result,
		id: index + 1,
		image: `./images/${result.image}`
	}));
	displayHeros(heros);
};

const displayHeros = (hero) => {
    const herosHTMLString = hero
        .map((hereo) => (`
			<li class="card" onclick="selectHero(${hereo.id})">
				<img class="card-image" src="${hereo.image}"/>
				<h2 class="card-title">${hereo.id}. ${hereo.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = herosHTMLString;
};

const selectHero = async (id) => {
	const url = `\heros.json`;
	const res = await fetch(url);
	const hereo = await res.json();
	displayPopup(hereo, id);
};

const displayPopup = (hereo, id) => {
	const image = `./images/${hereo.hero[id - 1].image}`;
	let goal;
	let kwami;
	let hobbies;
	
	if (!hereo.hero[id - 1].goals[1]) {
		goal = Array(hereo.hero[id - 1].goals).map((gol) => gol[0]);
	} else {
		goal = Array(hereo.hero[id - 1].goals).map((gol) => gol.join(", "));
	}
	
	if (!hereo.hero[id - 1].kwami[1]) {
		kwami = Array(hereo.hero[id - 1].kwami).map((kwamie) => kwamie[0]);
	} else {
		kwami = Array(hereo.hero[id - 1].kwami).map((kwamie) => kwamie.join(", "));
	}
	
	if (!hereo.hero[id - 1].hobbies[1]) {
		hobbies = Array(hereo.hero[id - 1].hobbies).map((hobby) => hobby[0]);
	} else {
		hobbies = Array(hereo.hero[id - 1].hobbies).map((hobby) => hobby.join(", "));
	}

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${hereo.hero[id - 1].id + 1}. ${hereo.hero[id - 1].name}
				</h2>
				<p><small>Real Name: </small>${hereo.hero[id - 1].real_name}</p>
				<p><small>Kwami: </small>${kwami}</p>
				<p><small>Magcal Words: </small>${hereo.hero[id - 1].magical_words}</p>
				<p><small>Main Power: </small>${hereo.hero[id - 1].main_power}</p>
				<p><small>Goal(s): </small>${goal}</p>
				<p><small>Hobby(s): </small>${hobbies}</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchHeros();
