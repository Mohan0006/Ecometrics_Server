const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Load the model from the converted directory
async function loadModel() {
  const modelPath = 'path/to/your/output/model_tfjs/model.json'; // Update with the actual converted model path
  const model = await tf.loadLayersModel(`file://${modelPath}`);
  return model;
}

// Load input data
function loadInputData() {
  const inputDataPath = 'path/to/your/input_data.json'; // Replace with the actual input data path
  const inputData = JSON.parse(fs.readFileSync(inputDataPath, 'utf-8'));
  return inputData;
}

// Run the model
async function runModel() {
  const model = await loadModel();
  const inputData = loadInputData();

  // Convert the input data to a TensorFlow tensor
  const inputTensor = tf.tensor(inputData);

  // Get the model's output
  const output = model.predict(inputTensor);

  // Convert the output to a JavaScript array
  const outputData = output.arraySync();

  // Print the output
  console.log('Model Output:', outputData);

  // Cleanup
  tf.dispose(inputTensor);
  tf.dispose(output);
  model.dispose();
}

runModel();
