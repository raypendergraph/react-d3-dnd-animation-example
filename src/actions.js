export const collapseAction = nodeId => ({
  type: "TREE/COLLAPSE_NODE",
  payload: nodeId
});

export const expandAction = nodeId => ({
  type: "TREE/EXPAND_NODE",
  payload: nodeId
});

export const cutAction = id => ({
  type: "TREE/CUT_NODE",
  payload: id
});

export const pasteAction = (cutId, targetId) => ({
  type: "TREE/PASTE_NODE",
  payload: { cutId, targetId }
});
