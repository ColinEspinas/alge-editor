import { Component, Vec, Ease, Angle, PIXI, Intersects, Line, Polygon } from "alge";
import NodeBomb from "../entities/NodeBomb";

export default class PlayerController extends Component {
	
	create() {
		this.input = this.parent.engine.getManager("Input");
		this.sceneManager = this.parent.engine.getManager("Scene");
		this.audioManager = this.parent.engine.getManager("Audio");

		this.crosshairPos = this.properties["crosshair"];
		this.direction = new Vec(0, 0);

		this.graphics = new PIXI.Graphics();
		this.nodes = [];

		this.camera = null;
		this.speed = 10;
		this.nodeDropCd = 0;
		this.nodeDropCdMax = 8;

	}

	init() {
		this.camera = this.parent.scene.getEntity("MainCamera");
		this.input = this.parent.engine.getManager("Input");
		this.sceneManager.getLoadedScene().getLayer("Default").container.addChild(this.graphics);
	}
	
	update() {

		this.direction = new Vec(0, 0);

		if (this.input.getKeyDown("z")) {
			this.direction.add(Vec.up());
		}
		if (this.input.getKeyDown("q")) {
			this.direction.add(Vec.left());
		}
		if (this.input.getKeyDown("s")) {
			this.direction.add(Vec.down());
		}
		if (this.input.getKeyDown("d")) {
			this.direction.add(Vec.right());
		}

		if (this.input.getKeyPressed("x")) {
			// let sceneName = (this.sceneManager.getLoadedScene().name == "test") ? "main" : "test";
		}

		if (this.input.getKeyPressed(" ") && this.nodeDropCd >= this.nodeDropCdMax) {
			this.addNode(Vec.from(this.parent.transform.position));
			this.camera.addTrauma(0.3);
			this.nodeDropCd = 0;
		}

		this.direction = this.direction.normalize().scale(this.speed);

		this.crosshairPos.add(this.direction);
		
		this.drawLineBetweenNodes();

		// if (this.sceneIsTransitioningOut) {
		// 	this.graphics.beginFill(0xFFFFFF).drawCircle(this.camera.center.x, this.camera.center.y, Math.pow(this.sceneTransitionCounter++, 2)).endFill();
		// }
		// else if (this.sceneIsTransitioningIn) {
		// 	this.graphics.beginFill(0xFFFFFF).drawCircle(this.camera.center.x, this.camera.center.y, Math.pow(Math.max(0, this.sceneTransitionCounter--), 2)).endFill();
		// }
		
		this.parent.transform.position = new Vec(
			Ease.lerp(this.crosshairPos.x, this.parent.transform.position.x, 0.9),
			Ease.lerp(this.crosshairPos.y, this.parent.transform.position.y, 0.9)
		);

		this.parent.transform.rotation = Angle.radToDeg(Angle.betweenPositions(this.parent.transform.position, this.crosshairPos)) + 90;
	}

	fixedUpdate() {
		if (this.nodeDropCd < this.nodeDropCdMax) {
			this.nodeDropCd++;
		}
	}

	addNode(pos) {
		let node = new NodeBomb("Node" + (this.nodes.length + 1), {
			position : Vec.from(pos),
		});

		this.nodes.push(node);
		this.sceneManager.getLoadedScene().addEntity(node);

		for (let i = 1, len = this.nodes.length; i < len; ++i) {

			let n1 = this.nodes[i - 1];
			let n2 = this.nodes[i];

			if (Intersects.lineToLine(new Line(n1.transform.position, n2.transform.position), new Line(this.lastNode.transform.position, node.transform.position), false)) {

				for (let j = 0; j < len; ++j) {
					this.sceneManager.getLoadedScene().removeEntity(this.nodes[j].name);
				}

				this.camera.addTrauma(0.3);

				let entities = this.sceneManager.getLoadedScene().getEntities();

				for (let j = 0; j < entities.length; ++j) {
					let pos = entities[j].transform.position;
					let verts = [];

					for (let node of this.nodes) {
						verts.push(node.transform.position);
					}
					if (pos && Intersects.polygonToPoint(new Polygon(verts), pos)) {
						if ((entities[j]).hasTag("Removable"))
							this.sceneManager.getLoadedScene().removeEntity(entities[j].name);
					}
				}

				this.nodes.length = 0;
				this.lastNode = null;

				node = new NodeBomb("Node" + (this.nodes.length + 1), {
					position : Vec.from(pos),
				});

				this.nodes.push(node);
				this.sceneManager.getLoadedScene().addEntity(node);

				break;
			}
		}

		this.lastNode = node;
	}

	drawLineBetweenNodes() {
		this.graphics.clear();
		if (this.nodes.length > 1) {
			for (let i = 1, len = this.nodes.length; i < len; ++i) {

				let n1 = this.nodes[i - 1];
				let n2 = this.nodes[i];
	
				let x1 = n1.transform.position.x;
				let y1 = n1.transform.position.y;
	
				let x2 = n2.transform.position.x;
				let y2 = n2.transform.position.y;
	
				this.graphics.moveTo(x1, y1).lineStyle(4, 0xFFFFFF).lineTo(x2, y2);
			}
		}
		if(this.nodes.length > 0) {
			let lastn = this.nodes[this.nodes.length - 1];

			this.graphics.moveTo(lastn.transform.position.x, lastn.transform.position.y)
				.lineStyle(4, 0xFFFFFF)
				.lineTo(this.parent.transform.position.x, this.parent.transform.position.y);
		}
	}
}