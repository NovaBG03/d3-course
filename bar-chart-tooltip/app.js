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
    .on('mouseover', function (e, d) {
        const x = parseFloat(d3.select(this).attr('x')) + x_scale.bandwidth();
        const y = (parseFloat(d3.select(this).attr('y')) + chart_height) / 2;
        console.log(x);
        d3.select('#tooltip')
            .text(d)
            .style('left', x + 'px')
            .style('top', y + 'px')
            .style('display', 'block')
    })
    .on('mouseout', () => {
        d3.select('#tooltip')
            .style('display', 'none');
    });
