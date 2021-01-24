export type EasingFunction = (
	currentStep: number,
	offsetValue: number,
	distance: number,
	totalSteps: number
) => number;

function maxMin(value: number, max: number, min: number = 0) {
	return Math.max(Math.min(value, max), min);
}

interface Animation {
	initialTime: number;
	duration: number;
	easingFunction: EasingFunction;
	distance: number;
}

export class ScrollContainer {
	constructor(
		private getScrollPosition,
		private getScrollSize,
		private scrollBy,
		private onScroll
	) {}
	private animations: Animation[] = [];
	private virtualPosition: number = 0;
	private finalPosition: number = 0;
	private previousTime: number = 0;

	public getFinalPosition() {
		if (this.animations.length === 0) {
			return this.getScrollPosition();
		}
		return this.finalPosition;
	}

	public update = (currentTime: number) => {
		const currentPosition = this.getScrollPosition();
		const diff =
			Math.round(currentPosition) -
			Math.round(maxMin(this.virtualPosition, this.getScrollSize()));

		this.onScroll && this.onScroll(!!diff);
		this.virtualPosition += diff;
		this.finalPosition += diff;

		this.animations = this.animations.filter(
			({ initialTime, duration, easingFunction, distance }) => {
				const getPosition = (time: number) => {
					const currentDuration = maxMin(time - initialTime, duration, 0);
					return easingFunction(currentDuration, 0, distance, duration);
				};
				this.virtualPosition +=
					getPosition(currentTime) - getPosition(this.previousTime);
				return currentTime < duration + initialTime;
			}
		);
		this.previousTime = currentTime;

		this.scrollBy(Math.round(this.virtualPosition - currentPosition));

		if (this.animations.length) {
			window.requestAnimationFrame(this.update);
		}
	};

	scrollTo(positionToScroll, duration, easingFunction) {
		if (this.animations.length === 0) {
			this.virtualPosition = this.getScrollPosition();
			this.finalPosition = this.virtualPosition;
		}
		const position = maxMin(positionToScroll, this.getScrollSize());
		const distance = position - this.finalPosition;
		const initialTime = performance.now();
		this.finalPosition += distance;

		const value = maxMin(
			distance,
			this.getScrollSize() - this.getScrollPosition(),
			-this.getScrollPosition()
		);

		const animation: Animation = {
			initialTime,
			duration,
			easingFunction,
			distance: value
		};

		this.animations.push(animation);
		if (this.animations.length === 1) {
			this.update(initialTime);
		}
	}

	stop() {
		this.animations = [];
		this.finalPosition = this.virtualPosition;
	}
}
