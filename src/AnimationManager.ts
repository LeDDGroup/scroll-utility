export type EasingFunction = (
	currentStep: number,
	offsetValue: number,
	distance: number,
	totalSteps: number
) => number;

export function maxMin(value: number, max: number, min: number = 0) {
	return Math.max(Math.min(value, max), min);
}

class Animation {
	constructor(
		public initialTime,
		public distance: number,
		public duration: number,
		public easing: EasingFunction
	) {}

	public getPosition(time) {
		const currentDuration = maxMin(time - this.initialTime, this.duration, 0);
		return this.easing(currentDuration, 0, this.distance, this.duration);
	}

	get finalTime() {
		return this.initialTime + this.duration;
	}
}

export class AnimationManager {
	constructor(private setPosition) {}
	private animations: Animation[] = [];
	private previousTime: number = 0;
	public position: number = 0;
	public finalPosition: number = 0;

	adjust(offset) {
		this.position += offset;
		this.finalPosition += offset;
	}

	update(currentTime: number) {
		this.animations = this.animations.filter(animation => {
			this.position +=
				animation.getPosition(currentTime) -
				animation.getPosition(this.previousTime);

			return currentTime < animation.finalTime;
		});

		this.previousTime = currentTime;
		this.setPosition(this.position);
	}

	push(initialTime, distance, duration, easingFunction) {
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
		this.finalPosition = this.position;
	}
}
