import { Entity, Sprite, Vec } from "alge";
import PlayerController from "../components/PlayerController";
import CameraTarget from "../components/CameraTarget";
const shipSprite = require('../../../public/assets/ship.png');
const crosshairSprite = require('../../../public/assets/crosshair.png');

export default class Player extends Entity {

	create() {
		this.transform.scale.scale(8 * this.engine.gameScale);
		this.transform.position.add(new Vec(100, 100));
		this.crosshairPos = Vec.from(this.transform.position);

		this.shipSprite = new Sprite(this, "ShipSprite", {
			src: shipSprite,
			layer: "Default",
		});
		this.addComponent(this.shipSprite);

		this.crosshairSprite = new Sprite(this, "ShipSprite", {
			src: crosshairSprite,
			layer: "Default",
			position: this.crosshairPos,
			angle: 0,
		});
		this.addComponent(this.crosshairSprite);

		this.addComponent(new CameraTarget(this, "CameraTarget"));

		this.controller = new PlayerController(this, "Controller", {
			crosshair : this.crosshairPos,
		});
		this.addComponent(this.controller);
	}

	setCrosshairPosition(pos) {
		this.crosshairSprite.properties["position"] = pos;
	}
}