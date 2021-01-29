import React from "react";
import { Scroller } from "scroll-utility";

const Container = React.forwardRef(({ height, ...props }, ref) => (
	<div
		id="container"
		style={{
			height: `${height}px`,
			overflow: "auto",
			position: "relative"
		}}
		{...props}
		ref={ref}
	/>
));

const InnerElement = React.forwardRef((props, ref) => (
	<div
		style={{
			position: "absolute",
			top: "525px",
			left: "50%",
			transform: "translate(-50%, -50%)",
			height: "75%",
			width: "75%",
			background: "grey",
			borderTop: "25px solid black"
		}}
		{...props}
		ref={ref}
	/>
));

function Content({ count, scrollDistance }) {
	return Array.from({ length: count }).map((_, i) => (
		<div
			style={{
				height: `${scrollDistance / 2 - 1}px`,
				opacity: i % 2 ? 0.5 : 1,
				borderTop: "solid 1px grey"
			}}
			key={i}
		>
			{(i * scrollDistance) / 2}px
		</div>
	));
}

export function usePlayground() {
	// constants:
	const scrollSize = 1000;
	const height = 200;
	const scrollDistance = 150;
	const lineCount = Math.round((scrollSize / scrollDistance) * 2);

	const [finalPosition, setFinalPosition] = React.useState(0);
	const [scrollPosition, setScrollPosition] = React.useState(0);
	const [externalCount, setExternalCount] = React.useState(0);

	// scroller react setup
	const scroller = React.useMemo(
		() =>
			new Scroller(window, {
				onScroll: ({ current, external }) => {
					setScrollPosition(current);
					if (external) {
						setExternalCount(p => p + 1);
					}
				}
			}),
		[]
	);
	const scrollContainerRef = React.useRef();
	React.useEffect(() => {
		scroller.element = scrollContainerRef.current;
	}, []);

	const innerElementRef = React.useRef();

	// content
	const container = (
		<Container height={height} ref={scrollContainerRef}>
			<Content count={lineCount} scrollDistance={scrollDistance} />
			<InnerElement ref={innerElementRef} />
		</Container>
	);

	return [
		scroller,
		container,
		innerElementRef.current,
		scrollDistance,
		scrollPosition,
		externalCount
	];
}
