import uniq from "lodash/fp/uniq";
const EMPTY_OBJECT = Object.freeze({});
/**
 * Calculates the state change when a node is moved from one parent to another
 */
export default ({ nodes }, { payload: { cutId, targetId } }) => {
  const { [cutId]: cutNode } = nodes;
  const parent = nodes[targetId];

  if (!(parent && cutId)) {
    return EMPTY_OBJECT;
  }

  return {
    nodes: {
      ...nodes,
      [cutId]: { ...cutNode, parent: targetId },
      [targetId]: {
        ...parent,
        children: uniq([...parent.children, cutId])
      }
    }
  };
};
