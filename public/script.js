"use strict";
// WHOLE POKEMON https://pokeapi.co/api/v2/pokemon/pikachu
// FLAVOR TEXT https://pokeapi.co/api/v2/pokemon-species/25
// DAMAGE RELATIONS https://pokeapi.co/api/v2/type
// IMAGE data.sprites.other['official-artwork'].front_default
// NAME data.name
// NUMBER
// ABILITIES
// GENDER
// BASE EXP
// DESCRIPTION pokemon-species data.flavor_text_entries[0]
// HEIGHT data.height
// WEIGHT data.weight
// CATEGORY pokemon-species data.genera[7]
// TYPE data.types[]
// HP data.stats[0].base_stat
// ATTACK data.stats[1].base_stat
// DEFENSE data.stats[2].base_stat
// SPECIAL ATTACK data.stats[3].base_stat
// SPECIAL DEFENSE data.stats[4].base_stat
// SPEED data.stats[5].base_stat
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// pokemon logo https://commons.wikimedia.org/wiki/File:International_Pok%C3%A9mon_logo.svg
// pokedex icon https://icon-library.com/icon/pokedex-icon-15.html.html>Pokedex Icon # 255166
// sivi pokedex icon <a href="https://www.flaticon.com/free-icons/pokedex" title="pokedex icons">Pokedex icons created by Roundicons Freebies - Flaticon</a>
let types = [];
// fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
// 	.then((response) => response.json())
// 	.then((data) => console.log(data.types));
// console.log(types);
const getPikachu = (pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    // prvo varijable
    var _a;
    const image = document.createElement('img');
    image.style.height = '200px';
    image.style.width = '200px';
    // onda fetch
    const pikachu = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const pikachuJsoned = pikachu.json();
    pikachuJsoned.then((data) => (image.src = data.sprites.other['official-artwork'].front_default));
    // pa appendanje
    (_a = document.querySelector('.image')) === null || _a === void 0 ? void 0 : _a.append(image);
    // return pikachuJsoned;
});
// getPikachu('pikachu');
// let gotten: Promise<void> = getPikachu('pikachu').then((data) =>
// 	console.log(data)
// );
const getTypes = (pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    let typesDiv = document.querySelector('.types');
    let typeParagraph;
    const pikachu = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const pikachuJsoned = pikachu.json();
    pikachuJsoned.then((data) => {
        console.log(data.types.length);
        for (let i = 0; i < data.types.length; i++) {
            typeParagraph = document.createElement('p');
            typeParagraph.innerHTML = data.types[i].type.name;
            typeParagraph.className = 'typeParagraph';
            typesDiv.appendChild(typeParagraph);
        }
    });
});
getTypes('tyranitar');
