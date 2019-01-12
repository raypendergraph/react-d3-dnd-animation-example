import flatMap from "lodash/fp/flatMap";
import reject from "lodash/fp/reject";
import get from "lodash/fp/get";
import reduce from "lodash/fp/reduce";
import size from "lodash/fp/size";
import isUndefined from "lodash/fp/isUndefined";

const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});

const collapse = node => ({
  ...node,
  isExpanded: false,
  _children: node.children,
  children: EMPTY_ARRAY
});

/**
 * Calculates store deltas for an collapse action.
 */
export default ({ nodes }, { payload: id }) => {
  const recur = nodeId => {
    const node = get(nodeId, nodes);
    const { children } = node;
    if (!node.isExpanded || size(node.children) === 0) {
      return EMPTY_OBJECT;
    }

    return [collapse(node), ...reject(isUndefined, flatMap(recur, children))];
  };

  return {
    nodes: {
      ...nodes,
      isExpanded: false,
      ...reduce((r, v) => ({ ...r, [v.id]: v }), EMPTY_OBJECT, recur(id))
    }
  };
};
