// Data
const data = [
    { pigeons: 6, doves: 8, eagles: 15 },
    { pigeons: 9, doves: 15, eagles: 5 },
    { pigeons: 11, doves: 13, eagles: 14 },
    { pigeons: 15, doves: 4, eagles: 20 },
    { pigeons: 22, doves: 25, eagles: 23 },
]

const chart_width = 800;
const chart_height = 400;
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Stack Layout
const stack = d3.stack()
    .keys(['pigeons', 'doves', 'eagles']);

const stack_data = stack(data);

// Scales
const x_scale = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, chart_width])
    .paddingInner(0.05);

const y_scale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.pigeons + d.doves + d.eagles)])
    .range([chart_height, 0]);


// Create SVG Element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// Create Groups
const groups = svg.selectAll('g')
    .data(stack_data)
    .enter()
    .append('g')
    .attr('fill', d => color(d));

// Create Rectangles
groups.selectAll('rect')
    .data(d => d)
    .enter()
    .append('rect')
    .attr('x', (d, i) => x_scale(i))
    .attr('y', d => y_scale(d[1]))
    .attr('height', d => y_scale(d[0]) - y_scale(d[1]))
    .attr('width', x_scale.bandwidth());

// Create Labels
groups.selectAll('text')
    .data(d => d)
    .enter()
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('x', (d, i) => x_scale(i) + x_scale.bandwidth() / 2)
    .attr('y', d => (y_scale(d[0]) + y_scale(d[1])) / 2 + 7)
    .text(d => d[1] - d[0]);

