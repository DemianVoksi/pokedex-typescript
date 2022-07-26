// WHOLE POKEMON https://pokeapi.co/api/v2/pokemon/pikachu
// FLAVOR TEXT https://pokeapi.co/api/v2/pokemon-species/25
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
// pokedex icon https://icon-library.com/icon/pokedex-icon-15.html.html>Pokedex Icon # 255166
// sivi pokedex icon <a href="https://www.flaticon.com/free-icons/pokedex" title="pokedex icons">Pokedex icons created by Roundicons Freebies - Flaticon</a>

let types: string[] = [];

// fetch('https://pokeapi.co/api/v2/pokemon-species/25')
// 	.then((response) => response.json())
// 	.then((data) => console.log(data));

// console.log(types);

const getPikachu = async (pokemon: string): Promise<any> => {
	// prvo varijable

	const image: HTMLImageElement = document.createElement('img');
	image.style.height = '200px';
	image.style.width = '200px';
	// onda fetch
	const pikachu: Response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon}`
	);
	const pikachuJsoned: Promise<any> = pikachu.json();
	pikachuJsoned.then(
		(data) => (image.src = data.sprites.other['official-artwork'].front_default)
	);

	// pa appendanje
	document.querySelector('.image')?.append(image);
	// return pikachuJsoned;
};

// getPikachu('pikachu');
// let gotten: Promise<void> = getPikachu('pikachu').then((data) =>
// 	console.log(data)
// );

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
