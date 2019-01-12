import map from "lodash/fp/map";
import filter from "lodash/fp/filter";

const exists = v => !!v;

/**
 * Reconstitutes a normalized tree into a recursive, structured
 * representation which D3 consumes.
 *
 * @param {*} normalizedTree
 * @param {*} rootId
 */
const makeTree = (normalizedTree, rootId) => {
  const f = node => {
    if (!node) {
      return undefined;
    }

    const { _children, children, ...rest } = node;
    return {
      ...rest,
      _children: filter(
        exists,
        map(id => makeTree(normalizedTree, id), _children)
      ),
      children: filter(
        exists,
        map(id => makeTree(normalizedTree, id), children)
      )
    };
  };

  return f(normalizedTree[rootId]);
};

export default makeTree;
