import constant from "lodash/fp/constant";
import size from "lodash/fp/size";
import times from "lodash/fp/times";
import zip from "lodash/fp/zip";
import map from "lodash/fp/map";
/**
 * Takes the recursive, structured representation of the tree and turns it
 * into a shallow map by node id with references to child ids. It's really
 * more beneficial to store it in redux in this manner for several reasons.
 */
export default root => {
  const mapping = { _root: root.id };
  let queue = [[undefined, root]];
  let value = undefined;
  const childTuples = (id, array) =>
    zip(times(constant(id), size(array)), array);

  while ((value = queue.pop())) {
    const [parent, { id, _children, children, ...rest }] = value;
    if (size(children) > 0) {
      queue = [...queue, ...childTuples(id, children)];
    } else if (size(_children > 0)) {
      queue = [...queue, ...childTuples(id, _children)];
    }

    mapping[id] = {
      ...rest,
      id,
      parent,
      isExpanded: children ? size(children) > 0 : false,
      children: map("id", children),
      _children: map("id", _children)
    };
  }

  return mapping;
};
