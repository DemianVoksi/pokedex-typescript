/**
 * @jest-environment jsdom
 */

import metricHeight from '../src/script';

test('convert decimetres to centimetres or meters', () => {
	expect(metricHeight(5)).toBe('50 cm');
});
