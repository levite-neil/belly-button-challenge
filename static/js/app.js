// URL for that contains the sample data.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";



function init(){
    //Getting a reference to the input element on the pages
    let dropdown = d3.select("#selDataset");
    d3.json(url).then((data) => {
        for (i=0; i < data.names.length; i++){
            dropdown.append("option").text(data.names[i]).property("value",data.names[i])
        };
    });
    buildcharts(940);
    buildmetadata(940);

}

function buildcharts(name){
    d3.json(url).then((data) => {
        //console.log(data.samples.filter(obj => obj.id == name));
        let otu_ids = data.samples.filter(obj => obj.id == name)[0].otu_ids;
        let sample_values = data.samples.filter(obj => obj.id == name)[0].sample_values;
        let otu_labels = data.samples.filter(obj => obj.id == name)[0].otu_labels;
        let bardata = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(obj => `otu${obj}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }]
        Plotly.newPlot("bar",bardata)
        let bubbledata = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {size:sample_values,color:otu_ids,colorscale:"Earth"}
        }]
        let bubblelayout = {xaxis:{title:"otu_id"}}
        Plotly.newPlot("bubble",bubbledata,bubblelayout)
    } )
}

function buildmetadata(name){
    d3.json(url).then((data) => {
        let panel = d3.select("#sample-metadata");
        let metadata = data.metadata.filter(obj => obj.id == name)[0]
        panel.html("");
        for (datapoint in metadata){
            panel.append("h4").text(`${datapoint}: ${metadata[datapoint]}` )
        }
    } )

}

function optionChanged(name){
    buildcharts(name);
    buildmetadata(name);
}

// 
// //Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

// //Collecting data from remote json file
// let test_subject = dataPromise.then(data => data.samples.id.slice(0,10));
// console.log("Names of subject:",test_subject);

// let sample = dataPromise.then(data => data.samples[0].sample_values.slice(0,10));
// console.log("Hello There",sample);

// let sampName = dataPromise.then(data => data.samples[0].otu_ids.slice(0,10));
// console.log("Hello Names",sampName);

// let samplabel = dataPromise.then(data => data.samples[0].otu_labels.slice(0,10));
// console.log("Hello lables",samplabel);

// function optionChanged(test_subject){
//     dropdown = test_subject;
//    };
    // Fetch the JSON data and console log it
//d3.json(url).then(data => console.log(data));

//const sampleName = d3.json(url);
//sampleName.then((sampdata) => {

    //console.log(d3.select(sampdata.samples[0]))
    //d3.select(sampdata.samples[0].sample_values)
//    console.log(d3.select(sampdata.samples[0].sample_values))

//    });

init();



