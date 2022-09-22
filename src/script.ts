// pokemon logo https://commons.wikimedia.org/wiki/File:International_Pok%C3%A9mon_logo.svg

const fillSingleContainerNonbase = (
	parentName: string,
	elemType: string,
	elemClass: string,
	elemTitleId: string,
	elemValueId: string
): void => {
	const container: HTMLElement = document.getElementById(parentName)!;
	const title: HTMLElement = document.createElement(elemType);
	const value: HTMLElement = document.createElement(elemType);
	title.classList.add(elemClass);
	value.classList.add(elemClass);
	title.id = elemTitleId;
	value.id = elemValueId;
	container.append(title);
	container.append(value);
};

const fillSingleContainerBase = (
	parentName: string,
	elemType: string,
	barType: string,
	elemClass: string,
	elemTitleId: string,
	elemValueId: string,
	barClass: string,
	barId: string
): void => {
	const container: HTMLElement = document.getElementById(parentName)!;
	const title: HTMLElement = document.createElement(elemType);
	const value: HTMLElement = document.createElement(elemType);
	const bar: HTMLElement = document.createElement(barType);
	title.classList.add(elemClass);
	value.classList.add(elemClass);
	bar.classList.add(barClass);
	title.id = elemTitleId;
	value.id = elemValueId;
	bar.id = barId;
	container.append(title);
	container.append(value);
	container.append(bar);
};

const fillContainers = (): void => {
	fillSingleContainerNonbase(
		'nationalNum-container',
		'p',
		'appended-class',
		'nationalNum-title',
		'nationalNum-value'
	);

	fillSingleContainerNonbase(
		'type-container',
		'p',
		'appended-class',
		'type-title',
		'type-value'
	);

	fillSingleContainerNonbase(
		'species-container',
		'p',
		'appended-class',
		'species-title',
		'species-value'
	);

	fillSingleContainerNonbase(
		'height-container',
		'p',
		'appended-class',
		'height-title',
		'height-value'
	);

	fillSingleContainerNonbase(
		'weight-container',
		'p',
		'appended-class',
		'weight-title',
		'weight-value'
	);

	fillSingleContainerNonbase(
		'gender-container',
		'p',
		'appended-class',
		'gender-title',
		'gender-value'
	);

	fillSingleContainerNonbase(
		'baseExp-container',
		'p',
		'appended-class',
		'baseExp-title',
		'baseExp-value'
	);

	fillSingleContainerNonbase(
		'captureRate-container',
		'p',
		'appended-class',
		'captureRate-title',
		'captureRate-value'
	);

	fillSingleContainerBase(
		'hp-container',
		'p',
		'div',
		'appended-class',
		'hp-title',
		'hp-value',
		'hp-bar-class',
		'hp-bar-id'
	);

	fillSingleContainerBase(
		'attack-container',
		'p',
		'div',
		'appended-class',
		'attack-title',
		'attack-value',
		'attack-bar-class',
		'attack-bar-id'
	);

	fillSingleContainerBase(
		'defense-container',
		'p',
		'div',
		'appended-class',
		'defense-title',
		'defense-value',
		'defense-bar-class',
		'defense-bar-id'
	);

	fillSingleContainerBase(
		'specialAttack-container',
		'p',
		'div',
		'appended-class',
		'specialAttack-title',
		'specialAttack-value',
		'specialAttack-bar-class',
		'specialAttack-bar-id'
	);

	fillSingleContainerBase(
		'specialDefense-container',
		'p',
		'div',
		'appended-class',
		'specialDefense-title',
		'specialDefense-value',
		'specialDefense-bar-class',
		'specialDefense-bar-id'
	);

	fillSingleContainerBase(
		'speed-container',
		'p',
		'div',
		'appended-class',
		'speed-title',
		'speed-value',
		'speed-bar-class',
		'speed-bar-id'
	);
};

const addTitles = (): void => {
	document.getElementById('nationalNum-title')!.innerHTML = 'National #:';
	document.getElementById('type-title')!.innerHTML = 'Type:';
	document.getElementById('species-title')!.innerHTML = 'Species:';
	document.getElementById('height-title')!.innerHTML = 'Height:';
	document.getElementById('weight-title')!.innerHTML = 'Weight:';
	document.getElementById('gender-title')!.innerHTML = 'Gender:';
	document.getElementById('baseExp-title')!.innerHTML = 'Base experience:';
	document.getElementById('captureRate-title')!.innerHTML = 'Capture rate:';

	document.getElementById('hp-title')!.innerHTML = 'HP:';
	document.getElementById('attack-title')!.innerHTML = 'Attack:';
	document.getElementById('defense-title')!.innerHTML = 'Defense:';
	document.getElementById('specialAttack-title')!.innerHTML = 'Special attack:';
	document.getElementById('specialDefense-title')!.innerHTML =
		'Special defense:';
	document.getElementById('speed-title')!.innerHTML = 'Speed:';
};

