import map from "lodash/fp/map";
import TreeNode from "./TreeNode";
import { TransitionMotion, spring, presets } from "react-motion";
import React from "react";
import { DragLayer } from "react-dnd";

const willEnter = style => {
  console.log("entering -> ", style.key);
  const {
    data: { parent }
  } = style;
  //start life on expand at your parent's coordinates (root starts at 0,0).
  const [x, y] = parent ? [parent.x, parent.y] : [0, 0];
  return { x, y, lerp: 0.0, isEntering: 1, isLeaving: 0 };
};

const willLeave = style => {
  console.log("leaving -> ", style.key);
  const {
    data: { parent }
  } = style;
  //end life back at your parent's coordinates.
  const [x, y] = parent ? [parent.x, parent.y] : [0, 0];
  return {
    x: spring(x, presets.gentle),
    y: spring(y, presets.gentle),
    // generic lerp sequence used for whatever: opacity, scale, etc.
    lerp: spring(0, presets.gentle),
    isEntering: 0,
    isLeaving: 1
  };
};
const toStyle = node => {
  return {
    data: { ...node.data, parent: node.parent },
    key: node.data.id,
    // eventually get to your coordinates specified by D3 (from the parent)
    // and lerp of 1.0.
    style: {
      x: spring(node.x, presets.gentle),
      y: spring(node.y, presets.gentle),
      lerp: spring(1, presets.gentle),
      isEntering: 0,
      isLeaving: 0
    }
  };
};
/**
 * The main reason for this component is to introduce a list component to
 * implement the animations.
 *
 *
 * When a drag occurs, identical nodes show up in the TransitionMotion
 * component which obviously causes problems. To prevent this, nodes which
 * are being transitioned off or on get a flag in their keys. This allows
 * the same node to be "coming off" and "going on".
 * @param {*} param0
 */
const NodeGroup = ({ nodes, handleDoubleClick, item, isDragging, ...rest }) => (
  <TransitionMotion
    willEnter={willEnter}
    willLeave={willLeave}
    styles={map(toStyle, nodes)}
  >
    {interpolated => (
      <g {...rest}>
        {map(
          ({ style: { x, y, lerp, isEntering, isLeaving }, key, data }) => (
            <TreeNode
              x={x}
              y={y}
              lerp={lerp}
              key={isEntering ? `E-${key}` : isLeaving ? `L-${key}` : key}
              node={data}
              isDragged={isDragging && item.node.id === key}
              handleDoubleClick={handleDoubleClick}
            />
          ),
          interpolated
        )}
      </g>
    )}
  </TransitionMotion>
);

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  isDragging: monitor.isDragging()
}))(NodeGroup);
