# belly-button-challenge
Module 14 Challenge 
Background
This challenge concerns data from the Belly Button Biodiversity dataset. My challenge was to create a dashboard to display a bar chart and bubble chart to visualize the number and strain of bacteria in samples taken from each test subject. It also displays demographic information and allows a user to switch between test subjects.

Dashboard Elements
I used the D3 library to read from the given URL: "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

I created a function to call the following functions and initialize the charts with the data from the first sample.

I created a bar chart showing the top ten OTUs found on the test subject.

I created a bubble chart to display the bacteria present in the samples taken from the test subject.

I used the metadata to show demographic data.

I created a function to update the charts when the a new test subject is selected in the dropdown menu.
