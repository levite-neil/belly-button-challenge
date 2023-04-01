# belly-button-challenge

Using the D3 library this app will read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

It will create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual. The sample_values are used as the values for the bar chart. The otu_ids are used as the labels for the bar chart and the otu_labels are used as the hovertext for the chart.

The bubble chart is updated based on the selected sample ID. The x-values are the otu_ids and y values are the sample_values. The marker size is based on the the sample_values and the colors are deteremined by the otu_ids. The otu_lables are the text values in the bubble chart.

The sample metadata is displad based on the selected sample id presenting individual's demographic information.

The app has been posted on the GitHub Pages.