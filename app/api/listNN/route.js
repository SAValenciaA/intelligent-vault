const { spawn } = require('node:child_process');

export async function GET() {

  const listNN = spawn(
    'ls', 
    [
      "app/scripts/models/"
    ]
  )
  listNN.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  listNN.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  
  return new Response(listNN.stdout, {
    status: 200
  })
}
