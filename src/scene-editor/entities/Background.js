import { Entity, Vec } from "alge";

export default class Background extends Entity {

	create() {

		this.transform.position.add(new Vec(0, 300));

		(document.querySelector(this.engine.container)).style.backgroundColor = "black";
	}
}