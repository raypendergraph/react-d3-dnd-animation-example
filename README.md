# react-d3-dnd-animation-example

A minimal working example of using a completely React controlled, D3 application incorporating drag and drop with animation.

The live version is [here](https://raypendergraph.github.io/react-d3-dnd-animation-example/).

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
