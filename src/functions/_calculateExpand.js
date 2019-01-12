import get from "lodash/fp/get";
import size from "lodash/fp/size";

const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});

/**
 * Calculates store deltas for an expand action
 */
export default ({ nodes }, { payload: id }) => {
  const node = get(id, nodes);
  const children = node._children;
  if (node.isExpanded || size(children) === 0) {
    return EMPTY_OBJECT;
  }
  return {
    nodes: {
      ...nodes,
      [id]: { ...node, children, _children: EMPTY_ARRAY, isExpanded: true }
    }
  };
};
