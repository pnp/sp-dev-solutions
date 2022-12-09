import chalk from 'chalk';


function log(message: string): void {
  console.log(chalk.blue(message));
}

async function logEvent<T>(actionName: string, request: Promise<T>): Promise<Awaited<T>> {
  console.log(chalk.yellow(actionName + '...'));
  console.log(chalk.grey('*'.repeat(80)));
  const response: Awaited<T> = await request;
  console.log(chalk.green(`${actionName} successfully`));
  console.log(chalk.grey('*'.repeat(80)));
  return response;
}

function logToken(token: any) {
  console.log(chalk.green('Get token successfully'));
  console.log(token);
  console.log(chalk.grey('*'.repeat(80)));
}

export default {
  logToken,
  logEvent,
  log
};
