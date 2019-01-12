import * as d3 from "d3";
import React from "react";
import LinkGroup from "./LinkGroup";
import NodeGroup from "./NodeGroup";
import { tree, NODE_HEIGHT, CANVAS_WIDTH } from "./constants";
import { getTree } from "./reducer";
import { connect } from "react-redux";
import { collapseAction, expandAction } from "./actions";

const TreeView = ({ root, layout, handleDoubleClick }) => {
  const translation = `translate(${CANVAS_WIDTH / 2},${NODE_HEIGHT})`;
  return (
    <>
      <LinkGroup key="links" transform={translation} links={root.links()} />
      <NodeGroup
        key="nodes"
        transform={translation}
        nodes={layout.descendants()}
        handleDoubleClick={handleDoubleClick}
      />
    </>
  );
};

/**
 * This component is where the layout for the treedata is calculated
 * using D3 and passed into the tree structure. A move causes the tree
 * data to change causing this to redraw.
 */
class Tree extends React.PureComponent {
  /**
   * Double clicking a node causes it to expand or collapse.
   */
  handleDoubleClick = e => {
    e.stopPropagation();
    const elementData = e.currentTarget.dataset;
    const id = elementData["nodeid"];
    const isOpen = elementData["isopen"];
    if (!id || isOpen === undefined) {
      return;
    }

    if (isOpen === "true") {
      this.props.collapse(id);
    } else {
      this.props.expand(id);
    }
  };

  render() {
    const { treeData } = this.props;
    const root = d3.hierarchy(treeData, d => d.children);
    const layout = tree(root);
    return (
      <TreeView
        root={root}
        layout={layout}
        handleDoubleClick={this.handleDoubleClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    treeData: getTree(state)
  };
};

const mapDispatchToProps = dispatch => ({
  collapse: nodeId => dispatch(collapseAction(nodeId)),
  expand: nodeId => dispatch(expandAction(nodeId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tree);
