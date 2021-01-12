// Data
const data = [ 25, 25, 25, 25 ]
const chart_width = 600;
const chart_height = 600;

const colors = d3.scaleOrdinal(d3.schemeCategory10);
const pie = d3.pie();

const outer_radius = chart_width / 2;
const inner_radius = 0;

const arc = d3.arc()
    .outerRadius(outer_radius)
    .innerRadius(inner_radius);

// Create SVG Element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// Groups
const arcs = svg
    .selectAll('g.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .attr('transform', `translate(${chart_width / 2}, ${chart_height / 2})`);

// Arcs
arcs.append('path')
    .attr('fill', (d, i) => colors(i))
    .attr('d', arc);

// Labels
arcs.append('text')
    .text(d => d.data)
    .attr('text-anchor', 'middle')
    .attr('transform', d => `translate(${arc.centroid(d)})`);
