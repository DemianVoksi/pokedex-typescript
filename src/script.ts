// pokemon logo https://commons.wikimedia.org/wiki/File:International_Pok%C3%A9mon_logo.svg
// element.classList.add

const getPokemon = async (pokemon: string): Promise<any> => {
	// fetch
	const response: Response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon}`
	);
	const data = await response.json();
	// species API
	getPokemonSpecies(data.id);

	// types
	getTypes(data.types);

	// sprite
	let image = document.getElementById('pokemon-sprite') as HTMLImageElement;
	image.src = data.sprites.other['official-artwork'].front_default;

	// other values
	document.getElementById('name-value')!.innerHTML = capitalizeName(data.name);
	document.getElementById('hp-value')!.innerHTML = data.stats[0].base_stat;
	document.getElementById('attack-value')!.innerHTML = data.stats[1].base_stat;
	document.getElementById('defense-value')!.innerHTML = data.stats[2].base_stat;
	document.getElementById('special-attack-value')!.innerHTML =
		data.stats[3].base_stat;
	document.getElementById('special-defense-value')!.innerHTML =
		data.stats[4].base_stat;
	document.getElementById('speed-value')!.innerHTML = data.stats[5].base_stat;
	document.getElementById('height-value')!.innerHTML = metricHeight(
		data.height
	);
	document.getElementById('weight-value')!.innerHTML = metricWeight(
		data.weight
	);
	document.getElementById('base-experience-value')!.innerHTML =
		data.base_experience;

	// stat bars
	statBar(data.stats[0].base_stat, 'hp-bar', '#00ff00');
	statBar(data.stats[1].base_stat, 'attack-bar', '#ffa500');
	statBar(data.stats[2].base_stat, 'defense-bar', '#add8d6');
	statBar(data.stats[3].base_stat, 'special-attack-bar', '#ff0000');
	statBar(data.stats[4].base_stat, 'special-defense-bar', '#00008b');
	statBar(data.stats[5].base_stat, 'speed-bar', '#c0c0c0');
};

const getPokemonSpecies = async (id: number): Promise<any> => {
	// fetch
	const response: Response = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${id}`
	);
	const resJsoned: Promise<any> = response.json();
	resJsoned.then((data) => {
		console.log(data);
		document.getElementById('species-value')!.innerHTML = data.genera[7].genus;
		document.getElementById('national-number-value')!.innerHTML =
			data.pokedex_numbers[0].entry_number;
		document.getElementById('capture-rate-value')!.innerHTML =
			capturePercentage(data.capture_rate);
		document.getElementById('description-value')!.innerText = breakFlavorText(
			data.flavor_text_entries[0].flavor_text
		);
		document.getElementById('gender-value')!.innerHTML = getGenderRate(
			data.gender_rate
		);
	});
};

getPokemon('mewtwo');

const getTypes = async (dataNode: any): Promise<void> => {
	let typesDiv: Element = document.getElementById('type-value')!;
	typesDiv.setAttribute(
		'style',
		'height: 15px; margin-bottom: 10px; display: flex; flex-direction: row;'
	);
	let typeParagraph: Element;
	for (let i = 0; i < dataNode.length; i++) {
		typeParagraph = document.createElement('p')!;
		typeParagraph.innerHTML = dataNode[i].type.name;
		typeParagraph.className = 'typeParagraph';
		typeParagraph.setAttribute('style', 'margin-right: 5px; margin: block;');
		typesDiv.appendChild(typeParagraph);
	}
};

const statBar = (amount: number, elemId: string, color: string): void => {
	let bar: Element = document.getElementById(elemId)!;
	bar.setAttribute(
		'style',
		'display: flex; flex-direction: row; justify-content: center; align-items: center; margin-left: 15px;'
	);
	let barDiv: HTMLDivElement;

	for (let i = 0; i < amount * 1.5; i++) {
		barDiv = document.createElement('div');
		barDiv.classList.add('barDiv');
		barDiv.style.height = '10px';
		barDiv.style.width = '1px';
		barDiv.style.backgroundColor = color;
		bar?.appendChild(barDiv);
	}
};

const metricHeight = (input: number): string => {
	let centimeters: number = input * 10;

	if (centimeters < 100) {
		return `${centimeters} cm`;
	} else {
		let meters = centimeters / 100;
		return `${meters} m`;
	}
};

const metricWeight = (input: number): string => {
	let grams = input * 100;

	if (grams < 1000) {
		return `0.${input} kg`;
	} else {
		let kg = grams / 1000;
		return `${kg} kg`;
	}
};

const getGenderRate = (input: number): string => {
	if (input === -1) {
		return 'Genderless';
	} else {
		let femalePercentage: number = Number(((input / 8) * 100).toFixed(1));
		let malePercentage: number = 100 - femalePercentage;
		let result = `${femalePercentage}% female, ${malePercentage}% male`;
		return result;
	}
};

const capturePercentage = (input: number): string => {
	let result = `${(0.39 * input).toFixed(2)} %`;
	return result;
};

const breakFlavorText = (input: string): string => {
	let result1: string = input.replace('\f', ' ');
	let result2: string = result1.replace('\n', ' ');
	return result2;
};

const capitalizeName = (name: string): string => {
	return name.charAt(0).toUpperCase() + name.slice(1);
};
