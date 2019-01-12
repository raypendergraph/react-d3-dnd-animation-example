import * as d3 from "d3";

export const CANVAS_HEIGHT = 5000;
export const CANVAS_WIDTH = 5000;
export const VERTICAL_SPACING = 75;
export const HORIZONTAL_SPACING = 30;
export const NODE_HEIGHT = 65;
export const NODE_WIDTH = 125;
export const tree = d3
  .tree()
  .size([CANVAS_HEIGHT, CANVAS_WIDTH])
  .nodeSize([NODE_WIDTH + HORIZONTAL_SPACING, NODE_HEIGHT + VERTICAL_SPACING]);
