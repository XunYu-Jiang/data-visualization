let scatterLeft = 0, scatterTop = 0;
let scatterMargin = {top: 10, right: 30, bottom: 30, left: 60},
	scatterWidth = 500 - scatterMargin.left - scatterMargin.right,
	scatterHeight = 500 - scatterMargin.top - scatterMargin.bottom;

let leftbarLeft = 0, rightbarLeft = 580, barTop = 520;
let leftbarchartMargin = {top: 10, right: 30, bottom: 30, left: 60},
    leftbarchartWidth = 500 - leftbarchartMargin.left - leftbarchartMargin.right,
    leftbarchartHeight = 250 - leftbarchartMargin.top - leftbarchartMargin.bottom;

let rightbarchartMargin = {top: 10, right: 30, bottom:30, left:60},
    rightbarchartWidth = 500 - rightbarchartMargin.left - rightbarchartMargin.right,
    rightbarchartHeight = 250 - rightbarchartMargin.top - rightbarchartMargin.bottom;

let pieLeft = 580, pieTop = 0;
let piechartMargin = {top: 10, right: 30, bottom: 30, left: 60},
	piechartWidth = 500 - piechartMargin.left - piechartMargin.right,
	piechartHeight = 500 - piechartMargin.top - piechartMargin.bottom;


