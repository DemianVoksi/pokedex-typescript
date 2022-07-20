"use strict";
// WHOLE POKEMON https://pokeapi.co/api/v2/pokemon/pikachu
// FLAVOR TEXT https://pokeapi.co/api/v2/pokemon-species/25
// DAMAGE RELATIONS https://pokeapi.co/api/v2/type
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
fetch('https://pokeapi.co/api/v2/type/2')
    .then((response) => response.json())
    .then((data) => console.log(data));
const getPikachu = (pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    const pikachu = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const pikachuJsoned = pikachu.json();
    // pikachuJsoned.then((data) => console.log(data.name));
    return pikachuJsoned;
});
// let gotten: Promise<void> = getPikachu('pikachu').then((data) =>
// 	console.log(data)
// );
