"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
// 	.then((response) => response.json())
// 	.then((data) => console.log(data));
const getPikachu = () => __awaiter(void 0, void 0, void 0, function* () {
    const pikachu = yield fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
    const pikachuJsoned = pikachu.json();
    // pikachuJsoned.then((data) => console.log(data.name));
    return pikachuJsoned;
});
let gotten = getPikachu().then((data) => console.log(data));
