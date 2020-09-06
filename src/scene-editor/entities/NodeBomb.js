import { Entity, Sprite, Vec, Tileset } from 'alge';

export default class NodeBomb extends Entity {

	create() {
		this.transform.scale.scale(8 * this.engine.gameScale);
		this.transform.position = this.properties["position"] || new Vec(100, 100);

		let tileset = new Tileset("app://./assets/tileset.png", 4, 1, 8, 8);

		this.sprite = new Sprite(this, "Sprite", {
			src: tileset.getTile(1)
		});
		this.addComponent(this.sprite);
	}

	update() {
		this.transform.rotation = (this.transform.rotation + 3) % 360;
	}

}