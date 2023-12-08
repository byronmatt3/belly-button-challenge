// read in json
const URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(URL).then(function(data){
    console.log(data);
});

// function to group other functions into dashboard
function init() {
    let dropdownMenu = d3.select("#selDataset");

    //create dropdown
    d3.json(URL).then((data) => {
        let names = data.names;
        names.forEach((id) => {
            console.log(id);
            dropdownMenu.append("option")
            .text(id)
            .property("value", id);
        });

        //initial values
        let init_sample = names[0];
        console.log(init_sample);

        //initial plots
        barChart(init_sample);
        bubbleChart(init_sample);
        metadata(init_sample);
    });
};

// Function for bar chart
function barChart(sample) {

    // Get data for bar chart
    d3.json(URL).then((data) => {
        let sampleInfo = data.samples;
        let value = sampleInfo.filter(item => item.id == sample);
        let valueData = value[0];

        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0, 10).reverse();
        let labels = otu_labels.slice(0, 10).reverse();

        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h",
        };

        let layout = {
            title: "Top 10 OTUs Present"
        };

        Plotly.newPlot("bar", [trace], layout)        
    });
};


// Function for bubble chart
function bubbleChart(sample) {

    // Get data for bubble chart
    d3.json(URL).then((data) => {
        let sampleInfo = data.samples;
        let value = sampleInfo.filter(item => item.id == sample);
        let valueData = value[0];

        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        let trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        };

        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            title: "OTU ID",
        };

        Plotly.newPlot("bubble", [trace], layout)
    });
};

// Function for populating dropdown info
function metadata(sample) {

    //Get data for dropdown
    d3.json(URL).then((data) => {
        let metadata = data.metadata;
        let value = metadata.filter(item => item.id == sample);
        console.log(value)

        // first index from array
        let valueData = value[0];

        // clear out data
        d3.select("#sample-metadata").html("");

        // Add Key/value pair
        Object.entries(valueData).forEach(([key,value]) => {
            console.log(key, value);

        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

     });
};

// Function for updating when value is changed
function optionChanged(value) {

    console.log(value);

    metadata(value);
    barChart(value);
    bubbleChart(value);
};

// Call the initial function
init();