"use strict";
// pokemon logo https://commons.wikimedia.org/wiki/File:International_Pok%C3%A9mon_logo.svg
// element.classList.add
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getPokemon = (pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch
    const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = yield response.json();
    // species API
    getPokemonSpecies(data.id);
    // types
    getTypes(data.types);
    // sprite
    let image = document.getElementById('pokemon-sprite');
    image.src = data.sprites.other['official-artwork'].front_default;
    // other values
    document.getElementById('name-value').innerHTML = capitalizeName(data.name);
    document.getElementById('hp-value').innerHTML = data.stats[0].base_stat;
    document.getElementById('attack-value').innerHTML = data.stats[1].base_stat;
    document.getElementById('defense-value').innerHTML = data.stats[2].base_stat;
    document.getElementById('special-attack-value').innerHTML =
        data.stats[3].base_stat;
    document.getElementById('special-defense-value').innerHTML =
        data.stats[4].base_stat;
    document.getElementById('speed-value').innerHTML = data.stats[5].base_stat;
    document.getElementById('height-value').innerHTML = metricHeight(data.height);
    document.getElementById('weight-value').innerHTML = metricWeight(data.weight);
    document.getElementById('base-experience-value').innerHTML =
        data.base_experience;
    // stat bars
    statBar(data.stats[0].base_stat, 'hp-bar', '#00ff00');
    statBar(data.stats[1].base_stat, 'attack-bar', '#ffa500');
    statBar(data.stats[2].base_stat, 'defense-bar', '#add8d6');
    statBar(data.stats[3].base_stat, 'special-attack-bar', '#ff0000');
    statBar(data.stats[4].base_stat, 'special-defense-bar', '#00008b');
    statBar(data.stats[5].base_stat, 'speed-bar', '#c0c0c0');
});
const getPokemonSpecies = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch
    const response = yield fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const resJsoned = response.json();
    resJsoned.then((data) => {
        console.log(data);
        document.getElementById('species-value').innerHTML = data.genera[7].genus;
        document.getElementById('national-number-value').innerHTML =
            data.pokedex_numbers[0].entry_number;
        document.getElementById('capture-rate-value').innerHTML =
            capturePercentage(data.capture_rate);
        document.getElementById('description-value').innerText = breakFlavorText(data.flavor_text_entries[0].flavor_text);
        document.getElementById('gender-value').innerHTML = getGenderRate(data.gender_rate);
    });
});
getPokemon('mewtwo');
const getTypes = (dataNode) => __awaiter(void 0, void 0, void 0, function* () {
    let typesDiv = document.getElementById('type-value');
    typesDiv.setAttribute('style', 'height: 15px; margin-bottom: 10px; display: flex; flex-direction: row;');
    let typeParagraph;
    for (let i = 0; i < dataNode.length; i++) {
        typeParagraph = document.createElement('p');
        typeParagraph.innerHTML = dataNode[i].type.name;
        typeParagraph.className = 'typeParagraph';
        typeParagraph.setAttribute('style', 'margin-right: 5px; margin: block;');
        typesDiv.appendChild(typeParagraph);
    }
});
const statBar = (amount, elemId, color) => {
    let bar = document.getElementById(elemId);
    bar.setAttribute('style', 'display: flex; flex-direction: row; justify-content: center; align-items: center; margin-left: 15px;');
    let barDiv;
    for (let i = 0; i < amount * 1.5; i++) {
        barDiv = document.createElement('div');
        barDiv.classList.add('barDiv');
        barDiv.style.height = '10px';
        barDiv.style.width = '1px';
        barDiv.style.backgroundColor = color;
        bar === null || bar === void 0 ? void 0 : bar.appendChild(barDiv);
    }
};
const metricHeight = (input) => {
    let centimeters = input * 10;
    if (centimeters < 100) {
        return `${centimeters} cm`;
    }
    else {
        let meters = centimeters / 100;
        return `${meters} m`;
    }
};
const metricWeight = (input) => {
    let grams = input * 100;
    if (grams < 1000) {
        return `0.${input} kg`;
    }
    else {
        let kg = grams / 1000;
        return `${kg} kg`;
    }
};
const getGenderRate = (input) => {
    if (input === -1) {
        return 'Genderless';
    }
    else {
        let femalePercentage = Number(((input / 8) * 100).toFixed(1));
        let malePercentage = 100 - femalePercentage;
        let result = `${femalePercentage}% female, ${malePercentage}% male`;
        return result;
    }
};
const capturePercentage = (input) => {
    let result = `${(0.39 * input).toFixed(2)} %`;
    return result;
};
const breakFlavorText = (input) => {
    let result1 = input.replace('\f', ' ');
    let result2 = result1.replace('\n', ' ');
    return result2;
};
const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};
