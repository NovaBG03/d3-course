// Data
const data = [
    {date: 1988, num: 51},
    {date: 1989, num: 60},
    {date: 1990, num: 62},
    {date: 1991, num: -64},
    {date: 1992, num: 69},
    {date: 1993, num: 69},
    {date: 1994, num: 75},
    {date: 1995, num: 80},
    {date: 1996, num: 91},
    {date: 1997, num: 93},
    {date: 1998, num: 97},
    {date: 1999, num: 100},
    {date: 2000, num: -103},
    {date: 2001, num: 104},
    {date: 2002, num: 105},
    {date: 2003, num: 110},
    {date: 2004, num: 111},
    {date: 2005, num: 112},
    {date: 2006, num: 112},
    {date: 2007, num: 113},
    {date: 2008, num: 119},
    {date: 2009, num: 128},
    {date: 2010, num: 139},
    {date: 2011, num: -139},
    {date: 2012, num: 139},
    {date: 2013, num: 140},
    {date: 2014, num: 143},
    {date: 2015, num: 146},
    {date: 2016, num: 147},
    {date: 2017, num: 149}
];

const time_parse = d3.timeParse('%Y');
const time_format = d3.timeFormat('%Y');
const chart_width = 1000;
const chart_height = 800;
const padding = 50;

// Format Date
data.forEach((e, i) =>
    data[i].date = time_parse(e.date));

// Scales
const x_scale = d3.scaleTime()
    .domain([
        d3.min(data, d => d.date),
        d3.max(data, d => d.date)
    ])
    .range([padding, chart_width - padding]);

const y_scale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.num)])
    .range([chart_height - padding, padding]);

// Create SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height);

// Create Axes
const x_axis = d3.axisBottom(x_scale)
    .ticks(10)
    .tickFormat(time_format);

const y_axis = d3.axisLeft(y_scale)
    .ticks(12);

svg.append("g")
    .attr("transform", `translate(0, ${(chart_height - padding)})`)
    .call(x_axis);

svg.append("g")
    .attr("transform", `translate(${padding} ,0)`)
    .call(y_axis);

// Create Lines
const line = d3.line()
    .defined(d => d.num >= 0 && d.num <= 100)
    .x(d => x_scale(d.date))
    .y(d => y_scale(d.num));

const red_line = d3.line()
    .defined(d => d.num >= 100)
    .x(d => x_scale(d.date))
    .y(d => y_scale(d.num));

svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('stroke-width', 15)
    .attr('d', line);

svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'orange')
    .attr('stroke-width', 15)
    .attr('d', red_line);

// Create Areas

const area = d3.area()
    .defined(d => d.num >= 0)
    .x(d => x_scale(d.date))
    .y0(y_scale.range()[0])
    .y1(d => y_scale(d.num));

const red_area = d3.area()
    .defined(d => d.num >= 100)
    .x(d => x_scale(d.date))
    .y0(y_scale(100))
    .y1(d => y_scale(d.num));

svg.append('path')
    .datum(data)
    .attr('fill', '#73ff36')
    .attr('d', area);

svg.append('path')
    .datum(data)
    .attr('fill', '#ea280c')
    .attr('d', red_area);
