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
    // Here we dispatch the move in two parts. This is because
    // if we perform the entire move in the same tick then
    // the TransitionMotion will be unaware a part of the graph
    // has been removed before drawing the same nodes under a different
    // parent causing key issues. This prevents that.
    store.dispatch(cutAction(cutId));
    setTimeout(() => {
      store.dispatch(pasteAction(cutId, targetId));
    }, 0);
  }
};
