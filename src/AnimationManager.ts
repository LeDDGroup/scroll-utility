export type EasingFunction = (
	currentStep: number,
	offsetValue: number,
	distance: number,
	totalSteps: number
) => number;

function maxMin(value: number, max: number, min: number = 0) {
	return Math.max(Math.min(value, max), min);
}

class Animation {
	constructor(
		public initialTime,
		public distance: number,
		public duration: number,
		public easing: EasingFunction
	);

	public getPosition(time) {
		const currentDuration = maxMin(time - this.initialTime, this.duration, 0);
		return easingFunction(currentDuration, 0, distance, duration);
	}

	get finalTime() {
		return this.intialTime + this.duration;
	}
}

export class AnimationManager {
	constructor(private setPosition);
	private animations: Animation[] = [];
	private previousTime: number = 0;
	public virtualPosition: number = 0;
	public finalPosition: number = 0;

	adjust(offset) {
		this.virtualPosition += offset;
		this.finalPosition += offset;
	}

	update(currentTime: number) {
		this.animations = this.animations.filter(animation => {
			this.virtualPosition +=
				anmation.getPosition(currentTime) -
				anmation.getPosition(this.previousTime);

			return currentTime < animation.finalTime;
		});

		this.previousTime = currentTime;
		this.setPosition(this.virtualPosition);
		return initialPosition;
	}

	animate(initialTime, distance, duration, easingFunction) {
		this.finalPosition += distance;
		const animation = new Animation(
			initialTime,
			distance,
			duration,
			easingFunction
		);
		this.animations.push(animation);
		return animation;
	}

	stop() {
		this.animations = [];
		this.finalPosition = this.virtualPosition;
	}
}
