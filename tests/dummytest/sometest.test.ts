const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { assert } = require('chai');
const { expect } = require('chai');

beforeEach(() => {
	const dom = new JSDOM(
		`<html>
			<body>	

			</body>
		</html>`,
		{ url: "http://localhost" }
	);

	global.window = dom.window;
	global.document = dom.window.document;
});

describe('Testing model', () => {

	it('A dummy test for ensuring correct test suite setup and configuration', () => {
		expect(2+2).to.equal(4);
	});

	// Other tests may resemble the below
	// A handy cheatsheet is available at https://devhints.io/chai

	// it('Testing rectangle dimensions', () => {
	// 	const rect: RectangleDims = new RectangleDims(100, 200, '#ffffff');
	// 	expect(rect.getAlongY()).to.equal(200);
	// 	expect(rect.getAlongX()).to.equal(100);
	// 	expect(rect.getColor()).to.equal('#ffffff');
	// });
});