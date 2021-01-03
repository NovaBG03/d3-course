const fruits = ['Apples', 'Oranges', 'Grapes', 'Strawberry', 'Kiwi'];

var scale = d3.scaleBand()
    .domain(d3.range(fruits.length))
    .range([0, 500]);
