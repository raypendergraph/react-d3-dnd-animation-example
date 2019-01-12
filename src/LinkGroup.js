import React from "react";
import { presets, spring, TransitionMotion } from "react-motion";
import map from "lodash/fp/map";

const toStyle = ({ source, target }) => {
  return {
    key: `${source.data.id}->${target.data.id}`,
    data: { source, target },
    //final style is a line between source and target
    style: {
      sourceX: source.x,
      sourceY: source.y,
      targetX: spring(target.x, presets.gentle),
      targetY: spring(target.y, presets.gentle),
      lerp: spring(1, presets.gentle),
      isEntering: 0,
      isLeaving: 0
    }
  };
};

const willEnter = ({ data: { source } }) => ({
  // Life starts as a point at source.x, source.y
  sourceX: source.x,
  sourceY: source.y,
  targetX: source.x,
  targetY: source.y,
  lerp: 0,
  isEntering: 1,
  isLeaving: 0
});

const willLeave = ({ data: { source } }) => ({
  // Life ends (eventually) back as a point at source.x, source.y
  sourceX: source.x,
  sourceY: source.y,
  targetX: spring(source.x, presets.stiff),
  targetY: spring(source.y, presets.stiff),
  lerp: spring(0, presets.stiff),
  isEntering: 0,
  isLeaving: 1
});
/**
 * The main reason for this group is to animate the list of links
 * (the link group) when things change on the tree. I used line
 * here for simplicity but some really nice charts can be made using
 * path too.
 */
export default ({ links, ...rest }) => {
  return (
    <TransitionMotion
      willEnter={willEnter}
      willLeave={willLeave}
      styles={map(toStyle, links)}
    >
      {interpolated => (
        <g className="link" {...rest}>
          {map(
            ({
              style: {
                lerp,
                sourceX,
                sourceY,
                targetX,
                targetY,
                isEntering,
                isLeaving
              },
              key
            }) => (
              <line
                key={isEntering ? `E-${key}` : isLeaving ? `L-${key}` : key}
                opacity={lerp}
                className="link"
                x1={sourceX}
                y1={sourceY}
                x2={targetX}
                y2={targetY}
              />
            ),
            interpolated
          )}
        </g>
      )}
    </TransitionMotion>
  );
};
