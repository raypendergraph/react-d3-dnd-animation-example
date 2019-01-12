import React from "react";
import { ReactSVGPanZoom, POSITION_LEFT } from "react-svg-pan-zoom";
import Tree from "./Tree";
import TreeNode from "./TreeNode";
import { compose } from "redux";
import { DragDropContext, DragLayer } from "react-dnd";
import MouseBackend from "react-dnd-mouse-backend";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";

class SvgCanvas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dragPreview: undefined
    };
  }
  setViewer = el => (this.viewer = el);

  componentDidMount() {
    var viewWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    this.viewer.pan(-(CANVAS_WIDTH - viewWidth) / 2, 0);
  }

  handleMouseMove = wrapped => {
    // we add and remove the callback in the render method so this
    // is not constantly called, only when dragging is occurring.
    const { SVGViewer, point } = wrapped;
    this.setState({
      dragPreview: {
        svg: SVGViewer,
        point
      }
    });
  };

  render() {
    const { isDragging, item } = this.props;
    const { dragPreview } = this.state;
    // ReactSVGPanZoom requires its one and only child be a real svg element
    // so this component always gets a little cumbersome. This component
    // is also a DragLayer monitor because of dragPreview. This allows the
    // drag preview to follow the mouse coordinates without redrawing the
    // entire tree. React DND using an HTML5 backend (react-dnd-html5-backend)
    // gives you a pretty good preview for free. Because we are using SVG components
    // we must use the MouseBackend and we have to do this manually.
    return (
      <ReactSVGPanZoom
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        SVGBackground={"white"}
        style={{ width: "100vw", height: "100vh" }}
        ref={this.setViewer}
        onMouseMove={isDragging ? this.handleMouseMove : undefined}
        toolbarPosition={POSITION_LEFT}
      >
        <svg className="canvas" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
          <Tree handleDoubleClick={this.handleNodeAction} />
          {dragPreview && item && (
            <TreeNode
              x={dragPreview.point.x}
              y={dragPreview.point.y}
              node={item.node}
              lerp={1}
            />
          )}
        </svg>
      </ReactSVGPanZoom>
    );
  }
}
export default compose(
  // Provides a context for the DnD stuff. We have to use the mouse backend
  // because of the SVG components.
  DragDropContext(MouseBackend),
  DragLayer(monitor => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging()
  }))
)(SvgCanvas);
