async function log<T>(actionName: string, request: Promise<T>): Promise<Awaited<T>> {
  console.log(actionName + '...');
  console.log('*'.repeat(80));
  const response: Awaited<T> = await request;
  console.log(`${actionName} successfully`);
  console.log('*'.repeat(80));
  return response;
}

function logToken(token: any) {
  console.log('Get token successfully');
  console.log(token);
  console.log('*'.repeat(80));
}

export default {
  logToken,
  log
};
