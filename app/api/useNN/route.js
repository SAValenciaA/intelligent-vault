const { spawn } = require('node:child_process');

export async function POST(req) {

  const body = await req.json()

  // TODO: make the scripts accept json inputs so this is shorter
  const testNN = spawn(
    'python', 
    [
      "app/scripts/useNN.py", 
      body["modelName"],
      body["password"],
    ]
  )

  var generation = ""

  testNN.stdout.on('data', (data) => {
    generation = `${data}`
  });
  testNN.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  return new Response(testNN.stdout, {
    status: 200
  })
}
