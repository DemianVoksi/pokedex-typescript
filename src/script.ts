// DAMAGE RELATIONS https://pokeapi.co/api/v2/type

// IMAGE pokemon/ data.sprites.other['official-artwork'].front_default
// NAME pokemon/ data.name
// BASE EXP pokemon/ data.base_experience
// ABILITY NAME pokemon/ data.abilities[0].ability.name trebat će for loop kao za types
// ABILITY HIDDEN pokemon/ data.abilities[0].is_hidden
// HEIGHT pokemon/ data.height (in decimetres)
// WEIGHT pokemon/ data.weight (in hectograms/100g)
// TYPE pokemon/ data.types[] for loop
// HP pokemon/ data.stats[0].base_stat do 255
// ATTACK pokemon/ data.stats[1].base_stat do 255
// DEFENSE pokemon/ data.stats[2].base_stat do 255
// SPECIAL ATTACK pokemon/ data.stats[3].base_stat do 255
// SPECIAL DEFENSE pokemon/ data.stats[4].base_stat do 255
// SPEED pokemon/ data.stats[5].base_stat do 255

// GENDER pokemon-species/ data.gender_rate (in eights 1-8 chance of it being female, -1 == genderless)
// DESCRIPTION pokemon-species/ data.flavor_text_entries[0]
// SPECIES (pikachu: mouse pokemon) pokemon-species/ data.genera[7]
// NUMBER pokemon-species/ data.pokedex_numbers[0].entry_number
// CAPTURE RATE pokemon-species/ data.capture_rate do 255

// pokemon logo https://commons.wikimedia.org/wiki/File:International_Pok%C3%A9mon_logo.svg

let types: string[] = [];

// console.log(types);

// const getPikachu = async (pokemon: string): Promise<any> => {
// 	// prvo varijable

// 	const image: HTMLImageElement = document.createElement('img');
// 	image.style.height = '200px';
// 	image.style.width = '200px';
// 	// onda fetch
// 	const pikachu: Response = await fetch(
// 		`https://pokeapi.co/api/v2/pokemon/${pokemon}`
// 	);
// 	const pikachuJsoned: Promise<any> = pikachu.json();
// 	pikachuJsoned.then(
// 		(data) => (image.src = data.sprites.other['official-artwork'].front_default)
// 	);

// 	// pa appendanje
// 	document.querySelector('.image')?.append(image);
// 	// return pikachuJsoned;
// };

const getPokemon = async (pokemon: string): Promise<any> => {
	// get elements
	// const nationalNumberValue: HTMLElement = document.getElementById(
	// 	'national-number-value'
	// )!; //
	const typeValue: HTMLElement = document.getElementById('type-value')!;
	// const speciesValue: HTMLElement = document.getElementById('species-value')!; //
	// const heightValue: HTMLElement = document.getElementById('height-value')!;
	// const weightValue: HTMLElement = document.getElementById('weight-value')!;
	const genderValue: HTMLElement = document.getElementById('gender-value')!; //
	// const baseExperienceValue: HTMLElement = document.getElementById(
	// 	'base-experience-value'
	// )!;
	// const captureRateValue: HTMLElement =
	// 	document.getElementById('capture-rate-value')!; //
	// const nameValue: HTMLElement = document.getElementById('name-value')!;
	const descriptionValue: HTMLElement =
		document.getElementById('description-value')!; //
	// const hpValue: HTMLElement = document.getElementById('hp-value')!;
	// const attackValue: HTMLElement = document.getElementById('attack-value')!;
	// const defenseValue: HTMLElement = document.getElementById('defense-value')!;
	// const specialAttackValue: HTMLElement = document.getElementById(
	// 	'special-attack-value'
	// )!;
	// const specialDefenseValue: HTMLElement = document.getElementById(
	// 	'special-defense-value'
	// )!;
	// const speedValue: HTMLElement = document.getElementById('speed-value')!;

	// fetch
	const response: Response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon}`
	);
	const resJsoned: Promise<any> = response.json();
	resJsoned.then((data) => {
		getPokemonSpecies(data.id);
		console.log(data);
		document.getElementById('name-value')!.innerHTML = capitalizeName(
			data.name
		);
		document.getElementById('hp-value')!.innerHTML = data.stats[0].base_stat;
		document.getElementById('attack-value')!.innerHTML =
			data.stats[1].base_stat;
		document.getElementById('defense-value')!.innerHTML =
			data.stats[2].base_stat;
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
	});
};

const getPokemonSpecies = async (id: number): Promise<any> => {
	const response: Response = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${id}`
	);
	const resJsoned: Promise<any> = response.json();
	resJsoned.then((data) => {
		console.log(data.flavor_text_entries[0]);
		document.getElementById('species-value')!.innerHTML = data.genera[7].genus;
		document.getElementById('national-number-value')!.innerHTML =
			data.pokedex_numbers[0].entry_number;
		document.getElementById('capture-rate-value')!.innerHTML =
			capturePercentage(data.capture_rate);
		document.getElementById('description-value')!.innerText = breakFlavorText(
			data.flavor_text_entries[0].flavor_text
		);
	});
};

getPokemon('pikachu');

const getTypes = async (pokemon: string): Promise<void> => {
	let typesDiv: Element = document.querySelector('.types')!;
	let typeParagraph: Element;
	const pikachu: Response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon}`
	);
	const pikachuJsoned: Promise<any> = pikachu.json();
	pikachuJsoned.then((data) => {
		console.log(data.types.length);
		for (let i = 0; i < data.types.length; i++) {
			typeParagraph = document.createElement('p')!;
			typeParagraph.innerHTML = data.types[i].type.name;
			typeParagraph.className = 'typeParagraph';
			typesDiv.appendChild(typeParagraph);
		}
	});
};

// getTypes('tyranitar');

const statBar = (amount: number): void => {
	let bar: Element = document.querySelector('.bar')!;
	let barDiv: HTMLDivElement;

	for (let i = 0; i < amount; i++) {
		barDiv = document.createElement('div');
		barDiv.classList.add('barDiv');
		barDiv.style.height = '20px';
		barDiv.style.width = '1px';
		barDiv.style.backgroundColor = 'red';
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
