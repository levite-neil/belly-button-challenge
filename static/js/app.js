// URL for that contains the sample data.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


//The inital function to created the test subject ID dropdown menu then calls buildchart and buildmetadata functions
function init(){
    //Getting a reference to the input element on the index.html page
    let dropdown = d3.select("#selDataset");

    //Using d3 to query the remote samples.json file
    d3.json(url).then((data) => {

        //Creates the dropdown menu options and the values for those options
        for (i=0; i < data.names.length; i++){
            dropdown.append("option").text(data.names[i]).property("value",data.names[i])
        };
    });
    //Calling the functions with set initial values
    buildcharts(940);
    buildmetadata(940);

}



//function to build the chart
function buildcharts(name){
    d3.json(url).then((data) => {
        
        //Filtering data and assigning it to a variable
        let otu_ids = data.samples.filter(obj => obj.id == name)[0].otu_ids;
        let sample_values = data.samples.filter(obj => obj.id == name)[0].sample_values;
        let otu_labels = data.samples.filter(obj => obj.id == name)[0].otu_labels;

        //Creating a trace for the bar data
        let bardata = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(obj => `otu${obj}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }]
        Plotly.newPlot("bar",bardata)

        //Creating a trace for the bubble data
        let bubbledata = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {size:sample_values,color:otu_ids,colorscale:"Earth"}
        }]

        //Creating a layout of the bubble trace
        let bubblelayout = {
            xaxis:{title:"otu_id"}
        }
        Plotly.newPlot("bubble",bubbledata,bubblelayout)
    } )
}
//Functon to present the metadata
function buildmetadata(name){
    d3.json(url).then((data) => {

        //Selecting the location in the HTML to present data
        let panel = d3.select("#sample-metadata");

        //Filtering data and assigning it to variable
        let metadata = data.metadata.filter(obj => obj.id == name)[0]
        panel.html("");

        //Presents all the metadata for the selected datapoint
        for (datapoint in metadata){
            panel.append("h4").text(`${datapoint}: ${metadata[datapoint]}` )
        }
    } )

}

//Function to call buildchars and buildmetadata on the change of the value from the dropdown menu
function optionChanged(name){
    buildcharts(name);
    buildmetadata(name);
}

//Function called on the inital loading of the HTML page
init();



