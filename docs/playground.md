---
name: Playground
---
import { Playground } from 'docz'
import { distTo } from "scroll-utility";
import { usePlayground } from './usePlayground'

# Playground

<Playground>
{() => {
	const [scroller, playground, innerElement, scrollDistance] = usePlayground();
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
			<button onClick={() => console.log(scroller.getTop(distTo(innerElement)))}>
				get top dist to center element
			</button>
			{playground}
		</>
	);
}}
</Playground>
