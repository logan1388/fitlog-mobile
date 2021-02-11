export const lineGraph = (lineGraphData, mode) => {
  const margin = { top: 75, right: 20, bottom: 50, left: 100 };
  const graphWidth = 900 - margin.left - margin.right;
  const graphHeight = 700 - margin.top - margin.bottom;

  const textColor = mode === 'light' ? 'black' : 'snow';

  d3.select('.canvas-line').selectAll('*').remove();
  const svg1 = d3
    .select('.canvas-line')
    .append('svg')
    .attr('width', graphWidth + margin.left + margin.right)
    .attr('height', graphHeight + margin.top + margin.bottom);

  const graph = svg1
    .append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const x = d3.scaleTime().range([0, graphWidth]);
  const y = d3.scaleLinear().range([graphHeight, 0]);

  const xAxisGroup = graph
    .append('g')
    .attr('class', 'x-axis')
    .attr('stroke', textColor)
    .attr('transform', `translate(0, ${graphHeight})`)
    .style('font-size', '24px');

  const yAxisGroup = graph.append('g').attr('class', 'y-axis').attr('stroke', textColor).style('font-size', '24px');

  xAxisGroup.selectAll('text').attr('transform', 'rotate(-40)').attr('text-anchor', 'end');

  x.domain(d3.extent(lineGraphData, d => new Date(d.date)));
  y.domain([0, d3.max(lineGraphData, d => d.weights)]);

  const line = d3
    .line()
    .x(function(d) {
      return x(new Date(d.date));
    })
    .y(function(d) {
      return y(d.weights);
    });

  const path = graph.append('path');
  path.data([lineGraphData]).attr('fill', 'none').attr('stroke', textColor).attr('stroke-width', 2).attr('d', line);

  const xAxis = d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat('%b %d'));

  const yAxis = d3.axisLeft(y).ticks(4);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  const circles = graph.selectAll('circle').data(lineGraphData);

  circles.exit().remove();

  circles.attr('cx', d => x(new Date(d.date))).attr('cy', d => y(d.weights));

  circles
    .enter()
    .append('circle')
    .attr('r', 4)
    .attr('cx', d => x(new Date(d.date)))
    .attr('cy', d => y(d.weights))
    .attr('fill', textColor);

  graph
    .selectAll('circle')
    .on('mouseover', (event, d) => {
      d3.select(event.currentTarget).transition().duration(100).attr('r', 8).attr('fill', textColor);
    })
    .on('mouseleave', (event, d) => {
      d3.select(event.currentTarget).transition().duration(100).attr('r', 4).attr('fill', textColor);
    });
};
