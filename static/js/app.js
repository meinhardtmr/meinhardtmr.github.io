const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let samples = [];
let metadata = [];
//let logging = false;
let logging = true;

function populateDemoInfo(id){
  //logging?console.log('populateDemoInfo: ', id, metadata.find(o => o.id == id).id): '' ;
  console.log('populateDemoInfo: ', id, metadata.find(o => o.id == id).id);
  
  let str = `<p>id:        ${metadata.find(o => o.id == id).id}        </p>
             <p>ethnicity: ${metadata.find(o => o.id == id).ethnicity} </p>
             <p>gender:    ${metadata.find(o => o.id == id).gender}    </p>
             <p>age:       ${metadata.find(o => o.id == id).age}       </p>
             <p>location:  ${metadata.find(o => o.id == id).location}  </p>
             <p>bbtype:    ${metadata.find(o => o.id == id).bbtype}    </p>
             <p>wfreq:     ${metadata.find(o => o.id == id).wfreq}     </p>`;
   
  document.getElementById("sample-metadata").innerHTML = str 
  return;
}

function createHBarChart(id){
  //logging?console.log('createHBarChart: ', id, samples.find(o => o.id == id).id): '' ;
  console.log('createHBarChart: ', id, samples.find(o => o.id == id).id);
  
  let trace1 = {
    x: samples.find(o => o.id == id).sample_values.slice(0,10).reverse(),
    y: samples.find(o => o.id == id).otu_ids.slice(0,10).map(n => `OTU ${n}`).reverse(),
    type: 'bar',
    orientation: 'h',
    text: samples.find(o => o.id == id).otu_labels.slice(0,10).reverse()
  };

  let data = [trace1];
  Plotly.newPlot("bar", [trace1]);

  return;
}

function createBubbleChart(id){
  //logging?console.log('createHBarChart: ', id, samples.find(o => o.id == id).id): '' ;
  console.log('createBubbleChart: ', id, samples.find(o => o.id == id).id);
  
  let trace1 = {
    x: samples.find(o => o.id == id).sample_values.slice(0,10).reverse(),
    y: samples.find(o => o.id == id).otu_ids.slice(0,10).map(n => `OTU ${n}`).reverse(),
    type: 'bar',
    orientation: 'h',
    text: samples.find(o => o.id == id).otu_labels.slice(0,10).reverse()
  };

  let data = [trace1];
  Plotly.newPlot("bar", [trace1]);

  return;
}

async function optionChanged(value){
  //logging?console.log('optionChanged', value, samples.find(o => o.id == value).id, metadata.find(o => o.id == value).id):null;
  console.log('optionChanged', value, samples.find(o => o.id == value).id, metadata.find(o => o.id == value).id);
  
  await Promise.all([populateDemoInfo(value),
                     createHBarChart(value),
                     createBubbleChart(value)]);

  console.log('optionChanged Complete', value, samples.find(o => o.id == value).id, metadata.find(o => o.id == value).id);

  return;
}
 
// Promise Pending
const dataPromise = d3.json(url);
logging?console.log("Data Promise: ", dataPromise):null;

// Fetch the JSON data  
d3.json(url).then(function(data) {
  logging?console.log('Data: ', data):null;
  
  //Populate select element with json.
  let ele = document.getElementById('selDataset');
  for (i in data.metadata) { 
    ele.innerHTML = ele.innerHTML + '<option value="' + data.samples[i].id + '">' + data.samples[i].id + '</option>';
    
    //Store JSON in an array
    samples.push(data.samples[i]);
    metadata.push(data.metadata[i]); 
  }

    //Initialize page
    logging?console.log('Value: ', ele.value):null;
    optionChanged(ele.value);

  }
);

