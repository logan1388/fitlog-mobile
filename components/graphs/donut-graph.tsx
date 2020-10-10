import React from 'react';
import * as d3 from 'd3';
import { WorkoutHistoryGraphModel } from '../../commonlib/models/WorkoutModel';
import { Svg, G, Path, Text } from 'react-native-svg';
import { Animated } from 'react-native';

interface GraphProps {
  graphData: WorkoutHistoryGraphModel[];
}

const donut: React.FC<GraphProps> = props => {
  // const animated = React.useRef(new Animated.Value(0)).current;
  // const animation = (toValue: any) => {
  //   return Animated.timing(animated, {
  //     toValue,
  //     delay: 1000,
  //     duration: 10000,
  //     useNativeDriver: true,
  //   }).start();
  // };
  const SVGHeight = 250;
  const SVGWidth = 250;
  const graphColor = d3.scaleOrdinal(d3['schemeDark2']);
  graphColor.domain(props.graphData.map((w: WorkoutHistoryGraphModel) => w.type));

  const sectionAngles = d3.pie().value((d: any) => d.frequency)(props.graphData);
  const arcPath = d3.arc().outerRadius(100).innerRadius(60);

  return (
    <Svg width={350} height={SVGHeight}>
      <G x={SVGWidth / 2} y={SVGHeight / 2}>
        {sectionAngles.map(section => (
          <Path
            key={section.index}
            d={arcPath(section)}
            stroke="#fff"
            fill={graphColor(section.data.type)}
            strokeWidth={3}
          />
        ))}
      </G>
      <G fill="none">
        {props.graphData.map((name, i) => (
          <Text
            key={i}
            fill={graphColor(name.type)}
            stroke={graphColor(name.type)}
            fontSize="15"
            x={250}
            y={75 + i * 25}>
            {name.type}
          </Text>
        ))}
      </G>
    </Svg>
  );
};

export default donut;
