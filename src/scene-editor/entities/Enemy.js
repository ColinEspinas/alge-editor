import { Entity, Sprite, Vec, Tileset} from "alge";
const shipSprite = require("../../../public/assets/tileset.png");

export default class Enemy extends Entity {

	create() {

		this.transform.scale.scale(8 * this.engine.gameScale);
		this.transform.position = this.properties["position"] || new Vec(100, 100);

		let tileset = new Tileset(shipSprite, 4, 1, 8, 8);

		this.shipSprite = new Sprite(this, "ShipSprite", {
			src: tileset.getTile(2),
			layer: "Default",
		});
		this.addComponent(this.shipSprite);
	}
}