d3.csv("billionaires.csv").then(rawData =>{

    rawData.forEach(function(d){
        d.Rank = Number(d.Rank);
        d.Age = Number(d.Age);
        d.NetWorth = Number(d.NetWorth);
        d.Children = Number(d.Children);
    });
    console.log("rawData:", rawData);


    let svg = d3.select("svg");
//scatter plot

	var scatterplot = d3.select("#scatterplot");

	scatterplot.attr("width",scatterWidth)
			   .attr("height",scatterHeight)
			   .attr("transform", `translate(${scatterMargin.left},${scatterMargin.top})`)

    //scatter x label
    scatterplot.append("text")
      .attr("x",scatterWidth / 2)
      .attr("y",scatterHeight + 40)   
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Age") 
    //scatter y label
    scatterplot.append("text")
      .attr("x", -(scatterHeight / 2))
      .attr("y", -40)   
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Rank") 

    //scatter x axis
    var scatter_x = d3.scaleLinear()
                      .domain([0,100])
                      .range([0,scatterWidth]);
    var scatter_x_call = d3.axisBottom(scatter_x)
                           .ticks(10)
	var scatterXAxis = d3.select("#scatterXAxis")
						 .attr("transform", `translate(0, ${scatterHeight})`)
						 .call(scatter_x_call)

    //scatter y axis
    var scatter_y = d3.scaleLinear()
                      .domain([0,2700])
                      .range([0,scatterHeight])
    var scatter_y_call = d3.axisLeft(scatter_y)
                           .ticks(20)
	var scatterYAxis = d3.select("#scatterYAxis")
						 .call(scatter_y_call)

	//brush dots in scatter plot
	var brush_scatter = d3.brush()
                  .extent([ [0, 0], [scatterWidth, scatterHeight] ])
                  .on("start", brushed_scatter_red)
                  .on("brush", brushed_scatter_red)
                  .on("end", brush_newData)
                
	var brushscatter = d3.select("#brushscatter").call(brush_scatter)	

	function brushed_scatter_red(){
        let extent_scatter = d3.event.selection; //The four points in area  of bursh
        //highlight red
        dots.classed("selected", function(d) { 
            return scatter_x(d.Age) >= extent_scatter[0][0] && 
                   scatter_x(d.Age) <= extent_scatter[1][0] && 
                   scatter_y(d.Rank) >= extent_scatter[0][1] && 
                   scatter_y(d.Rank) <= extent_scatter[1][1];
        });
    }
	


	//dots in scatter plot
    let dots = scatterplot.selectAll("dot").data(rawData)
                 .enter().append("circle")
                 .attr("cx", d => scatter_x(d.Age))
                 .attr("cy", d => scatter_y(d.Rank))
                 .attr("r", 2)
                 .attr("fill", "lightblue")

	//Set scatter Tool Tip
    var scattertip = d3.tip()
                .attr('class', 'd3-tip')
                .html( d => `
                    <div>Name: ${d.Name}</div>
                    <div>Country: ${d.Country}</div>
                `);
    scatterplot.call(scattertip)

    dots.on('mouseover', scattertip.show)
    	.on('mouseout', scattertip.hide)
	 
//Bar chart 

	//left bar chart
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

    leftbarData = [{country : "USA", billionaire_counts : US}, 
        {country : "France", billionaire_counts : France}, 
        {country : "China", billionaire_counts : China}, 
        {country : "Japen", billionaire_counts : Japen},
        {country :  "Germany", billionaire_counts : Germany},
        {country :  "Italy", billionaire_counts : Italy},
        {country :  "India", billionaire_counts : India},
        {country :  "HK", billionaire_counts : HongKong},
        {country : "Russia", billionaire_counts : Russia}, 
        {country : "UK", billionaire_counts : UK}, 
        {country : "Taiwan", billionaire_counts : Taiwan}, 
        {country : "Korea", billionaire_counts : SouthKorea}, 
        {country : "Others", billionaire_counts : Others}];

    console.log("leftbarData",leftbarData);

	//move the position
	var leftbarchart = d3.select("#leftbarchart");

    leftbarchart.attr("width", leftbarchartWidth)
				.attr("height", leftbarchartHeight)
				.attr("transform", `translate(${leftbarchartMargin.left},${barTop})`)

	//left bar chart x label
    leftbarchart.append("text")
        .attr("x", leftbarchartWidth / 2 )
        .attr("y", leftbarchartHeight + 65)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Country");

    //left bar chart y label
	leftbarchart.append("text")
        .attr("x", -(leftbarchartHeight / 2) )
        .attr("y", -40 )
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Count of billionaire");
   
	
	//left bar X axis  
	var leftbar_x = d3.scaleBand()
					  .domain(leftbarData.map(d =>d.country))
					  .range([0, leftbarchartWidth])
					  .paddingInner(0.4)
					  .paddingOuter(0.2);
    var leftbar_x_call = d3.axisBottom(leftbar_x);

	var leftbarXAxis = d3.select("#leftbarXAxis") 
						 .attr("transform", `translate(0, ${leftbarchartHeight})`)
        				 .call(leftbar_x_call)
        				 .selectAll("text")
        				 .attr("text-ancher", "middle")
						 .attr("font-size","12px")
        				 .attr("y", "20")
        				 .attr("x", "-20")
        				 .attr("transform", "rotate(-45)");

	//left bar Y axis
    var leftbarYMax = d3.max(countrys); //Y Max

    var leftbar_y = d3.scaleLinear()
        			  .domain([0, leftbarYMax])
        			  .range([leftbarchartHeight, 0]);
	var leftbar_y_call = d3.axisLeft(leftbar_y);

	var leftbarYAxis = d3.select("#leftbarYAxis") 
        				 .call(leftbar_y_call);
	
	//draw left bars
    let leftbars = leftbarchart.selectAll("rect")
        					   .data(leftbarData)
        					   .enter()
        					   .append("rect")
        					   .attr("x", d=> leftbar_x(d.country) )
							   .attr("y", d=> leftbar_y(d.billionaire_counts) )
        					   .attr("width", 20)
        					   .attr("height", d => leftbarchartHeight - leftbar_y(d.billionaire_counts))
        					   .attr("fill", "white")
							   .attr("stroke", "black")
							   .attr("stroke-width", "1px")
	//left bar chart tooltip
    var leftbartip = d3.tip()
            		   .attr('class', 'd3-tip')
            		   .html(d=>(`Billionaire Count : ${d.billionaire_counts}`));

    leftbarchart.call(leftbartip);
    leftbars.on("mouseover", leftbartip.show)
        	.on("mouseout", leftbartip.hide);

//right bar chart

	//get max number of children
	var childrenMax = 0;

	rawData.forEach(function(data){
		if (!isNaN(data.Children)){
			if (childrenMax < data.Children){
				childrenMax = data.Children;
			};
		};
	});
	console.log("childrenMax",childrenMax);

	// number of children count of each billionaire
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
	var morethan9 = 0;

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
		else if (data.Children > 9){
			morethan9 += 1;
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
	rightbarData.push({billionaire_counts: morethan9, children: "children>9"});

	console.log("rightbarData",rightbarData);
	
	//move the position
	var rightbarchart = d3.select("#rightbarchart");

	rightbarchart.attr("width", rightbarchartWidth)
				 .attr("height", rightbarchartHeight)
				 .attr("transform", `translate(${rightbarLeft},${barTop})`)

	//right bar chart x label
	rightbarchart.append("text")
        .attr("x", rightbarchartWidth / 2 )
        .attr("y", rightbarchartHeight + 40)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Children");

    //right bar chart y label
	rightbarchart.append("text")
        .attr("x", -(rightbarchartHeight / 2) )
        .attr("y", -40 )
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Count of billionaire");

	//right bar chart X axis
	rightbarXMax = childrenMax;

	var rightbar_x = d3.scaleBand()
					   .domain(rightbarData.map(d =>d.children))
					   .range([0, rightbarchartWidth])
					   .paddingInner(0.5)
					   .paddingOuter(0.2);
    var leftbar_x_call = d3.axisBottom(rightbar_x);

	var rightbarXAxis = d3.select("#rightbarXAxis") 
						 .attr("transform", `translate(0, ${rightbarchartHeight})`)
        				 .call(leftbar_x_call)
						 .attr("font-size","12px")
        				 

	//right bar chart Y axis
	//Y Max
	var rightbarYMax = d3.max(rightbarData, function(data){
        return data.billionaire_counts
    }); 

    var rightbar_y = d3.scaleLinear()
        			  .domain([0, rightbarYMax])
        			  .range([rightbarchartHeight, 0]);
	var rightbar_y_call = d3.axisLeft(leftbar_y);

	var rightbarYAxis = d3.select("#rightbarYAxis")
        				 .call(leftbar_y_call);

	//draw right bar
    var rightbars = rightbarchart.selectAll("rect")
        						 .data(rightbarData)
        						 .enter()
        						 .append("rect")
								 .attr("x", d=> rightbar_x(d.children)  )
        						 .attr("y", d=> rightbar_y(d.billionaire_counts) )
        						 .attr("width", 20)
        						 .attr("height", d => rightbarchartHeight - rightbar_y(d.billionaire_counts))
        						 .attr("fill", "white")
								 .attr("stroke", "black")
							   	 .attr("stroke-width", "1px");

	//right bar chart tooltip
    var rightbartip = d3.tip()
            .attr('class', 'd3-tip')
            .html(d=>(`Billionaire Count : ${d.billionaire_counts}`));

    rightbarchart.call(rightbartip);
    rightbars.on("mouseover", rightbartip.show)
        	 .on("mouseout", rightbartip.hide);


//pie chart
	//calculate number of married and others
	var married = 0;
	var others = 0;

	rawData.forEach(function(data){
		if(data.Status == "Married"){
			married++;
		}
		else if(data.Status != "Married"){
			others++;
		}
	});
	var radiusmarried = married / (married+others);
	var radiusothers = others / (married+others);
	var pieradiusmarried = radiusmarried * (2 * Math.PI)
	var pieradiusothers = radiusothers * (2 * Math.PI)


	piechartData=[
		{label : "married", startAngle : 0, endAngle : pieradiusmarried, pieradius : radiusmarried},
		{label : "others", startAngle : pieradiusmarried, endAngle : 2* Math.PI, pieradius : radiusothers}
	];

	var color = d3.scaleOrdinal(['#ff7f0e','#1f77b4']);

	console.log("piechartData",piechartData);
	//move the position
	var piechart = d3.select("#piechart");

	piechart.attr("width", piechartWidth)
				 .attr("height", piechartHeight)
				 .attr("transform", `translate(${pieLeft}, ${pieTop})`)

	//draw pie chart
	var pieGenerator = d3.arc()
						 .innerRadius(0)
						 .outerRadius(180);
	
	var pies = piechart.selectAll("path")
        						 .data(piechartData)
        						 .enter()
        						 .append("path")
								 .attr("d", pieGenerator)
								 .attr("transform", `translate(${piechartWidth/2}, ${piechartHeight/2})`)
        						 .attr("fill", function(d,i){
									 return color(i)
								 })
								 .attr("stroke", "white")
	
	var piestext = piechart.selectAll("text")
						   .data(piechartData)
						   .enter()
						   .append("text")
						   .each(function(d){
							   var centroid = pieGenerator.centroid(d);
							   d3.select(this)
							     .attr("x", centroid[0]+ (piechartWidth/2) - 30 )
								 .attr("y", centroid[1]+ (piechartHeight/2) )
								 .text(d.label)
								 .attr("font-size", "25px")
						   });
	var percent = d3.format("%")
	//pie bar chart tooltip
    var piecharttip = d3.tip()
            .attr('class', 'd3-tip')
            .html(d=>(`${percent(d.pieradius)}`));

    piechart.call(piecharttip);
    pies.on("mouseover", piecharttip.show)
        .on("mouseout", piecharttip.hide);


//new data after brushing
	function brush_newData(){
		let extent_scatter = d3.event.selection; //The four points in area  of bursh

//left inner bar
		//calculate new counts of country
		let new_US = 0;
		let new_France = 0;
		let new_China = 0;
		let new_Japen = 0;
		let new_Germany = 0;
		let new_India = 0;
		let new_Italy = 0;
		let new_HongKong = 0;
		let new_Russia = 0;
		let new_UK = 0;
		let new_Taiwan = 0;
		let new_SouthKorea = 0;
		let new_Others = 0;
		
		dots.classed("inner_bar",function(data){
			if(scatter_x(data.Age) >= extent_scatter[0][0] && scatter_x(data.Age) <= extent_scatter[1][0] &&
			   scatter_y(data.Rank) >= extent_scatter[0][1] && scatter_y(data.Rank) <= extent_scatter[1][1]){
				if (data.Country == "United States"){
					new_US += 1;
			  	}
				else if (data.Country == "France"){
					new_France += 1;
				}
			  	else if (data.Country == "China"){
					new_China += 1;
			  	}
			  	else if (data.Country == "Japan"){
					new_Japen += 1;
			 	}
			  	else if (data.Country == "Germany"){
					new_Germany +=1;
			  	}
			  	else if (data.Country == "Italy"){
				  	new_Italy += 1;
			  	}
			  	else if (data.Country == "India"){
				  	new_India += 1;
			  	}
			  	else if (data.Country == "Hong Kong"){
				  	new_HongKong += 1;
			  	}
			  	else if(data.Country == "Russia"){
				  	new_Russia += 1;
			  	}
			  	else if (data.Country == "United Kingdom"){
				  	new_UK += 1;
			  	}
			  	else if (data.Country == "Taiwan"){
				  	new_Taiwan += 1;
			 	}
			  	else if (data.Country == "South Korea"){
				  	new_SouthKorea += 1;
			  	}
			  	else{
				  	new_Others += 1;
			  	}
			}
		});

		new_leftbarData = [{country : "USA", billionaire_counts : new_US}, 
        				   {country : "France", billionaire_counts : new_France}, 
        				   {country : "China", billionaire_counts : new_China}, 
        				   {country : "Japen", billionaire_counts : new_Japen},
        				   {country :  "Germany", billionaire_counts : new_Germany},
        				   {country :  "Italy", billionaire_counts : new_Italy},
        				   {country :  "India", billionaire_counts : new_India},
        				   {country :  "HK", billionaire_counts : new_HongKong},
        				   {country : "Russia", billionaire_counts : new_Russia}, 
        				   {country : "UK", billionaire_counts : new_UK}, 
        				   {country : "Taiwan", billionaire_counts : new_Taiwan}, 
        				   {country : "Korea", billionaire_counts : new_SouthKorea}, 
        				   {country : "Others", billionaire_counts : new_Others}];

    	console.log("new_leftbarData",new_leftbarData);
		
		//draw left inner bar
		//white bar
		var new_leftbars = leftbars.exit().remove()
								   .data(leftbarData)
        					   	   .enter()
        						   .append("rect")
        						   .attr("x", d => leftbar_x(d.country))
								   .attr("y", d => leftbar_y(d.billionaire_counts))
        						   .attr("width", 20)
        						   .attr("height", d => leftbarchartHeight - leftbar_y(d.billionaire_counts))
        						   .attr("fill", "white")
								   .attr("stroke", "black")
								   .attr("stroke-width", "1px")
										  
		//blue inner bar
		var new_blueleftbars = leftbars.exit().remove()
									   .data(new_leftbarData)
									   .enter()
									   .append("rect")
									   .attr("x", d => leftbar_x(d.country))
									   .attr("y", d => leftbar_y(d.billionaire_counts))
									   .attr("width", 20)
									   .attr("height",d => leftbarchartHeight - leftbar_y(d.billionaire_counts))
									   .attr("fill", "steelblue")
		
		//left bar chart tooltip
    	var new_leftbartip = d3.tip()
            		   		   .attr('class', 'd3-tip')
            				   .html(d =>(`Total Billionaire Count : ${d.billionaire_counts}`));

    	leftbarchart.call(new_leftbartip);
    	new_leftbars.on("mouseover", new_leftbartip.show)
        			.on("mouseout", new_leftbartip.hide);

		var new_blueleftbartip = d3.tip()
            		   		   .attr('class', 'd3-tip')
							   .html(d =>(`Selected Billionaire Count : ${d.billionaire_counts}`));

    	leftbarchart.call(new_blueleftbartip);
    	new_blueleftbars.on("mouseover", new_blueleftbartip.show)
        			.on("mouseout", new_blueleftbartip.hide);

	//right inner bar
		// calculate new count of children of each billionarire
		var new_rightbarData = [];
		var new_child1 = 0;
		var new_child2 = 0;
		var new_child3 = 0;
		var new_child4 = 0;
		var new_child5 = 0;
		var new_child6 = 0;
		var new_child7 = 0;
		var new_child8 = 0;
		var new_child9 = 0;
		var new_morethan9 = 0;

		dots.classed("inner_bar",function(data){
			if(scatter_x(data.Age) >= extent_scatter[0][0] && scatter_x(data.Age) <= extent_scatter[1][0] &&
			   scatter_y(data.Rank) >= extent_scatter[0][1] && scatter_y(data.Rank) <= extent_scatter[1][1]){
				if (data.Children == 1){
					new_child1 += 1;
				}
				else if (data.Children == 2){
					new_child2 += 1;
				}
				else if (data.Children == 3){
					new_child3 += 1;
				}
				else if (data.Children == 4){
					new_child4 += 1;
				}
				else if (data.Children == 5){
					new_child5 += 1;
				}
				else if (data.Children == 6){
					new_child6 += 1;
				}
				else if (data.Children == 7){
					new_child7 += 1;
				}
				else if (data.Children == 8){
					new_child8 += 1;
				}
				else if (data.Children == 9){
					new_child9 += 1;
				}
				else if (data.Children > 9){
					new_morethan9 += 1;
				}
			}
		});

		new_rightbarData.push({billionaire_counts: new_child1, children: 1});
		new_rightbarData.push({billionaire_counts: new_child2, children: 2});
		new_rightbarData.push({billionaire_counts: new_child3, children: 3});
		new_rightbarData.push({billionaire_counts: new_child4, children: 4});
		new_rightbarData.push({billionaire_counts: new_child5, children: 5});
		new_rightbarData.push({billionaire_counts: new_child6, children: 6});
		new_rightbarData.push({billionaire_counts: new_child7, children: 7});
		new_rightbarData.push({billionaire_counts: new_child8, children: 8});
		new_rightbarData.push({billionaire_counts: new_child9, children: 9});
		new_rightbarData.push({billionaire_counts: new_morethan9, children: "children>9"});

		console.log("new_rightbarData",new_rightbarData);

		//draw right inner bar
		//white bar
		var new_rightbars = rightbars.exit().remove()
								   	 .data(rightbarData)
        					   	   	 .enter()
        						   	 .append("rect")
        						   	 .attr("x", d => rightbar_x(d.children))
								   	 .attr("y", d => rightbar_y(d.billionaire_counts))
        						   	 .attr("width", 20)
        						   	 .attr("height", d => rightbarchartHeight - rightbar_y(d.billionaire_counts))
        						   	 .attr("fill", "white")
									 .attr("stroke","black")
									 .attr("stroke-width","1px")

		//blue inner bar
		var new_bluerightbars = rightbars.exit().remove()
									   .data(new_rightbarData)
									   .enter()
									   .append("rect")
									   .attr("x", d => rightbar_x(d.children))
									   .attr("y", d => rightbar_y(d.billionaire_counts))
									   .attr("width", 20)
									   .attr("height",d => rightbarchartHeight - rightbar_y(d.billionaire_counts))
									   .attr("fill", "steelblue")
		
		//right bar chart tooltip
    	var new_rightbartip = d3.tip()
            		   		   .attr('class', 'd3-tip')
            				   .html(d =>(`Total Billionaire Count : ${d.billionaire_counts}`));

    	rightbarchart.call(new_rightbartip);
    	new_rightbars.on("mouseover", new_rightbartip.show)
        			  .on("mouseout", new_rightbartip.hide);

		var new_bluerightbartip = d3.tip()
            		   		   .attr('class', 'd3-tip')
							   .html(d =>(`Selected Billionaire Count : ${d.billionaire_counts}`));

    	rightbarchart.call(new_bluerightbartip);
    	new_bluerightbars.on("mouseover", new_bluerightbartip.show)
        				 .on("mouseout", new_bluerightbartip.hide);



//new pie chart
		//calculate number of married and others
		var new_married = 0;
		var new_others = 0;

		dots.classed("inner_bar",function(data){
			if(scatter_x(data.Age) >= extent_scatter[0][0] && scatter_x(data.Age) <= extent_scatter[1][0] &&
			   scatter_y(data.Rank) >= extent_scatter[0][1] && scatter_y(data.Rank) <= extent_scatter[1][1]){
				if(data.Status == "Married"){
					new_married++;
				}
				else if(data.Status != "Married"){
					new_others++;
				}
			}
		});

		var new_radiusmarried = new_married / (new_married+new_others);
		var new_radiusothers = new_others / (new_married+new_others);
		var new_pieradiusmarried = new_radiusmarried * (2 * Math.PI)
		var new_pieradiusothers = new_radiusothers * (2 * Math.PI)

		new_piechartData=[
			{label : "married", startAngle : 0, endAngle : new_pieradiusmarried, pieradius : new_radiusmarried},
			{label : "others", startAngle : new_pieradiusmarried, endAngle : 2* Math.PI, pieradius : new_radiusothers}
		];
		console.log("new_piechartData",new_piechartData);

		//draw pie chart
		var new_pieGenerator = d3.arc()
							 	 .innerRadius(0)
							 	 .outerRadius(180);
	
		var new_pies = pies.exit().remove()
        				   .data(new_piechartData)
        				   .enter()
        				   .append("path")
						   .attr("d", new_pieGenerator)
						   .attr("transform", `translate(${piechartWidth/2}, ${piechartHeight/2})`)
        				   .attr("fill", function(d,i){
							   return color(i)
						   })
						   .attr("stroke", "white")
	
		var new_piestext = pies.exit().remove()
							   	   .data(new_piechartData)
							   	   .enter()
							   	   .append("text")
							   	   .each(function(d){
										var new_centroid = new_pieGenerator.centroid(d);
								   		d3.select(this)
							    	 	  .attr("x", new_centroid[0]+ (piechartWidth/2) - 30 )
									 	  .attr("y", new_centroid[1]+ (piechartHeight/2) )
									 	  .text(d.label)
									 	  .attr("font-size", "25px")
							   		});
		//pie bar chart tooltip
    	var new_piecharttip = d3.tip()
        	    .attr('class', 'd3-tip')
            	.html(d=>(`${percent(d.pieradius)}`));

    	piechart.call(new_piecharttip);
    	new_pies.on("mouseover", new_piecharttip.show)
        		.on("mouseout", new_piecharttip.hide);



	}

	



}).catch(function(error){
    console.log(error);
});