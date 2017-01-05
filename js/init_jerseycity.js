var geoJsonObject;

// var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/10ckGqR5cHCVk5R_IF6ej55VF5Rh7FwobD2Xe0h8awLE/pubhtml';

   
   $(document).ready(function(){

   //   function init() {
   //     Tabletop.init({
   //         key: public_spreadsheet_url,
   //         callback: showInfo,
   //         simpleSheet: true
   //     })
   // }

  // init();

  map = new L.Map('mapcanvas', {attributionControl: false, minZoom: 7.5});

    var winwidth = parseInt(d3.select('#mapcanvas').style('width'))
   
    var osm = new L.TileLayer('');    
    map.setView(new L.LatLng(40.720000, -74.058825),11 );
    map.addLayer(osm);
    var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

    // The tooltip
var div = d3.select("#mapcanvas").append("div") 
    .attr("class", "tooltip")   
    .html("<h3>Loading...</h3>")
    .style("top", "0px")
    .style("left", winwidth - 180 + "px")

   // function showInfo(resultsdata, tabletop) {

 

    // var data = tabletop.sheets('Ultimate_map')['elements']

  


queue()
    .defer(d3.json, "js/nj_munis_2.json")
    .defer(d3.csv, "data/0915median_income_towns_counties.csv")
    // .defer(d3.csv,"data/njelection_results.csv")
    .await(ready);



function ready(error, us, data){
      var income2015 = {};
      var moe2015 = {};
      var highmoe2015 = {};
      var town_name = {};
      var county = {};
      var income2009 = {};
      var highmoe2009 = {};
      var change = {};
      var census2010={};

        data.forEach(function(d) {
    census2010[d.census2010] = d.census2010;
    town_name[d.census2010] = d.town_name;
    income2015[d.census2010] = +d.median_income_latest;
    moe2015[d.census2010] = +d.median_income_latest_moe;
    highmoe2015[d.census2010] = d.highmoe;
    county[d.census2010] = d.county;
    income2009[d.census2010] = +d.median_income_prev;
    highmoe2009[d.census2010] = d.highmoe2009;
    change[d.census2010] = +d.median_income_change;
          

    // prez_rep[d.MUNI_CODE] = +d.prez_rep;
    // rep_per[d.MUNI_CODE] = +d.prez_rep_per;
    // others[d.MUNI_CODE] = +d.others_total;
    // others_per[d.MUNI_CODE] = +d.others_per;
    // margin_vic[d.MUNI_CODE] = +d.margin_victory;
    // johnson[d.MUNI_CODE] = +d.johnson;
    // johnson_per[d.MUNI_CODE] = +d.johnson_per;
    // the_winner[d.MUNI_CODE] = d.winner;




 
  });




       


var legend_width = 250,
      divisions = 8;



var EqualColor = "#f7f7f7",
      TrumpColorMax = "#a50f15",
      ClintonColorMax = "#08519c",
      IncomeColorMax = "#00441b";

      var PercentMax = 55;

      var IncomeMax = d3.max(data, function(d) { return parseInt(d.change); });


       var TrumpColor = d3.scale.linear()
        .range([EqualColor, TrumpColorMax])
        .domain([0,PercentMax])
        .interpolate(d3.interpolateLab);
    var ClintonColor = d3.scale.linear()
        .range([EqualColor, ClintonColorMax])
        .domain([0,PercentMax])
        .interpolate(d3.interpolateLab);


var IncomeColor = d3.scale.quantize()
    .domain([-30,30])
    .range(["#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850"]);


     // var JohnsonColor = d3.scale.linear()
     //    .range([EqualColor, JohnsonColorMax])
     //    .domain([0,JohnsonMax-150])
     //    .interpolate(d3.interpolateLab);

        var legend = d3.select('#legend')
  .append('ul')
    .attr('class', 'list-inline');

var keys = legend.selectAll('li.key')
    .data(IncomeColor.range());

keys.enter().append('li')
    .attr('class', 'key')
    .style('border-top-color', String)
    .text(function(d) {
        var r = IncomeColor.invertExtent(d);
        return d3.round(r[0]).toLocaleString() + "%";
    });


    //     var fakeData = [];
    // var rectWidth = Math.floor(legend_width / divisions);


    // for (var i=0; i < legend_width/2; i+= rectWidth ) {
    //     fakeData.push(i);
    // }


    // var TrumpScaleLegend = d3.scale.linear()
    //       .domain([0, fakeData.length-1])
    //       .interpolate(d3.interpolateLab)
    //       .range([EqualColor, TrumpColorMax]);
    // var ClintonScaleLegend = d3.scale.linear()
    //       .domain([fakeData.length-1,0])
    //       .interpolate(d3.interpolateLab)
    //       .range([EqualColor, ClintonColorMax]);

    // var TrumpLegend = legend.append("g").attr("class", "TrumpLegend").attr("transform", "translate("+(legend_width/2)+",0)");
    // var ClintonLegend = legend.append("g").attr("class", "ClintonLegend");



    // TrumpLegend.selectAll("rect")
    //     .data(fakeData)
    //     .enter()
    //     .append("rect")
    //         .attr("x", function(d) { return d; })
    //         .attr("y", 10)
    //         .attr("height", 10)
    //         .attr("width", rectWidth)
    //         .attr("fill", function(d, i) { return TrumpScaleLegend(i)});
    
    // ClintonLegend.selectAll("rect")
    //     .data(fakeData)
    //     .enter()
    //     .append("rect")
    //         .attr("x", function(d) { return d; })
    //         .attr("y", 10)
    //         .attr("height", 10)
    //         .attr("width", rectWidth)
    //         .attr("fill", function(d, i) { return ClintonScaleLegend(i)});

    // legend.append("text").text("MARGIN OF VICTORY").attr("transform", "translate("+legend_width/3+",60)").style('font-weight', 'bold');
    // legend.append("text").text("CLINTON").attr("transform", "translate("+(0)+",0)");
    // legend.append("text").text("TRUMP").attr("transform", "translate("+(legend_width-15)+",0)");
    // legend.append("text").text(function(){return "0%";}).attr("transform","translate("+(legend_width/2) + ",35)");
    // legend.append("text").text(function(){return "+" + (PercentMax*1).toFixed(0) + "%";}).attr("transform","translate(0,35)");
    // legend.append("text").text(function(){return "+" + (PercentMax*1).toFixed(0) + "%";}).attr("transform","translate("+(legend_width)+",35)");



  $( ".waiting" ).remove();

      collection = topojson.feature(us, us.objects.nj_munis_2)

      



      var transform = d3.geo.transform({point: projectPoint}),
      path = d3.geo.path().projection(transform);
      var feature = g.selectAll("path")
      .data(collection.features)
      .enter().append("path")
               .attr('class', 'njmunis')
               .attr('id', function(d) {  
                   return d.properties.CENSUS2010;
               })
               .attr('d', path)
               .on("mouseover", mousemove)
        .on("mousemove", mousemove)
        .on("click", mousemove)  
        .on("mouseout", function(d) { 

          feature.style({
                   'stroke-opacity': 0.6,
                   'stroke': '#807dba',
                   "stroke-width": 0.5
               });  
            div.style("opacity", 0)
        });


         map.on("viewreset", reset);
      reset();

       function reset() {
        var bounds = path.bounds(collection),
        topLeft = bounds[0],
        bottomRight = bounds[1];
        svg .attr("width", bottomRight[0] - topLeft[0])
        .attr("height", bottomRight[1] - topLeft[1])
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px");
        g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
        feature.attr("d", path);
      }
      function projectPoint(x, y) {
        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
      }

      div.html("<h3>Hover over for more info</h3>")

         


          feature.style("fill", function(d) { 

            console.log(change[d.id])

            return IncomeColor(change[d.id])

           
              
            })
          .style("stroke", "#807dba")
          .style("stroke-opacity", 0.6 )
          .style("stroke-width", 0.5)
          .style("fill-opacity", 1 )


          function mousemove(d) {

            feature.style({
              'stroke-opacity': 0.6,
                   'stroke': '#807dba',
                   "stroke-width": 0.5})

 

       d3.select(this.parentNode.appendChild(this))
               .style({
                   'stroke-opacity': 1,
                   'stroke': '#5C5C5C',
                   "stroke-width": 1.5
               });   
            div .style("opacity", .95)   
            div .html("<h2 class='" + change[d.id] +"'>" + town_name[d.id] + "</h2><div id='infobox'><table class='muni_elex'><tr><th></th><th></th><th></th></tr><tr><td class='name clinton'>2005-2009 Median Income</td><td>" + highmoe2009[d.id] + "</tr><tr><td class='name clinton'>2011-2015 Median Income</td><td>"+highmoe2015[d.id]+"<tr><td class='name clinton'>Change</td><td>" + d3.round(change[d.id]) + "%</td><td>" + " </td></tr></table>")
   div
      .style("left", (mobileoffset(d3.event.pageX) + 10) + "px")
      .style("z-index", 1400)
      .style("top", (d3.event.pageY) + "px");


      

      function mobileoffset(d) {

        var xoff = winwidth - d;
        var xper = xoff/winwidth;
       
       

        if (winwidth < 400 && xper < 0.55) {
     
          return d - winwidth/2;
        }

        else {
          return d;
        }

      }






      // if (the_winner[d.id] == 'prez_rep') {
      // div.selectAll(".name").filter('.trump')
      //               .html("TRUMP &#10003;")
      //               .style({
      //              'color': '#67000d'
      //          })
      //               }
      // else if (the_winner[d.id] == 'prez_dem') {

      //   div.selectAll(".name").filter('.clinton')
      //               .html("CLINTON &#10003;")
      //               .style({
      //              'color': '#08306b'
      //          })

      // }

      // else if (the_winner[d.id] == 'johnson') {

      //   div.selectAll(".name").filter('.johnson')
      //               .html("JOHNSON &#10003;")
      //               .style({
      //              'color': '#54278f'
      //          })

      // }





}


 }

var pymChild = new pym.Child();



    //d3 code stolen from http://bost.ocks.org/mike/leaflet/#init
     
     


    
  
  });
