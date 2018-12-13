// @TODO: YOUR CODE HERE!

var svgWidth = 600;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 80
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)

var chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);


 d3.csv("../data/data.csv")
    .then(function(newsData) {
     
    // "../data/data.csv", function(error, newsData) {
    // if (error) throw console.warn(error);
                        
    // console.log(newsData);
                        
//parse data
    newsData.forEach(function(data) {
    data.income = +data.income;
    data.poverty = +data.poverty;
    });

    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(newsData, d => d.income)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(newsData, d=> d.poverty)])
        .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis)

    chartGroup.append("g")
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(newsData)
        .enter()
        .append("circle")
        .attr("cx", d=> xLinearScale(d.income))
        .attr("cy", d=> yLinearScale(d.poverty))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", 0.5)
    
    chartGroup.append("text")
        .style("font-size", "10px")
        .style("text-anchor", "middle")
        .selectAll("tspan")
        .data(newsData)
        .enter()
        .append("tspan")
        .attr("x", d=> xLinearScale(d.income))
        .attr("y", d=> yLinearScale(d.poverty)+4)
        .text(d => d.abbr)
        .attr("fill", "white");
    // var circlesText = chartGroup.selectAll("circle")
    //     .data(newsData)
    //     .enter()
    //     .append("text")
    //     .text("Hey")
    //     .attr("cx", d=> xLinearScale(d.income))
    //     .attr("cy", d=> yLinearScale(d.poverty))
    //     .attr("font_family", "sans-serif")  // Font type
    //     .attr("font-size", "11px")  // Font size
    //     .attr("fill", "black")

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return(`${d.income}`)
        });

    chartGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })

        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        
        });

        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("In Poverty (%)");
  
      chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Income ($)");
  
        

});



                    // // Initial params
// var chosenXAxis = "income";

// //Update x-axis scale on click
// function xScale(newsData, chosenXAxis) {
//     var xLinearScale = d3.scaleLinear()
//                         .domain([d3.min(newsData, d=>[chosenXAxis]) * 0.8,
//                             d3.max(newsData, d => d[chosenXAxis]) * 1.2])
//                         .range([0, width]);
//     return xLinearScale;
// }

// //Update x-axis on click
// function renderAxes(newXScale, xaxis) {
//     var bottomAxis = d3.axisBottom(newXScale);
    
//     xAxis.transition()
//         .duration(500)
//         .call(bottomAxis);

//     return xAxis
// }

// //adding circles of cities
// function renderCircles(circlesGroup, newXScale, chosenXaxis) {
//     circlesGroup.transition()
//                 .duration(500)
//                 .attr("cx", d=> newXScale(d[chosenXAxis]));

//     return circlesGroup;
// }

// //load data from CSV
// d3.csv("../data/data.csv", function(error, newsData) {
//     if (error) throw console.warn(error);

//     console.log(newsData);

//     //parse data
//     newsData.forEach(function(data) {
//         data.income = +data.income;
//         data.poverty = +data.poverty;
//     });

//     var xLinearScale = xScale(newsData, chosenXAxis);

//     var yLinearScale = d3.scaleLinear()
//                         .domain([0, d3.max(newsData, d => d.poverty)])
//                         .range([height, 0]);
                    
//     var bottomAxis = d3.axisBottom(xLinearScale);
//     var leftAxis = d3.axisLeft(yLinearScale);

//     var xAxis = chartGroup.append("g")
//                         .classed("x-axis", true)
//                         .attr("transform", `translate(0, ${height})`)
//                         .call(bottomAxis);

//     chartGroup.append("g")
//         .call(leftAxis);

//     var circlesGroup = chartGroup.selectAll("circle")
//         .data(newsData)
//         .enter()
//         .append("circle")
//         .attr("cx", d=> xLinearScale(d[chosenXAxis]))
//         .attr("cy", d=> yLinearScale(d.poverty))
//         .attr("r", 20)
//         .attr("fill", "blue")

//     var labelsGroup = chartGroup.append("g")
//         .attr("transform", `translate(${width / 2}, ${height + 20})`)

//     var incomeLabel = labelsGroup.append("text")
//         .attr("x", 0)
//         .attr("y", 0)
//         .attr("value", "income")
//         .classed("inactive", true)
//         .text("Income Amount ($)");

//     chartGroup.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 0 - margin.left)
//         .attr("x", 0- (height / 2))
//         .attr("dy", "1em")
//         .classed("axis-text", true)
//         .text("Poverty Percentage (%)")

//     var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//     labelsGroup.selectAll("text")
//         .on("click", function() {
//             var value = d3.select(this).attr("value");
//             if (value !== chosenXAxis) {

//                 chosenXaxis = value;

//                 console.log(chosenAxis)

//                 xLinearScale = xScale(newsData, chosenXAxis);

//                 xAxis = renderAxes(xLinearScale, xAxis);

//                 circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//                 if (chosenXAxis === "income") {
//                     incomeLabel.classed("active", true).classed("inactive", false);
    
//                 }
//             }
//         });
// });