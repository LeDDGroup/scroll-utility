---
name: React Example
---
import { Playground, Props } from 'docz'
import Scroller from 'scroll-utility'

# Playground

<Playground>
{() => {
	// constants:
	const scrollSize = 1000;
	const height = 200;
	const scrollDistance = 50;
	const lineCount = Math.round((scrollSize / scrollDistance) * 2);
	// scroller react setup
	const scroller = React.useMemo(() => new Scroller(), []);
	const scrollContainerRef = React.useRef();
	React.useEffect(() => {
		scroller.element = scrollContainerRef.current;
	}, []);
	// actions
	const buttonUp = (
		<button onClick={() => (scroller.top -= scrollDistance)}>
			scroll {scrollDistance} up
		</button>
	);
	const buttonDown = (
		<button onClick={() => (scroller.top += scrollDistance)}>
			scroll {scrollDistance} down
		</button>
	);
	// content
	const content = Array.from({ length: lineCount }).map((_, i) => (
		<div
			style={{
				height: `${scrollDistance / 2 - 1}px`,
				opacity: i % 2 ? 0.5 : 1,
				borderTop: "solid 1px grey"
			}}
		>
			{(i * scrollDistance) / 2}px
		</div>
	));
	return (
		<>
			{buttonUp}
			{buttonDown}
			<div
				ref={scrollContainerRef}
				id="container"
				style={{
					height: `${height}px`,
					overflow: "auto",
					position: "relative"
				}}
			>
				{content}
			</div>
		</>
	);
}}
</Playground>
