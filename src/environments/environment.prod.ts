export const environment = {
  production: true,
  firebase: {
    apiKey: getEnvVariable('FIREBASE_API_KEY'),
    authDomain: getEnvVariable('FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVariable('FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVariable('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVariable('FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVariable('FIREBASE_APP_ID'),
    measurementId: getEnvVariable('FIREBASE_MEASUREMENT_ID'),
  }
};

function getEnvVariable(name: string): string {
  const value = (window as any)[`env_${name}`];
  if (!value) {
    console.warn(`Environment variable ${name} is not set. Please configure your environment.`);
  }
  return value || '';
}
