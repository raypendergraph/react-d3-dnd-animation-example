# react-d3-dnd-animation-example

A minimal working example of using a completely React controlled, D3 application incorporating drag and drop with animation.

The live version is [here](https://raypendergraph.github.io/react-d3-dnd-animation-example/).

Blue nodes have children, double clicking a node expands or contracts it. Nodes
can be reordered by drag and drop.

## Why?

I was working on a React project which required that I write an interactive visualization/chart which the users could manipulate some hierarchical information. This was pretty straight forward using plain [D3](https://d3js.org/) but wasn't sure how this would work in React where it wants to own changes to the DOM.

So after researching it a bit it seems that what a lot of people do is use a React [ref](https://reactjs.org/docs/refs-and-the-dom.html) and just give D3 a section of the application to control and just tell React to leave it alone. I wasn't really satisfied with that and wondered if I could write something which somehow used D3 to do the layout and hand render the components in React.

Turns out in release 3.4.0, D3 split the library into several libraries. It also turns out that most of the libraries don't actually do anything with the DOM. So I can ask it to absractly construct a visualization (given my data) then I can interpret and render that layout. So, why do it this way. This way has some pros (and cons) which I will elaborate on below, but it's all React. And... because I can.

## Technologies used

- [React](https://reactjs.org) - for rendering the UI.
- [Redux](https://redux.js.org) - for state management. Probably overkill for this but I wanted it to be realistic.
- [react-dnd](https://github.com/react-dnd/react-dnd) - for drag and drop.
- [react-motion](https://github.com/chenglou/react-motion) - for animation goodness. C'mon, this is supposed to mimick D3-ness, right?
- [react-svg-pan-zoom](https://github.com/chrvadala/react-svg-pan-zoom) - to deal with navigating unknown sized trees and visualizations. This is a nice package and it just works.

## Pros

- Seamless integration with the rest of the app because you are rendering all the components all the way to the edge of the tree.
- The idea is that rendering SVG on the virtual DOM and some other performance enhancements like [memo](https://reactjs.org/docs/react-api.html#reactmemo) give one better performance than letting D3 mutate the DOM itself. I have not substantiated or tested this claim. Maybe that's a TODO.

# Cons

- Writing these components in React takes a little study and is a little tricky particularly when introducing these other technologies into the mix. I think this is mostly because you must be very aware of the performance implications and how each of the technologies (like DND and motion) affect this. Figuring out good separations and render boundaries can get challenging.
- This looks nothing like a D3 orchestration when it's all said and done. Someone who normally writes D3 visualizations would be totally lost so that's a loss.

## Notes

- For some visualizations this could be done using standard HTML5 and not SVG. The issue would be the connectors I think.
- Because this is using SVG, you loose browser support for a lot of the rich drag and drop APIs. Practically, this means that you have to replace the [HTML5 backend](https://react-dnd.github.io/react-dnd/docs/backends/html5) with the 3rd party [mouse backend](https://github.com/zyzo/react-dnd-mouse-backend). The biggest side effect of this I have found is that you loose the "for free" drag preview graphic the HTML5 backend generates for you. That's why we have to roll out own drag preview.
- The "move node" action has to be split up into two subsequent (across ticks) dispatch calls. This is becasue the dragged nodes have to cycle back through redux as removed so they can be marked as transitioning out, then the nodes can be reintroduced. Otherwise duplicately identified nodes show up. Bad.

## TODO

- I would like to try some other drag and drop and maybe animation frameworks.
- Performance metrics.
- Radial tree.
