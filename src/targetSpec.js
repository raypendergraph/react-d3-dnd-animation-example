import store from "./store";
import { cutAction, pasteAction } from "./actions";

export default {
  drop(props, monitor, component) {
    //because each node is both a source and a target.
    if (props.node.id === monitor.getItem().node.id) {
      return;
    }
    const cutId = monitor.getItem().node.id;
    const targetId = props.node.id;
    store.dispatch(cutAction(cutId));
    setTimeout(() => {
      store.dispatch(pasteAction(cutId, targetId));
    }, 0);
  }
};
