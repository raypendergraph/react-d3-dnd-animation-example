import { createSelector } from "reselect";
import {
  calculateExpand,
  calculateCollapse,
  calculateCut,
  calculatePaste,
  reconstituteTree
} from "./functions";

export default (state = {}, action) => {
  let changes;
  switch (action.type) {
    default:
      return state;

    case "TREE/EXPAND_NODE":
      changes = calculateExpand(state, action);
      break;

    case "TREE/COLLAPSE_NODE":
      changes = calculateCollapse(state, action);
      break;

    case "TREE/CUT_NODE":
      changes = calculateCut(state, action);
      break;

    case "TREE/PASTE_NODE":
      changes = calculatePaste(state, action);
      break;
  }
  return { ...state, ...changes };
};

export const getNodesById = localState => localState.nodes;
export const getRootId = createSelector(
  [getNodesById],
  map => map["_root"]
);
export const getTree = createSelector(
  [getNodesById, getRootId],
  (nodes, root) => reconstituteTree(nodes, root)
);
