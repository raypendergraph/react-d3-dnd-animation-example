import without from "lodash/fp/without";

const EMPTY_OBJECT = Object.freeze({});
/**
 * Calculates the state change when a node is moved from one parent to another
 */
export default ({ nodes }, { payload: id }) => {
  const { [id]: cutNode } = nodes;
  const parent = nodes[cutNode.parent];

  if (!(parent && id)) {
    return EMPTY_OBJECT;
  }

  return {
    nodes: {
      ...nodes,
      [parent.id]: {
        ...parent,
        children: without(id, parent.children)
      }
    }
  };
};
