var pymChild = null;

var winwidth = parseInt(d3.select('#map').style('width'));

var margin = {top: 8, right: 21, bottom: 77, left: 40},
    mapRatio = 0.6,
    mapwidth = winwidth,
    mapwidth = mapwidth,
    mapheight = mapwidth * mapRatio;

var map = d3.select("#map").append("svg")
    .attr("width", mapwidth)
    .attr("height", mapheight);


var projection = d3.geo.mercator();


       var path = d3.geo.path()
           .projection(projection);




var outline;

// The tooltip
var div = d3.select("#tooltip").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 1)
    .style("z-index", 1400)
    .html("<h3>Hover over to see donations</h3>")



d3.selection.prototype.moveToFront = function() {
           return this.each(function() {
               this.parentNode.appendChild(this);
           });
       };


queue()
    .defer(d3.json, "js/NJzipswnames.json")
    .defer(d3.csv, "data/NJ_trump_zipcode_donations.csv")
    .await(ready);

      function ready(error, us, data) {

        var amount = {};

        var linenumber = {};

        var zipcode = {};


        data.forEach(function(d) {
    
    amount[d.zip] = +d.amount;
    linenumber[d.zip] = +d.linenumber;
    zipcode[d.zip] = d.zip;

 
  });


         var color = d3.scale.quantize()
    .domain([0, d3.max(data, function(d) { return d.linenumber; })])
    .range(["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);




var legend = d3.select('#legend')
  .append('ul')
    .attr('class', 'list-inline');

var keys = legend.selectAll('li.key')
    .data(color.range());

keys.enter().append('li')
    .attr('class', 'key')
    .style('border-top-color', String)
    .text(function(d) {
        var r = color.invertExtent(d);
        return d3.round(r[0]);
    });




  if (error) return console.error(error);

   outline = topojson.feature(us, us.objects.NJzipswnames)



           projection
               .scale(1)
               .translate([0, 0]);

           var b = path.bounds(outline),
               s = .95 / Math.max((b[1][0] - b[0][0]) / mapwidth, (b[1][1] - b[0][1]) / mapheight),
               t = [(mapwidth - s * (b[1][0] + b[0][0])) / 2, (mapheight - s * (b[1][1] + b[0][1])) / 2];


           projection
               .scale(s)
               .translate(t);


               map.append('path')
               .datum(outline)
               .attr('class', 'nj')
               .attr('d', path);


           njzips = map.selectAll('path.NJzipswnames-ms')
               .data(outline.features)
               .enter().append('path')
               .attr('class', 'njzips')
               .attr('id', function(d) {
                   return d.properties.ZCTA5CE10;
               })
               .attr('d', path)
               .on("mouseover", function(d) { 
                
               d3.select(this.parentNode.appendChild(this))
               .style({
                   'stroke-opacity': 1,
                   'stroke': '#5C5C5C',
                   "stroke-width": 1.5,
                   'z-index': 1000
               });   
            div .style("opacity", .9)   
            div .html((zipcode[d.id]) ? "<h2>" + zipcode[d.id] + ": " + d.properties.POSTOFFICE + "</h2><div id='infobox'><h3>Number of Trump Donations: <br><span class='number'>"  + linenumber[d.id] + "</span></h3><h3>Total amount of Trump Donations: <br><span class='number'>$"  + amount[d.id] + "</span></h3></div>" : "<h2>" + d.id  + ": " + d.properties.POSTOFFICE + "</h2><div id='infobox'><h3><span class='number'>No donations reported at this zip code</span></h3></div>")
  
            })          
        .on("mouseout", function(d) { 

          njzips.style({
                   'stroke-opacity': 0.6,
                   'stroke': '#C97136',
                   "stroke-width": 0.5
               });  
            div.html("<h3>Hover over to see donations</h3>")
        });


          njzips.style("fill", function(d) { 
            if (linenumber[d.id]) {
              return color(linenumber[d.id])
            } else {return '#F2F2F2' }})
          .style("stroke", "#C97136")
          .style("stroke-opacity", 0.6 )
  

pymChild = new pym.Child();




         

               };

       d3.select(window).on('resize', resize);


       function resize() {
           // adjust widths and heights for window changes
           mapwidth = parseInt(d3.select('#map').style('width'));
           mapwidth = mapwidth - margin.left - margin.right;
           mapheight = mapwidth * mapRatio;

       

           // Update projection for resize
           projection
               .scale(1)
               .translate([0, 0]);

           var b = path.bounds(outline),
               s = .95 / Math.max((b[1][0] - b[0][0]) / mapwidth, (b[1][1] - b[0][1]) / mapheight),
               t = [(mapwidth - s * (b[1][0] + b[0][0])) / 2, (mapheight - s * (b[1][1] + b[0][1])) / 2];


           projection
               .scale(s)
               .translate(t);


           // resize map container
           map
               .style('width', mapwidth + 'px')
               .style('height', mapheight + 'px');





           // resize map
           map.selectAll('.nj').attr('d', path);
           map.selectAll('.njzips').attr('d', path);


           
       }

 var svg;

       








