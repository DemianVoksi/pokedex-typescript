/**
 * @jest-environment jsdom
 */

import metricHeight, {
	metricWeight,
	getGenderRate,
	capturePercentage
} from '../src/script';

test('convert to centimetres or meters', () => {
	expect(metricHeight(5)).toBe('50 cm');
	expect(metricHeight(13)).toBe('1.3 m');
	expect(metricHeight(41)).toBe('4.1 m');
	expect(metricHeight(1)).toBe('10 cm');
});

test('convert to centimetres or meters', () => {
	expect(metricHeight(3)).not.toBe('53 cm');
	expect(metricHeight(11)).not.toBe('2.3 m');
	expect(metricHeight(21)).not.toBe('1.1 m');
	expect(metricHeight(16.3)).not.toBe('163 cm');
});

test('convert to kilograms', () => {
	expect(metricWeight(5)).toBe('0.5 kg');
	expect(metricWeight(20)).toBe('2 kg');
	expect(metricWeight(52)).toBe('5.2 kg');
	expect(metricWeight(1)).toBe('0.1 kg');
});

test('convert to kilograms', () => {
	expect(metricWeight(1)).not.toBe('0.01 kg');
	expect(metricWeight(2)).not.toBe('2 kg');
	expect(metricWeight(22)).not.toBe('2.2222 kg');
	expect(metricWeight(12)).not.toBe('0.12 kg');
});

test('get gender rate percentage', () => {
	expect(getGenderRate(-1)).toBe('Genderless');
	expect(getGenderRate(0)).toBe('0% female, 100% male');
	expect(getGenderRate(1)).toBe('12.5% female, 87.5% male');
	expect(getGenderRate(2)).toBe('25% female, 75% male');
	expect(getGenderRate(3)).toBe('37.5% female, 62.5% male');
	expect(getGenderRate(4)).toBe('50% female, 50% male');
	expect(getGenderRate(5)).toBe('62.5% female, 37.5% male');
	expect(getGenderRate(6)).toBe('75% female, 25% male');
	expect(getGenderRate(7)).toBe('87.5% female, 12.5% male');
	expect(getGenderRate(8)).toBe('100% female, 0% male');
});

test('get the percentage likeliness of capturing a Pokemon', () => {
	expect(capturePercentage(25)).toBe('9.75%');
	expect(capturePercentage(222)).toBe('86.58%');
	expect(capturePercentage(31)).toBe('12.09%');
	expect(capturePercentage(78)).toBe('30.42%');
	expect(capturePercentage(164)).toBe('63.96%');
	expect(capturePercentage(199)).toBe('77.61%');
});
