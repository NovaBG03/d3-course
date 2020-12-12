// const data = [
//     [ 400, 200 ],
//     [ 210, 140 ],
//     [ 722, 300 ],
//     [ 70, 160 ],
//     [ 250, 50 ],
//     [ 110, 280 ],
//     [ 699, 225 ],
//     [ 90, 220 ],
// ];

const data = [
    { date: '07/01/2017', num: 20 },
    { date: '07/02/2017', num: 37 },
    { date: '07/03/2017', num: 25 },
    { date: '07/04/2017', num: 45 },
    { date: '07/05/2017', num: 23 },
    { date: '07/06/2017', num: 33 },
    { date: '07/07/2017', num: 49 },
    { date: '07/08/2017', num: 40 },
    { date: '07/09/2017', num: 36 },
    { date: '07/10/2017', num: 27 },
];

const chart_width = 800;
const chart_height = 400;
const padding = 50;

const time_format = d3.timeFormat('%b %e');
const time_parse = d3.timeParse('%m/%d/%Y');
data.forEach(d => d.date = time_parse(d.date));

// Creating SVG Element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', chart_width)
    .attr('height', chart_height);

// Create Scales
const x_scale = d3.scaleTime()
    .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
    .range([padding, chart_width - padding * 2]);

const y_scale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.num)])
    .range([chart_height - padding, padding]);

const r_scale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.num)])
    .range([0, 25])

// Create Circles
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => x_scale(d.date))
    .attr('cy', d => y_scale(d.num))
    .attr('r', d => r_scale(d.num))
    .attr('fill', '#d1ab0e');

// Create Labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => time_format(d.date))
    .attr('x', d => x_scale(d.date))
    .attr('y', d => y_scale(d.num));
