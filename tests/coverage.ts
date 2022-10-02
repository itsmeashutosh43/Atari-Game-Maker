import { GameModel } from "../src/game-runner/model/gameModel";
import { RectangleSize } from "../src/game-runner/model/objects/rectangleSize";
import { CircleSize } from "../src/game-runner/model/objects/CircleSize";
import { Colission } from "../src/game-runner/controller/colission_detector/colission";
import { MoveBehavior } from "../src/game-runner/controller/MovementBehaviors/moveBehavior";
import { MusicBehavior } from "../src/sound-effects/SoundBehaviors/MusicBehavior";
import { NoSoundBehavior } from "../src/sound-effects/SoundBehaviors/noSoundBehavior";
import { MovementDirection } from "../src/game-runner/controller/ExternalController/movement_direction";
import { Circle, Block, Shape } from "../src/game-runner/drawables/drawable";
import { DIRECTION } from "../src/game-runner/behaviors/behavior";
import { DoNothing, SetPosition, Move } from "../src/game-runner/behaviors/behavior";
import { KeyboardController } from "../src/game-runner/controller/ExternalController/keyboardController";
import { GameVariable } from "../src/game-maker/game-variable";
import { KEYCODE, UserKeydownEvent } from "../src/game-runner/user-events/user-event";




const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { assert } = require('chai');
const { expect } = require('chai');

// const dom = new JSDOM(
// 	`<html>
// 		<body>	
// 		</body>
// 	</html>`,
// 	{ url: "http://localhost" }
// );

// global.window = dom.window;
// global.document = dom.window.document;

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = global.document.defaultView;



describe('Testing model', () => {

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

	it('A dummy test for Rectangle Collision', () => {
		let rectangle1 = new RectangleSize(40,50,"Blue")
		let b1=rectangle1.getBoundingBox({x:20,y:30})
		let b2=rectangle1.getBoundingBox({x:10,y:20})
		expect(Colission.isColliding(b1,b2)).be.true;
	});

	it('A dummy test for Rectangle not Colliding', () => {
		let rectangle1 = new RectangleSize(40,50,"Blue")
		let b1=rectangle1.getBoundingBox({x:20,y:30})
		let b2=rectangle1.getBoundingBox({x:150,y:150})
		expect(Colission.isColliding(b1,b2)).be.false;
	});

	it('A dummy test for Circle Collision false', () => {
		let circle = new CircleSize(40,40,"Green")
		let b1=circle.getBoundingBox({x:20,y:30})
		let b2=circle.getBoundingBox({x:150,y:150})
		expect(Colission.isColliding(b1,b2)).be.false;
	});

	it('A dummy test for Circle Collision true', () => {
		let circle = new CircleSize(15,15,"Green")
		let b1=circle.getBoundingBox({x:20,y:30})
		let b2=circle.getBoundingBox({x:30,y:30})
		expect(Colission.isColliding(b1,b2)).be.true;
	});

	it('A dummy test for Circle Collision True', () => {
		let circle = new CircleSize(10,10,"Green")
		let b1=circle.getBoundingBox({x:20,y:30})
		let b2=circle.getBoundingBox({x:30,y:30})
		expect(Colission.isColliding(b1,b2)).be.true;
	});

	it('A dummy test for Circle and Rectangle Collision True', () => {
		let circle = new CircleSize(10,10,"Green")
		let rectangle1 = new RectangleSize(40,50,"Blue")
		let b1=circle.getBoundingBox({x:20,y:30})
		let b2=circle.getBoundingBox({x:30,y:30})
		expect(Colission.isColliding(b1,b2)).be.true;
	});

	// it('A dummy test for Move Behaviour', () => {
	// 	let movebehaviour = new MoveBehavior()

	// 	//expect(movebehaviour.audio).to.be.undefined;
	// 	expect(movebehaviour.dx).to.equal(20);
	// 	expect(movebehaviour.dy).to.equal(20);
	// 	expect(movebehaviour.dy).be.false;

	// 	movebehaviour.reverse=false
	// 	movebehaviour.reverseX()
	// 	expect(movebehaviour.dx).to.equal(-20);
	// });

	// it('A dummy test for Music Behaviour', () => {
	// 	let musicbehaviour = new MusicBehavior("./src/sound-effects/collision.wav")
	// 	musicbehaviour.audio= new Audio(musicbehaviour.src)
	// 	expect(musicbehaviour.src).to.be.a('string');
	// });

	// it('A dummy test for Music Behaviour', () => {
	// 	let musicbehaviour = new NoSoundBehavior()
		
	// 	expect(musicbehaviour.make_sound()).to.be.function;
	// 	expect(musicbehaviour.pause_sound()).to.be.function;
	// });

	it('A unit test for Move Direction', () => {
		let movedirection = new MovementDirection()

		expect(movedirection.left).be.false;
		expect(movedirection.right).be.false;
		expect(movedirection.up).be.false;
		expect(movedirection.up).be.false;
	});

	it('A unit test for Direction', () => {
		assert.include(Object.values(DIRECTION),"LEFT");
		assert.include(Object.values(DIRECTION),"RIGHT");
		assert.include(Object.values(DIRECTION),"UP");
		assert.include(Object.values(DIRECTION),"DOWN");
		assert.include(Object.values(DIRECTION),"NOWHERE");
		assert.include(Object.values(DIRECTION),"TOPLEFT");
		assert.include(Object.values(DIRECTION),"TOPRIGHT");
		assert.include(Object.values(DIRECTION),"BOTTOMLEFT");
		assert.include(Object.values(DIRECTION),"BOTTOMRIGHT");

		
	});

	it('A unit test for Nothing Behavior', () => {
		let behavior= new DoNothing()
		assert.isUndefined(behavior.resetBehavior());
	
	});

	it('A unit test for Behavior', () => {
		let behavior= new SetPosition({x:30,y:50})
		//assert.isFunction(behavior.resetBehavior());
		//expect(behavior.coords).be.equal({x:30,y:50})
		assert.isObject(behavior.coords)
	
	});

	it('A unit test for Behavior', () => {
		let behavior= new Move(10,DIRECTION.LEFT,20)
		//assert.isFunction(behavior.resetBehavior());
		expect(behavior.displacement).be.equal(10)
	
	});

	it('A unit test for Move Behavior', () => {
		let behavior= new Move(20,DIRECTION.RIGHT,20)
		//assert.isFunction(behavior.resetBehavior());
		expect(behavior.displacement).be.equal(20)
		expect(behavior.dir).be.equal("RIGHT")
		expect(behavior.executionComplete).be.false

		behavior.resetBehavior()
		expect(behavior.executionComplete).be.true
		expect(behavior.traveled).be.equal(0)
	
	});

	it('A unit test for Keyboard Behavior', () => {
		let keyboard= new KeyboardController()
		keyboard.register()
		expect(keyboard.registered).be.true;

	
	});

	it('A unit test for Keyboard Behavior', () => {
		assert.include(Object.values(KEYCODE),"ArrowLeft");
		assert.include(Object.values(KEYCODE),"ArrowRight");
		assert.include(Object.values(KEYCODE),"ArrowUp");
		assert.include(Object.values(KEYCODE),"ArrowDown");
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