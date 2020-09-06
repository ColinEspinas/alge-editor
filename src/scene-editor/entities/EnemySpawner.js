import { Entity, Vec} from "alge";
import Enemy from "./Enemy";

export default class EnemySpawner extends Entity {

	create() {
		this.transform.scale.scale(8 * this.engine.gameScale);
		this.transform.position.add(new Vec(100, 100));
		this.enemies = [];
	}

	fixedUpdate() {
		if (Math.random() > 0.99) {
			let enemy = (this.engine.getManager("Scene")).getLoadedScene().addEntity(
				new Enemy("Enemy" + (this.enemies.length + 1), {
					position: new Vec(Math.random() * 2000 - 1000, Math.random() * 2000 - 1000),
					tags: ["Removable"]
				})
			);
			this.enemies.push(enemy);
		}
	}
}