// WHOLE POKEMON https://pokeapi.co/api/v2/pokemon/pikachu
// NAME data.name
// DESCRIPTION
// HEIGHT data.height
// WEIGHT data.weight
// CATEGORY
// TYPE može ih imati nekoliko
// WEAKNESS
// HP data.stats[0].base_stat
// ATTACK data.stats[1].base_stat
// DEFENSE data.stats[2].base_stat
// SPECIAL ATTACK data.stats[3].base_stat
// SPECIAL DEFENSE data.stats[4].base_stat
// SPEED data.stats[5].base_stat

// fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
// 	.then((response) => response.json())
// 	.then((data) => console.log(data));

const getPikachu = async (): Promise<any> => {
	const pikachu: Response = await fetch(
		'https://pokeapi.co/api/v2/pokemon/pikachu'
	);
	const pikachuJsoned: Promise<any> = pikachu.json();
	// pikachuJsoned.then((data) => console.log(data.name));
	return pikachuJsoned;
};

let gotten = getPikachu().then((data) => console.log(data));
