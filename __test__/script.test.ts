/**
 * @jest-environment jsdom
 */

import metricHeight, { metricWeight } from '../src/script';

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
