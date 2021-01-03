const data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

let sort_flag = false;

const chart_height = 400;
const chart_width = 800;

// Creating SVG
const svg = d3.select('#chart')
    .append('svg')
    .attr('height', chart_height)
    .attr('width', chart_width);

// Create Scales
const x_scale = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, chart_width])
    .paddingInner(0.05);

const y_scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([chart_height, 0]);

// Binding Data and Creating Cols
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => x_scale(i))
    .attr('y', d => y_scale(d))
    .attr('width', x_scale.bandwidth())
    .attr('height', d => chart_height - y_scale(d))
    .attr('fill', '#7ed26d')
    .on('mouseover', function () {
        d3.select(this)
            .transition('change-color')
            .duration(500)
            .attr('fill', '#0C9CDF');
    })
    .on('mouseout', function () {
        d3.select(this)
            .transition('change-color')
            .duration(500)
            .attr('fill', '#7ed26d');
    })
    .on('click', function () {
        svg.selectAll('rect')
            .sort((a, b) => sort_flag ? d3.descending(a, b) : d3.ascending(a, b))
            .transition('sort')
            .duration(1000)
            .attr('x', (d, i) => x_scale(i))
            .attr('y', d => y_scale(d))
            .attr('height', d => chart_height - y_scale(d));

        svg.selectAll('text')
            .sort((a, b) => sort_flag ? d3.descending(a, b) : d3.ascending(a, b))
            .transition('sort')
            .duration(1000)
            .attr('x', (d, i) => x_scale(i) + x_scale.bandwidth() / 2)
            .attr('y', d => y_scale(d) + 15);

        sort_flag = !sort_flag;
    });

// Create labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', (d, i) => x_scale(i) + x_scale.bandwidth() / 2)
    .attr('y', d => y_scale(d) + 15)
    .attr('font-size', 14)
    .attr('fill', "#fff")
    .attr('text-anchor', 'middle')
    .style('pointer-events', 'none');
