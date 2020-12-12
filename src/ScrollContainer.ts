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
	animations: Animation[] = [];
	virtualPosition: number = 0;
	finalPosition: number = 0;
	previousTime: number = 0;

	public update = (currentTime: number) => {
		// function updateScroll(scrollContainer, scrollBy, scrollPosition) {
		// 	scrollContainer.update(currentTime);
		// 	const currentPosition = scrollContainer.virtualPosition;
		// 	scrollBy(currentPosition - scrollPosition);
		// }

		const currentPosition = this.getScrollPosition();
		const diff =
			Math.round(currentPosition) -
			Math.round(maxMin(this.virtualPosition, this.getScrollSize()));

		this.onScroll && this.onScroll(!!diff);

		this.animations = this.animations.filter(
			({ initialTime, duration, easingFunction, distance }) => {
				const getPosition = (time: number) => {
					const currentDuration = maxMin(time - initialTime, duration, 0);
					const offsetPosition = this.finalPosition - distance;
					return easingFunction(
						currentDuration,
						offsetPosition,
						distance,
						duration
					);
				};
				this.virtualPosition +=
					getPosition(currentTime) - getPosition(this.previousTime);
				this.previousTime = currentTime;
				return currentTime < duration + initialTime;
			}
		);
		this.scrollBy(this.virtualPosition - currentPosition);
		if (this.animations.length) {
			window.requestAnimationFrame(this.update);
		}
	};

	scrollTo(position, duration, easingFunction) {
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
	}

	stop() {
		this.animations = [];
		this.finalPosition = this.virtualPosition;
	}
}
