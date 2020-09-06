import { Entity } from "alge";
import FPSCounter from "../components/FPSCounter";

export default class Hud extends Entity {

	create() {
		let fpscounter = new FPSCounter(this, "FPSCounter");
		this.addComponent(fpscounter);
	}
}