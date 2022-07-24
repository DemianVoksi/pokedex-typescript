// WHOLE POKEMON https://pokeapi.co/api/v2/pokemon/pikachu
// FLAVOR TEXT https://pokeapi.co/api/v2/pokemon-species/25
// DAMAGE RELATIONS https://pokeapi.co/api/v2/type
// IMAGE data.sprites.other['official-artwork'].front_default
// NAME data.name
// DESCRIPTION pokemon-species data.flavor_text_entries[0]
// HEIGHT data.height
// WEIGHT data.weight
// CATEGORY pokemon-species data.genera[7]
// TYPE može ih imati nekoliko
// HP data.stats[0].base_stat
// ATTACK data.stats[1].base_stat
// DEFENSE data.stats[2].base_stat
// SPECIAL ATTACK data.stats[3].base_stat
// SPECIAL DEFENSE data.stats[4].base_stat
// SPEED data.stats[5].base_stat

// pokemon logo https://commons.wikimedia.org/wiki/File:International_Pok%C3%A9mon_logo.svg
// pokedex icon https://icon-library.com/icon/pokedex-icon-15.html.html>Pokedex Icon # 255166
// sivi pokedex icon <a href="https://www.flaticon.com/free-icons/pokedex" title="pokedex icons">Pokedex icons created by Roundicons Freebies - Flaticon</a>

fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
	.then((response) => response.json())
	.then((data) => console.log(data));

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

getPikachu('pikachu');
// let gotten: Promise<void> = getPikachu('pikachu').then((data) =>
// 	console.log(data)
// );
