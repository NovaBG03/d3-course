// d3.csv('data.csv').then(d => {
//     console.log(d);
//     generate(d.columns);
// });

d3.json('data.json').then(d => {
    console.log(d);
    generate((d))
});

function generate(dataset) {
    // const dataset = [10, 20, 30, 40, 50];

    let el = d3.select('body')
        .selectAll('p')
        .data(dataset)
        .enter()
        .append('p')
        .text(d => `The paragraph is binded to the number ${d}`)
        .style('color', d => d >= 25 ? 'red' : 'blue')
        .classed('odd', d => d / 10 % 2 == 1)
        .attr('id', d => d);

    // .append('p')
    // .attr('class', 'foo')
    // .attr('class', 'bar')
    // .text('Hello World!')
    // .classed('foo', true)
    // .classed('bar', true)
    // .style('color', 'blue');

    console.log(el);
}
