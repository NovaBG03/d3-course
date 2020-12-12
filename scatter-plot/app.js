const data = [
    [400, 200],
    [210, 140],
    [722, 300],
    [70, 160],
    [250, 50],
    [110, 280],
    [699, 225],
    [90, 220],
];

const chart_width = 800;
const chart_height = 400;
const padding = 50;

const time_parse = d3.timeParse('%m/%d/%Y');
data.forEach(d => d.data = time_parse(d.data));

// Creating SVG Element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// Create Scales
const x_scale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[0])])
    .range([padding, chart_width - padding * 2]);

const y_scale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[1])])
    .range([chart_height - padding, padding]);

const r_scale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d[1])])
    .range([0, 25])

// Create Axis
const x_axis = d3.axisBottom(x_scale);
svg.append('g')
    .call(x_axis)
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${chart_height - padding})`);

const y_axis = d3.axisLeft(y_scale)
    .ticks(5);
    // .tickFormat(d => d + '%');
svg.append('g')
    .call(y_axis)
    .attr('class', 'axis')
    .attr('transform', `translate(${padding}, 0)`);

// Create Circles
svg.append('g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => x_scale(d[0]))
    .attr('cy', d => y_scale(d[1]))
    .attr('r', d => r_scale(d[1]))
    .attr('fill', '#d1ab0e');

// Create Labels
svg.append('g')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d.join(','))
    .attr('x', d => x_scale(d[0]))
    .attr('y', d => y_scale(d[1]));
