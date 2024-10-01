const { spawn } = require('node:child_process');

export async function POST(req) {

  const body = await req.json()

  // TODO: make the scripts accept json inputs so this is shorter
  const generateNN = spawn(
    'python', 
    [
      "app/scripts/generateNN.py", 
      body["Password"],
      body["Secret"],
      body["Learning_rate"],
      body["Max_epochs"],
      body["Hidden_layers"],
      body["Extra_neurons"],
      body["Min_match"],
      body["Model_name"]
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
