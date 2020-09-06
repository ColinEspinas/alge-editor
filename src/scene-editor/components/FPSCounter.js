import { Component, Text, Vec } from "alge";

export default class FPSCounter extends Component {
	
	create() {
		this.textComponent = new Text(this.parent, "FPSText", {
			content: "0",
			style: {fontFamily : 'arial', fontSize: 18, fill : 0xFFFFFF, align : 'left'},
			position: new Vec(0, 0),
			layer: "Debug"
		})
		this.parent.addComponent(this.textComponent);
		this.timer = 0;
		this.updateSpeed = 60;
	}

	init() {
		this.timer = this.updateSpeed;
		this.camera = this.parent.scene.getEntity("MainCamera");
	}

	update() {
		let position = new Vec(20, 20);
		this.textComponent.setPosition(position);
		if (this.timer <= 0) {
			
			this.textComponent.setText(Math.floor(this.engine.getManager("Time").fps));
			this.timer = this.updateSpeed;
		}
		--this.timer;
	}
}