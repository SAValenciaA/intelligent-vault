const { spawn } = require('node:child_process');



export async function POST(req) {

  const body = await req.json()

  const removeNN = spawn(
    'python', 
    [
      "app/scripts/rmNN.py",
      `${body["modelName"]}`,
    ]
  )
  removeNN.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  removeNN.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  
  return new Response(body["modelName"], {
    status: 200
  })
}
