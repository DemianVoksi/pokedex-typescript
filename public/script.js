"use strict";
// pokemon logo https://commons.wikimedia.org/wiki/File:International_Pok%C3%A9mon_logo.svg
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fillSingleContainerNonbase = (parentName, elemType, elemClass, elemTitleId, elemValueId) => {
    const container = document.getElementById(parentName);
    const title = document.createElement(elemType);
    const value = document.createElement(elemType);
    title.classList.add(elemClass);
    value.classList.add(elemClass);
    title.id = elemTitleId;
    value.id = elemValueId;
    container.append(title);
    container.append(value);
};
const fillSingleContainerBase = (parentName, elemType, barType, elemClass, elemTitleId, elemValueId, barClass, barId) => {
    const container = document.getElementById(parentName);
    const title = document.createElement(elemType);
    const value = document.createElement(elemType);
    const bar = document.createElement(barType);
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
const fillContainers = () => {
    fillSingleContainerNonbase('nationalNum-container', 'p', 'appended-class', 'nationalNum-title', 'nationalNum-value');
    fillSingleContainerNonbase('type-container', 'p', 'appended-class', 'type-title', 'type-value');
    fillSingleContainerNonbase('species-container', 'p', 'appended-class', 'species-title', 'species-value');
    fillSingleContainerNonbase('height-container', 'p', 'appended-class', 'height-title', 'height-value');
    fillSingleContainerNonbase('weight-container', 'p', 'appended-class', 'weight-title', 'weight-value');
    fillSingleContainerNonbase('gender-container', 'p', 'appended-class', 'gender-title', 'gender-value');
    fillSingleContainerNonbase('baseExp-container', 'p', 'appended-class', 'baseExp-title', 'baseExp-value');
    fillSingleContainerNonbase('captureRate-container', 'p', 'appended-class', 'captureRate-title', 'captureRate-value');
    fillSingleContainerBase('hp-container', 'p', 'div', 'appended-class', 'hp-title', 'hp-value', 'hp-bar-class', 'hp-bar-id');
    fillSingleContainerBase('attack-container', 'p', 'div', 'appended-class', 'attack-title', 'attack-value', 'attack-bar-class', 'attack-bar-id');
    fillSingleContainerBase('defense-container', 'p', 'div', 'appended-class', 'defense-title', 'defense-value', 'defense-bar-class', 'defense-bar-id');
    fillSingleContainerBase('specialAttack-container', 'p', 'div', 'appended-class', 'specialAttack-title', 'specialAttack-value', 'specialAttack-bar-class', 'specialAttack-bar-id');
    fillSingleContainerBase('specialDefense-container', 'p', 'div', 'appended-class', 'specialDefense-title', 'specialDefense-value', 'specialDefense-bar-class', 'specialDefense-bar-id');
    fillSingleContainerBase('speed-container', 'p', 'div', 'appended-class', 'speed-title', 'speed-value', 'speed-bar-class', 'speed-bar-id');
};
const addTitles = () => {
    document.getElementById('nationalNum-title').innerHTML = 'National #:';
    document.getElementById('type-title').innerHTML = 'Type:';
    document.getElementById('species-title').innerHTML = 'Species:';
    document.getElementById('height-title').innerHTML = 'Height:';
    document.getElementById('weight-title').innerHTML = 'Weight:';
    document.getElementById('gender-title').innerHTML = 'Gender:';
    document.getElementById('baseExp-title').innerHTML = 'Base experience:';
    document.getElementById('captureRate-title').innerHTML = 'Capture rate:';
    document.getElementById('hp-title').innerHTML = 'HP:';
    document.getElementById('attack-title').innerHTML = 'Attack:';
    document.getElementById('defense-title').innerHTML = 'Defense:';
    document.getElementById('specialAttack-title').innerHTML = 'Special attack:';
    document.getElementById('specialDefense-title').innerHTML =
        'Special defense:';
    document.getElementById('speed-title').innerHTML = 'Speed:';
};
const getPokemon = (pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch
    const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    try {
        // fill containers and add titles
        fillContainers();
        addTitles();
        const data = yield response.json();
        // species API
        getPokemonSpecies(data.id);
        // types
        getTypes(data.types);
        // sprite
        let imageContainer = document.getElementById('sprite-container-id');
        let image = document.createElement('img');
        imageContainer === null || imageContainer === void 0 ? void 0 : imageContainer.appendChild(image);
        image.id = 'pokemon-sprite';
        image.src = data.sprites.other['official-artwork'].front_default;
        // other values
        document.getElementById('name-value').innerHTML = capitalizeName(data.name);
        document.getElementById('hp-value').innerHTML = data.stats[0].base_stat;
        document.getElementById('attack-value').innerHTML =
            data.stats[1].base_stat;
        document.getElementById('defense-value').innerHTML =
            data.stats[2].base_stat;
        document.getElementById('specialAttack-value').innerHTML =
            data.stats[3].base_stat;
        document.getElementById('specialDefense-value').innerHTML =
            data.stats[4].base_stat;
        document.getElementById('speed-value').innerHTML = data.stats[5].base_stat;
        document.getElementById('height-value').innerHTML = metricHeight(data.height);
        document.getElementById('weight-value').innerHTML = metricWeight(data.weight);
        document.getElementById('baseExp-value').innerHTML = data.base_experience;
        // stat bars
        statBar(data.stats[0].base_stat, 'hp-bar-id', '#00ff00');
        statBar(data.stats[1].base_stat, 'attack-bar-id', '#ffa500');
        statBar(data.stats[2].base_stat, 'defense-bar-id', '#add8d6');
        statBar(data.stats[3].base_stat, 'specialAttack-bar-id', '#ff0000');
        statBar(data.stats[4].base_stat, 'specialDefense-bar-id', '#00008b');
        statBar(data.stats[5].base_stat, 'speed-bar-id', '#c0c0c0');
    }
    catch (e) {
        const errorDiv = document.getElementById('error');
        if (e.name == 'SyntaxError') {
            errorDiv.innerHTML =
                "Oops, there seems to have been an error. Have you written the Pokemon's correct name?";
        }
        else {
            errorDiv.innerHTML = 'Oops, there seems to have been an error.';
        }
    }
});
const getPokemonSpecies = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch
    const response = yield fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = yield response.json();
    // console.log(data);
    document.getElementById('species-value').innerHTML = data.genera[7].genus;
    document.getElementById('nationalNum-value').innerHTML =
        data.pokedex_numbers[0].entry_number;
    document.getElementById('captureRate-value').innerHTML = capturePercentage(data.capture_rate);
    document.getElementById('description-value').innerText = breakFlavorText(data.flavor_text_entries[0].flavor_text);
    document.getElementById('gender-value').innerHTML = getGenderRate(data.gender_rate);
});
const getTypes = (dataNode) => __awaiter(void 0, void 0, void 0, function* () {
    let typesDiv = document.getElementById('type-value');
    let typeParagraph;
    for (let i = 0; i < dataNode.length; i++) {
        typeParagraph = document.createElement('p');
        typeParagraph.innerHTML = dataNode[i].type.name;
        typeParagraph.className = 'typeParagraph';
        typesDiv.appendChild(typeParagraph);
    }
});
const statBar = (amount, elemId, color) => {
    let bar = document.getElementById(elemId);
    bar.classList.add('bar');
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
const removeChildren = (id) => {
    const divId = document.getElementById(id);
    while (divId.firstChild) {
        divId.removeChild(divId.lastChild);
    }
};
const form = document.getElementById('form');
const input = document.getElementById('search-input');
let image = document.getElementById('pokemon-sprite');
form.addEventListener('submit', (e) => {
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
    let inputValue = input.value.toLowerCase();
    getPokemon(inputValue);
    input.value = '';
});
