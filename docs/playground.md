---
name: Playground
---
import { Playground } from 'docz'
import { getOffset, getDiff, getRelativePosition } from "scroll-utility";
import { usePlayground } from './usePlayground'

# Playground

<Playground>
{() => {
	const [scroller, playground, innerElement, scrollDistance] = usePlayground();
	const get = (fn) => fn(scroller.element, innerElement);
	return (
		<>
			<button onClick={() => (scroller.top -= scrollDistance)}>
				scroll {scrollDistance} up
			</button>
			<button onClick={() => (scroller.top += scrollDistance)}>
				scroll {scrollDistance} down
			</button>
			<button onClick={() => (scroller.top += scroller.getTop(distTo(innerElement)))}>
				center element
			</button>
			<button onClick={() => console.log({
				offset: get(getOffset),
				diff: get(getDiff),
				relativePosition: get(getRelativePosition),
			})}>
				get top dist to center element
			</button>
			{playground}
		</>
	);
}}
</Playground>
