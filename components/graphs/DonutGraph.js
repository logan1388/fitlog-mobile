export const donutGraph = pieGraphData => {
  console.log('Inside donut-graph');
  const dims = { width: 750, height: 500, radius: 300 };
  const cent = { x: dims.width / 2, y: 350 };

  const svg = d3
    .select('.canvas-graph')
    .append('svg')
    .attr('width', dims.width + 150)
    .attr('height', dims.height + 150);

  const graph = svg.append('g').attr('transform', `translate(${cent.x}, ${cent.y})`);

  const pie = d3
    .pie()
    .sort(null)
    .value(d => d.frequency);

  const arcPath = d3
    .arc()
    .outerRadius(dims.radius)
    .innerRadius(dims.radius / 2 + 25);

  const color = d3.scaleOrdinal(d3['schemeCategory10']);
  color.domain(pieGraphData.map(d => d.type));

  const arcTweenEnter = d => {
    var i = d3.interpolate(d.endAngle, d.startAngle);

    return function (t) {
      d.startAngle = i(t);
      return arcPath(d);
    };
  };

  const legendGroup = svg
    .append('g')
    .attr('transform', `translate(${dims.width - 25}, 100)`)
    .attr('font-size', '2.5rem');

  const legend = d3.legendColor().shape('circle').shapePadding(10).scale(color).labelOffset(10);

  const paths = graph.selectAll('path').data(pie(pieGraphData));

  paths
    .enter()
    .append('path')
    .attr('d', arcPath)
    .attr('stroke', '#fff')
    .attr('stroke-width', 3)
    .attr('fill', d => color(d.data.type))
    .transition()
    .duration(600)
    .attrTween('d', arcTweenEnter);

  legendGroup.call(legend);
  //legendGroup.call(legendSizeLine);
  //legendGroup.selectAll('text').attr('fill', 'blue')
};