const getPokemon = async (pokemon: string): Promise<any> => {
	// fetch
	const response: Response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon}`
	);

	try {
		// fill containers and add titles
		fillContainers();
		addTitles();

		const data = await response.json();
		// species API
		getPokemonSpecies(data.id);

		// types
		getTypes(data.types);

		// sprite
		let imageContainer = document.getElementById('sprite-container-id');
		let image: HTMLImageElement = document.createElement('img');
		imageContainer?.appendChild(image);
		image.id = 'pokemon-sprite';
		image.src = data.sprites.other['official-artwork'].front_default;

		// other values
		document.getElementById('name-value')!.innerHTML = capitalizeName(
			data.name
		);
		document.getElementById('hp-value')!.innerHTML = data.stats[0].base_stat;
		document.getElementById('attack-value')!.innerHTML =
			data.stats[1].base_stat;
		document.getElementById('defense-value')!.innerHTML =
			data.stats[2].base_stat;
		document.getElementById('specialAttack-value')!.innerHTML =
			data.stats[3].base_stat;
		document.getElementById('specialDefense-value')!.innerHTML =
			data.stats[4].base_stat;
		document.getElementById('speed-value')!.innerHTML = data.stats[5].base_stat;
		document.getElementById('height-value')!.innerHTML = metricHeight(
			data.height
		);
		document.getElementById('weight-value')!.innerHTML = metricWeight(
			data.weight
		);
		document.getElementById('baseExp-value')!.innerHTML = data.base_experience;

		// stat bars
		statBar(data.stats[0].base_stat, 'hp-bar-id', '#00ff00');
		statBar(data.stats[1].base_stat, 'attack-bar-id', '#ffa500');
		statBar(data.stats[2].base_stat, 'defense-bar-id', '#add8d6');
		statBar(data.stats[3].base_stat, 'specialAttack-bar-id', '#ff0000');
		statBar(data.stats[4].base_stat, 'specialDefense-bar-id', '#00008b');
		statBar(data.stats[5].base_stat, 'speed-bar-id', '#c0c0c0');
	} catch (e: any) {
		const errorDiv: HTMLElement = document.getElementById('error')!;
		if (e.name == 'SyntaxError') {
			errorDiv.innerHTML =
				"Oops, there seems to have been an error. Have you written the Pokemon's correct name?";
		} else {
			errorDiv.innerHTML = 'Oops, there seems to have been an error.';
		}
	}
};

const getPokemonSpecies = async (id: number): Promise<any> => {
	// fetch
	const response: Response = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${id}`
	);
	const data = await response.json();

	// console.log(data);
	document.getElementById('species-value')!.innerHTML = data.genera[7].genus;
	document.getElementById('nationalNum-value')!.innerHTML =
		data.pokedex_numbers[0].entry_number;
	document.getElementById('captureRate-value')!.innerHTML = capturePercentage(
		data.capture_rate
	);
	document.getElementById('description-value')!.innerText = breakFlavorText(
		data.flavor_text_entries[0].flavor_text
	);
	document.getElementById('gender-value')!.innerHTML = getGenderRate(
		data.gender_rate
	);
};

const getTypes = async (dataNode: any): Promise<void> => {
	let typesDiv: Element = document.getElementById('type-value')!;
	let typeParagraph: Element;
	for (let i: number = 0; i < dataNode.length; i++) {
		typeParagraph = document.createElement('p')!;
		typeParagraph.innerHTML = dataNode[i].type.name;
		typeParagraph.className = 'typeParagraph';
		typesDiv.appendChild(typeParagraph);
	}
};

const statBar = (amount: number, elemId: string, color: string): void => {
	let bar: Element = document.getElementById(elemId)!;
	bar.classList.add('bar');
	let barDiv: HTMLDivElement;

	for (let i: number = 0; i < amount * 1.5; i++) {
		barDiv = document.createElement('div');
		barDiv.classList.add('barDiv');
		barDiv.style.height = '10px';
		barDiv.style.width = '1px';
		barDiv.style.backgroundColor = color;
		bar?.appendChild(barDiv);
	}
};

export default function metricHeight(input: number): string {
	let centimeters: number = input * 10;

	if (centimeters < 100) {
		return `${centimeters} cm`;
	} else {
		let meters: number = centimeters / 100;
		return `${meters} m`;
	}
}

export function metricWeight(input: number): string {
	let grams: number = input * 100;

	if (grams < 1000) {
		return `0.${input} kg`;
	} else {
		let kg = grams / 1000;
		return `${kg} kg`;
	}
}

const getGenderRate = (input: number): string => {
	if (input === -1) {
		return 'Genderless';
	} else {
		let femalePercentage: number = Number(((input / 8) * 100).toFixed(1));
		let malePercentage: number = 100 - femalePercentage;
		let result: string = `${femalePercentage}% female, ${malePercentage}% male`;
		return result;
	}
};

const capturePercentage = (input: number): string => {
	let result: string = `${(0.39 * input).toFixed(2)} %`;
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

const removeChildren = (id: string): void => {
	const divId: HTMLElement = document.getElementById(id)!;
	while (divId.firstChild) {
		divId.removeChild(divId.lastChild!);
	}
};

const form: HTMLElement = document.getElementById('form')!;
const input = <HTMLInputElement>document.getElementById('search-input');
let image = document.getElementById('pokemon-sprite') as HTMLImageElement;

form?.addEventListener('submit', (e) => {
	e.preventDefault();
	removeChildren('error');
	removeChildren('name-value');
	removeChildren('description-value');
	removeChildren('sprite-container-id');
	removeChildren('nationalNum-container');
	removeChildren('type-container');
	removeChildren('species-container');
	removeChildren('height-container');
	removeChildren('weight-container');
	removeChildren('gender-container');
	removeChildren('baseExp-container');
	removeChildren('captureRate-container');
	removeChildren('hp-container');
	removeChildren('attack-container');
	removeChildren('defense-container');
	removeChildren('specialAttack-container');
	removeChildren('specialDefense-container');
	removeChildren('speed-container');
	let inputValue: string = input.value.toLowerCase();
	getPokemon(inputValue);
	input.value = '';
});
