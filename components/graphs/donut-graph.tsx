import React from 'react';
import * as d3 from 'd3';
import { WorkoutHistoryGraphModel } from '../../commonlib/models/WorkoutModel'
import { Svg, G, Path, Text as svgText } from 'react-native-svg';

interface GraphProps {
  graphData: WorkoutHistoryGraphModel[];
}

const donut: React.FC<GraphProps> = props => {
  const SVGHeight = 250;
  const SVGWidth = 250;
  const graphColor = d3.scaleOrdinal(d3['schemeDark2']);
  graphColor.domain(props.graphData.map((w: WorkoutHistoryGraphModel) => w.type));

  const sectionAngles = d3.pie().value((d: any) => d.frequency)(props.graphData);
  console.log('Section angles ', sectionAngles);
  const arcPath = d3.arc().outerRadius(100).innerRadius(60);

  return (
    <Svg width={SVGWidth} height={SVGHeight}>
      <G x={SVGWidth / 2} y={SVGHeight / 2}>
        {sectionAngles.map(section => (
          <Path
            key={section.index}
            d={arcPath(section)}
            stroke="#fff"
            fill={graphColor(section.data.type)}
            strokeWidth={3} />
        ))}
      </G>
    </Svg>
  )
};

export default donut;
