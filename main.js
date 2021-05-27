
let leftbarLeft = 0, rightbarLeft = 540, barTop = 470;
let leftbarchartMargin = {top: 10, right: 30, bottom: 30, left: 60},
    leftbarchartWidth = 500 - leftbarchartMargin.left - leftbarchartMargin.right,
    leftbarchartHeight = 150 - leftbarchartMargin.top - leftbarchartMargin.bottom;

let rightbarchartMargin = {top: 10, right: 30, bottom:30, left:60},
    rightbarchartWidth = 500 - rightbarchartMargin.left - rightbarchartMargin.right,
    rightbarchartHeight = 150 - rightbarchartMargin.top - rightbarchartMargin.bottom;

d3.csv("forbes_billionaires.csv").then(function(rawData){
    // console.log(rawData.Name)

    //left bar chart

    //set country billionaires
    var US = 0;
    var France = 0;
    var China = 0;
    var Japen = 0;
    var Germany = 0;
    var India = 0;
    var Italy = 0;
    var HongKong = 0;
    var Russia = 0;
    var UK = 0;
    var Taiwan = 0;
    var SouthKorea = 0;
    var Others = 0;
    rawData.forEach(function(data){

        if (data.Country == "United States"){
            US += 1;
        }
        else if (data.Country == "France"){
            France += 1;
        }
        else if (data.Country == "China"){
            China += 1;
        }
        else if (data.Country == "Japan"){
            Japen += 1;
        }
        else if (data.Country == "Germany"){
            Germany +=1;
        }
        else if (data.Country == "Italy"){
            Italy += 1;
        }
        else if (data.Country == "India"){
            India += 1;
        }
        else if (data.Country == "Hong Kong"){
            HongKong += 1;
        }
        else if(data.Country == "Russia"){
            Russia += 1;
        }
        else if (data.Country == "United Kingdom"){
            UK += 1;
        }
        else if (data.Country == "Taiwan"){
            Taiwan += 1;
        }
        else if (data.Country == "South Korea"){
            SouthKorea += 1;
        }
        else{
            Others += 1;
        }
    });

    countrys = [US, France, China, Japen, Germany, Italy, India, HongKong, 
        Russia, UK, Taiwan, SouthKorea, Others];

    leftbarData = [{country : "United States", billionaire_counts : US}, 
        {country : "France", billionaire_counts : France}, 
        {country : "China", billionaire_counts : China}, 
        {country : "Japen", billionaire_counts : Japen},
        {country :  "Germany", billionaire_counts : Germany},
        {country :  "Italy", billionaire_counts : Italy},
        {country :  "India", billionaire_counts : India},
        {country :  "Hong Kong", billionaire_counts : HongKong},
        {country : "Russia", billionaire_counts : Russia}, 
        {country : "United Kingdom", billionaire_counts : UK}, 
        {country : "Taiwan", billionaire_counts : Taiwan}, 
        {country : "South Korea", billionaire_counts : SouthKorea}, 
        {country : "Others", billionaire_counts : Others}];

    console.log(leftbarData);

    //left bar chart
    var leftbarchart = d3.select("#leftbarchart");

    leftbarchart.attr("width", leftbarchartWidth)
        .attr("height", leftbarchartHeight);

    //left bar chart Y label
    leftbarchart.append("text")
        .attr("x", -(leftbarchartHeight / 2) - barTop)
        .attr("y", 25)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("count of billionaire");


    //left bar chart X label
    leftbarchart.append("text")
        .attr("x", leftbarchartWidth / 2 + 50)
        .attr("y", leftbarchartHeight + barTop + 120)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("country");

    //left bar chart Y Axis
    var leftbarYAxisGroup = d3.select("#leftbarYAxis");
    
    //define y scale

    //Y Max
    var leftbarYMax = d3.max(countrys);

    //Y Axis Scale
    var yleftbarScale = d3.scaleLinear()
        .domain([0, leftbarYMax])
        .range([200, 0]);
    
    //Y Axis
    var leftbarYAxis = d3.axisLeft(yleftbarScale);

    leftbarYAxisGroup.attr("transform", "translate(60, 420)")
        .call(leftbarYAxis);
    
    
    //left bar chart X Axis
    var leftbarXAxisGroup = d3.select("#leftbarXAxis");

    //define x scale
    
    //X Axis Scale
    var xleftbarScale = d3.scaleBand()
        .domain(leftbarData.map(d =>d.country))
        .range([0, leftbarchartWidth])
        .paddingInner(1.5)
        .paddingOuter(1);
    
    //X Axis
    var leftbarXAxis = d3.axisBottom(xleftbarScale);
    
    leftbarXAxisGroup.attr("transform", "translate(60, 620)")
        .call(leftbarXAxis)
        .selectAll("text")
        .attr("text-ancher", "middle")
        .attr("y", "20")
        .attr("x", "-20")
        .attr("transform", "rotate(-45)");

    //draw bars
    var leftbars = leftbarXAxisGroup.selectAll("rect")
        .data(leftbarData)
        .enter()
        .append("rect")
        .attr("y", d=> yleftbarScale(d.billionaire_counts) - 200)
        .attr("x", d=> xleftbarScale(d.country) - 10)
        .attr("width", 20)
        .attr("height", d => 200 - yleftbarScale(d.billionaire_counts))
        .attr("fill", "steelblue");
  
    //left bar chart tooltip
    var leftbartip = d3.tip()
            .attr('class', 'd3-tip')
            .html(d=>(`Billionaire Count : ${d.billionaire_counts}`));


    leftbarchart.call(leftbartip);
    leftbars.on("mouseover", leftbartip.show)
        .on("mouseout", leftbartip.hide);

    



    //right bar chart
    var rightbarchart = d3.select("#rightbarchart");

    //get max number of children
    var childrenMax = 0;
    
    rawData.forEach(function(data){

        if (!isNaN(data.Children)){
            if (childrenMax < data.Children){
                childrenMax = data.Children;
            };
        };
    });
    // console.log(childrenMax);

    
    //count children number of each billionaire
    var rightbarData = [];
    var child1 = 0;
    var child2 = 0;
    var child3 = 0;
    var child4 = 0;
    var child5 = 0;
    var child6 = 0;
    var child7 = 0;
    var child8 = 0;
    var child9 = 0;

    rawData.forEach(function(data){
        if (data.Children == 1){
            child1 += 1;
        }
        else if (data.Children == 2){
            child2 += 1;
        }
        else if (data.Children == 3){
            child3 += 1;
        }
        else if (data.Children == 4){
            child4 += 1;
        }
        else if (data.Children == 5){
            child5 += 1;
        }
        else if (data.Children == 6){
            child6 += 1;
        }
        else if (data.Children == 7){
            child7 += 1;
        }
        else if (data.Children == 8){
            child8 += 1;
        }
        else if (data.Children == 9){
            child9 += 1;
        }
    });

    rightbarData.push({billionaire_counts: child1, children: 1});
    rightbarData.push({billionaire_counts: child2, children: 2});
    rightbarData.push({billionaire_counts: child3, children: 3});
    rightbarData.push({billionaire_counts: child4, children: 4});
    rightbarData.push({billionaire_counts: child5, children: 5});
    rightbarData.push({billionaire_counts: child6, children: 6});
    rightbarData.push({billionaire_counts: child7, children: 7});
    rightbarData.push({billionaire_counts: child8, children: 8});
    rightbarData.push({billionaire_counts: child9, children: 9});

    console.log(rightbarData);

    //right bar chart Y label
    rightbarchart.append("text")
        .attr("x", -(rightbarchartHeight / 2) - barTop)
        .attr("y", rightbarLeft)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("count of billionaire");

    //right bar chart X label
    rightbarchart.append("text")
        .attr("x", rightbarchartWidth / 2 + rightbarLeft + 30)
        .attr("y", rightbarchartHeight + barTop + 120)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Children");

    
    //right bar chart Y Axis
    var rightbarYAxisGroup = d3.select("#rightbarYAxis");

    //define y scale
    var rightbaryMax = d3.max(rightbarData, function(data){
        return data.billionaire_counts
    });


    //Y Axis Scale
    var yrightbarScale = d3.scaleLinear()
        .domain([0, rightbaryMax])
        .range([200, 0]);

    //Y Axis
    var rightbarYAxis = d3.axisLeft(yrightbarScale);

    rightbarYAxisGroup.attr("transform", `translate(${30 + rightbarLeft}, 420)`)
        .call(rightbarYAxis);


    //right bar chart X Axis
    var rightbarXAxisGroup = d3.select("#rightbarXAxis");

    //define x scale
    rightbarxMax = childrenMax;

    //X Axis Scale
    var xrightbarScale = d3.scaleLinear()
        .domain([0, rightbarxMax])
        .range([0, rightbarchartWidth]);
    
    //X Axis
    var rightbarXAxis = d3.axisBottom(xrightbarScale);
    
    rightbarXAxisGroup.attr("transform", `translate(${30 + rightbarLeft}, 620)`)
        .call(rightbarXAxis);

    //draw bar
    var rightbars = rightbarchart.selectAll("rect")
        .data(rightbarData)
        .enter()
        .append("rect")
        .attr("y", d=> yrightbarScale(d.billionaire_counts) + barTop - 50)
        .attr("x", d=> xrightbarScale(d.children) + rightbarLeft + 20)
        .attr("width", 20)
        .attr("height", d => 200 - yrightbarScale(d.billionaire_counts))
        .attr("fill", "steelblue");

    

    //right bar chart tooltip
    var rightbartip = d3.tip()
            .attr('class', 'd3-tip')
            .html(d=>(`Billionaire Count : ${d.billionaire_counts}`));


    rightbarchart.call(rightbartip);
    rightbars.on("mouseover", rightbartip.show)
        .on("mouseout", rightbartip.hide);


}).catch(function(error){
    console.log(error);
});