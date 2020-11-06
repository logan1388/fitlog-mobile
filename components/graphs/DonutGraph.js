export const donutGraph = pieGraphData => {
    console.log('Inside donut-graph');
    const dims = { width: 300, height: 300, radius: 150 };
    const cent = { x: (dims.width / 2 + 5), y: (dims.height / 2 + 5) };

    const svg = d3.select('.canvas-graph')
        .append('svg')
        .attr('width', dims.width + 150)
        .attr('height', dims.height + 150);

    const graph = svg.append('g')
        .attr('transform', `translate(${cent.x}, ${cent.y})`);

    const pie = d3.pie()
        .sort(null)
        .value(d => d.frequency);

    const arcPath = d3.arc()
        .outerRadius(dims.radius)
        .innerRadius(dims.radius / 2);

    const color = d3.scaleOrdinal(d3['schemeCategory10']);
    color.domain(pieGraphData.map(d => d.type));

    const arcTweenEnter = d => {
        var i = d3.interpolate(d.endAngle, d.startAngle);

        return function(t) {
            d.startAngle = i(t);
            return arcPath(d);
        }
    };

    const legendGroup = svg.append('g')
        .attr('transform', `translate(${dims.width + 40}, 30)`);
    const legend = d3.legendColor()
        .shape('circle')
        .shapePadding(10)
        .scale(color);

    const paths = graph.selectAll('path')
        .data(pie(pieGraphData));

    paths.enter()
        .append('path')
        .attr('d', arcPath)
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
        .attr('fill', d => color(d.data.type))
        .transition().duration(600)
        .attrTween('d', arcTweenEnter);

    legendGroup.call(legend);
    //legendGroup.selectAll('text').attr('fill', 'blue')
}
