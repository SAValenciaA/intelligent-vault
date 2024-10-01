const { spawn } = require('node:child_process');



export async function POST(req) {

  // TODO: make the scripts accept json inputs so this is shorter
  const generateNN = spawn(
    'python', 
    [
      "app/scripts/generateNN.py", 
      body["password"],
      body["secret"],
      body["learningRate"],
      body["maxEpochs"],
      body["hiddenLayers"],
      body["extraNeurons"],
      body["modelName"]
    ]
  )
  generateNN.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  generateNN.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  generateNN.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  
  return new Response(JSON.stringify(body), {
    status: 200
  })
}
