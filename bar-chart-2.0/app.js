const data = [
    {key: 0, num: 6},
    {key: 1, num: 20},
    {key: 2, num: 21},
    {key: 3, num: 14},
    {key: 4, num: 2},
    {key: 5, num: 30},
    {key: 6, num: 7},
    {key: 7, num: 16},
    {key: 8, num: 25},
    {key: 9, num: 5},
    {key: 10, num: 11},
    {key: 11, num: 28},
    {key: 12, num: 10},
    {key: 13, num: 26},
    {key: 14, num: 9}
];

// const data = [];
// for (let i = 0; i < 20; i++) {
//     let number = Math.floor(d3.randomUniform(1, 50)());
//     data.push(number);
// }

const key = d => d.key;

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
    .domain([0, d3.max(data, d => d.num)])
    .range([chart_height, 0]);

// Binding Data and Creating Cols
svg.selectAll('rect')
    .data(data, key)
    .enter()
    .append('rect')
    .attr('x', (d, i) => x_scale(i))
    .attr('y', d => y_scale(d.num))
    .attr('width', x_scale.bandwidth())
    .attr('height', d => chart_height - y_scale(d.num))
    .attr('fill', '#7ed26d');

// Create labels
svg.selectAll('text')
    .data(data, key)
    .enter()
    .append('text')
    .text(d => d.num)
    .attr('x', (d, i) => x_scale(i) + x_scale.bandwidth() / 2)
    .attr('y', d => y_scale(d.num) + 15)
    .attr('font-size', 14)
    .attr('fill', "#fff")
    .attr('text-anchor', 'middle');

// Events
d3.select('.update')
    .on('click', () => {
        //data.reverse();
        data[0].num = 50;
        y_scale.domain([0, d3.max(data, d => d.num)]);

        svg.selectAll('rect')
            .data(data, key)
            .transition()
            .delay((d, i) => i / data.length * 1000)
            .duration(1000)
            .ease(d3.easeElasticOut)
            .attr('y', d => y_scale(d.num))
            .attr('height', d => chart_height - y_scale(d.num));

        svg.selectAll('text')
            .data(data, key)
            .transition()
            .delay((d, i) => i / data.length * 1000)
            .duration(1000)
            .ease(d3.easeElasticOut)
            .text(d => d.num)
            .attr('y', d => y_scale(d.num) + 15);
    });

// Add Data
d3.select('.add')
    .on('click', () => {
        // Add new value
        const new_num = Math.ceil(Math.random() * d3.max(data, d => d.num));
        let new_key = d3.max(data, key) + 1;
        data.push({ key: new_key, num: new_num});
        console.log(data);

        // Update scales
        x_scale.domain(d3.range(data.length));
        y_scale.domain([0, d3.max(data, d => d.num)]);

        // Select bars
        const bars = svg.selectAll('rect')
            .data(data, key);

        // Add new bar
        bars.enter()
            .append('rect')
            .attr('x', (d, i) => x_scale(i))
            .attr('y', chart_height)
            .attr('width', x_scale.bandwidth())
            .attr('height', 0)
            .attr('fill', '#7ED26D')
            .merge(bars)
            .transition()
            .duration(1000)
            .attr('x', (d, i) => x_scale(i))
            .attr('y', d => y_scale(d.num))
            .attr('width', x_scale.bandwidth())
            .attr('height', d => chart_height - y_scale(d.num));

        // Select labels
        const labels = svg.selectAll('text')
            .data(data, key);

        // Add new labels
        labels.enter()
            .append('text')
            .attr('x', (d, i) => x_scale(i) + x_scale.bandwidth() / 2)
            .attr('y', chart_height + 15)
            .attr('font-size', 14)
            .attr('fill', "#fff")
            .attr('text-anchor', 'middle')
            .merge(labels)
            .transition()
            .duration(1000)
            .text(d => d.num)
            .attr('x', (d, i) => x_scale(i) + x_scale.bandwidth() / 2)
            .attr('y', d => y_scale(d.num) + 15);
    });

// Remove First Element
d3.select('.remove')
    .on('click', () => {
        // Update data
        data.shift();

        // Update scales
        x_scale.domain(d3.range(data.length));
        y_scale.domain([0, d3.max(data, d => d.num)])

        // Select bars
        const bars = svg.selectAll('rect')
            .data(data, key);

        // Update bars
        bars.transition()
            .duration(500)
            .attr('x', (d, i) => x_scale(i))
            .attr('y', d => y_scale(d.num))
            .attr('width', x_scale.bandwidth())
            .attr('height', d => chart_height - y_scale(d.num));

        // Remove bars
        bars.exit()
            .transition()
            .duration(500)
            .attr('y', chart_height)
            .attr('height', 0)
            .remove();

        // Select labels
        const labels = svg.selectAll('text')
            .data(data, key);

        // Update labels
        labels.transition()
            .duration(500)
            .text(d => d.num)
            .attr('x', (d, i) => x_scale(i) + x_scale.bandwidth() / 2)
            .attr('y', d => y_scale(d.num) + 15);

        // Remove labels
        labels.exit()
            .transition()
            .duration(500)
            .attr('y', chart_height + 15)
            .remove();
    });

