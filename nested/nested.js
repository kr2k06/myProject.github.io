/**
 * The controller doesn't do much more than setting the initial data model
 */
angular.module("demo").controller("NestedListsDemoController", function($scope) {

    $scope.models = {
        selected: null,
        templates: [
            {type: "Well-log", id: 0,name:'Well-log', class:'fa-area-chart', columns: [[], []]},
            {type: "Histogram", id: 0,name:'Histogram', class:'fa-bar-chart', columns: [[], []]},
            {type: "Cross-Plot", id: 0,name:'Cross-Plot', class:'fa-line-chart', columns: [[], []]},
            {type: "Table", id: 0,name:'Table', class:'fa-table', columns: [[], []]}
        ],
        dropzones: {
            "A": [
            ]
        }
    };
$scope.logEvent = function(item,e){
    console.log('sarath',item,e);
    renderChart();
}
    $scope.addContainer = function(obj){
       // console.log(obj);
        var objData = angular.copy(obj)
        objData.id = objData.id +1;
        objData.name = objData.name+objData.id;

        $scope.models.dropzones.A.push(objData);
    };

    //$scope.models.dropzones.A.push( $scope.models.templates[0]);
$scope.dataList = [
    {
    "name": "data1",
    "id": "dataJson1",
    "type":"chart"

},
    {
        "name": "data2",
        "id": "dataJson2",
        "type":"Histogram"
    },
    {
        "name": "data3",
        "id": "dataJson3",
        "type":"Cross-Plot"
    },
    {
        "name": "data4",
        "id": "dataJson4",
        "type":"Table"
    }
]

function renderChart(){

    // set the dimensions of the canvas
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;


    // set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    // define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);


    // add the SVG element
    var svg = d3.select("#bar").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // load the data
    d3.json("https://raw.githubusercontent.com/kr2k06/myProject.github.io/master/nested/data.json", function(error, data) {

        data.forEach(function(d) {
            d.Letter = d.Letter;
            d.Freq = +d.Freq;
        });

        // scale the range of the data
        x.domain(data.map(function(d) { return d.Letter; }));
        y.domain([0, d3.max(data, function(d) { return d.Freq; })]);

        // add axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");


        // Add bar chart
        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.Letter); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.Freq); })
            .attr("height", function(d) { return height - y(d.Freq); });

    });


}
});
