import { Component, Vec } from "alge";

export default class CameraTarget extends Component {
	
	create() {
		this.camera = null;
	}

	init() {
		this.camera = this.parent.scene.getEntity("MainCamera");

		this.camera.target = {
			entity: this.parent,
			options: {
				duration: 0.05,
				centered: true,
				offset: new Vec(this.parent.transform.scale.x / 2, this.parent.transform.scale.y / 2)
			},
			horizontal: true,
			vertical: true,
		};
	}
}