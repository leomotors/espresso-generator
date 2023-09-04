import { spawn } from "node:child_process";

export async function execute(process: string, stdin: string) {
  const task = spawn(process, { stdio: ["pipe", "pipe", "ignore"] });
  task.stdin.setDefaultEncoding("utf-8");
  task.stdin.write(stdin);
  task.stdin.write("\n");

  let output = "";

  task.stdout.on("data", (data) => {
    output += data.toString();
  });

  return new Promise<string>((resolve, reject) => {
    task.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(code);
      }
    });
  });
}
