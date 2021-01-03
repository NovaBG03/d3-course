let data = [
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

// Create Axis
const x_axis = d3.axisBottom(x_scale);

svg.append('g')
    .call(x_axis)
    .classed('axis', true)
    .classed('x-axis', true)
    .attr('transform', `translate(0, ${chart_height - padding})`);

const y_axis = d3.axisLeft(y_scale)
    .ticks(5);

svg.append('g')
    .call(y_axis)
    .classed('axis', true)
    .classed('y-axis', true)
    .attr('transform', `translate(${padding}, 0)`);

// Create ClipPath
svg.append('clipPath')
    .attr('id', 'plot-area-clip-path')
    .append('rect')
    .attr('x', padding)
    .attr('y', padding)
    .attr('width', chart_width - padding * 3)
    .attr('height', chart_height - padding * 2);

// Create Circles
svg.append('g')
    .attr('id', 'plot-area')
    .attr('clip-path', 'url(#plot-area-clip-path)')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => x_scale(d[0]))
    .attr('cy', d => y_scale(d[1]))
    .attr('r', 15)
    .attr('fill', '#d1ab0e');

// Events
d3.select('button')
    .on('click', () => {
        // Create Random data
        data = [];
        let max_num = Math.random() * 1000;
        for (let i = 0; i < 8; i++) {
            let x = Math.floor(Math.random() * max_num);
            let y = Math.floor(Math.random() * max_num);
            data.push([ x, y ]);
        }

        // Update scales
        x_scale.domain([0, d3.max(data, d => d[0])]);
        y_scale.domain([0, d3.max(data, d => d[1])])

        const colors = ['#f26d6d', '#1e6190', '#7559d9', '#d1ab03']
        const color_index = Math.floor(Math.random() * colors.length);

        svg.selectAll('circle')
            .data(data)
            .transition()
            .on('start', () => console.log('Moving Circle!'))
            .duration(1000)
            .attr('cx', d => x_scale(d[0]))
            .attr('cy', d => y_scale(d[1]))
            .on('end', () => console.log('Circle Moved!'))
            .transition()
            .attr('fill', colors[color_index]);

        // Update Axis
        svg.select('.x-axis')
            .transition()
            .duration(1000)
            .call(x_axis);

        svg.select('.y-axis')
            .transition()
            .duration(1000)
            .call(y_axis);
    });
