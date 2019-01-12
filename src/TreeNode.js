import React from "react";
import * as consts from "./constants";
import size from "lodash/fp/size";
import classNames from "classnames/bind";
import flow from "lodash/fp/flow";
import { DragSource, DropTarget } from "react-dnd";
import targetSpec from "./targetSpec";
import sourceSpec from "./sourceSpec";

const targetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

const sourceCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});
/**
 * The view for the standard node. This component is memoized
 * because it should really never change except unless it's childless
 * and a child is added or has children that are all removed. Most
 * of the location and other stuff is handled by TreeNode
 */
const StandardNode = React.memo(({ text, hasChildren }) => (
  <>
    <ellipse
      className={classNames({
        "has-child": hasChildren,
        "node-body": true
      })}
      ry={consts.NODE_HEIGHT / 2}
      rx={consts.NODE_WIDTH / 2}
    />
    <rect
      className="node-txt-background"
      x="-1.2%"
      y="-.25%"
      width={consts.NODE_WIDTH}
    />
    <text lengthAdjust="spacing" className="node-txt">
      <tspan textAnchor="middle" alignmentBaseline="middle">
        {text}
      </tspan>
    </text>
  </>
));
const DraggedNode = React.memo(() => (
  <ellipse
    className="node-dragging"
    ry={consts.NODE_HEIGHT / 2}
    rx={consts.NODE_WIDTH / 2}
  />
));

const hasChildren = node => {
  return size(node.children) + size(node._children) > 0;
};

/**
 *
 * The TreeNode is a heavy, pure wrapper around a simple fragment of SVG which
 * adds drag and drop function and also translates the memoized SVG around
 * the canvas (when being animated). Splitting the memoized SVG from the wrapper
 * allows us to essentially just change the translation and style attributes of th
 * surrounding group to change the nodes.
 *
 * @param {*} param0
 */
const TreeNode = ({
  x,
  y,
  node,
  lerp,
  isDragged = false,
  handleDoubleClick,
  connectDragSource,
  connectDropTarget
}) => {
  return connectDropTarget(
    connectDragSource(
      <g
        id={node.id}
        onDoubleClick={handleDoubleClick}
        data-nodeid={`${node.id}`}
        data-isopen={node.isExpanded}
        opacity={lerp}
        transform={`translate(${x},${y}) scale(${lerp})`}
      >
        {isDragged ? (
          <DraggedNode />
        ) : (
          <StandardNode text={node.name} hasChildren={hasChildren(node)} />
        )}
      </g>
    )
  );
};

export default flow(
  DragSource("node", sourceSpec, sourceCollector),
  DropTarget("node", targetSpec, targetCollector)
)(TreeNode);
