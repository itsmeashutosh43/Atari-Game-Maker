import { GameModel } from "../src/game-runner/model/gameModel";
import { RectangleSize } from "../src/game-runner/model/objects/rectangleSize";
import { CircleSize } from "../src/game-runner/model/objects/CircleSize";

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

    it('A dummy test for gameModel test', () => {
		// expect(GameModel.i_am_dead()).be.true;
	});

	it('A dummy test for RectangleSize', () => {
		let rectangle = new RectangleSize(40,50,"Blue")
		expect(rectangle.getWidth()).to.equal(40);
		expect(rectangle.getHeight()).to.equal(50);
		expect(rectangle.getColor()).to.be.a('string')
	});

	it('A dummy test for CircleSize', () => {
		let circle = new CircleSize(40,40,"Green")
		expect(circle.getWidth()).to.equal(40);
		expect(circle.getHeight()).to.equal(40);
		expect(circle.getColor()).to.be.a('string')
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