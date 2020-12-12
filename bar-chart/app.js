const data = [];

for (let i = 0; i < 20; i++) {
    let number = Math.floor(d3.randomUniform(1, 50)());
    data.push(number);
}

const chart_height = 400;
const char_width = 800;
const bar_padding = 5;

// Creating SVG
const svg = d3.select('#chart')
    .append('svg')
    .attr('height', chart_height)
    .attr('width', char_width);

// Binding Data and Creating Cols
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * (char_width / data.length))
    .attr('y', d => chart_height - (d / 50 * chart_height))
    .attr('width', char_width / data.length - bar_padding)
    .attr('height', d => d / 50 * chart_height)
    .attr('fill', '#7ed26d');

// Create labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', (d, i) => i * (char_width / data.length) + (char_width / data.length - bar_padding) / 2)
    .attr('y', d => chart_height - (d / 50 * chart_height) + 15)
    .attr('font-size', 14)
    .attr('fill', "#fff")
    .attr('text-anchor', 'middle');
