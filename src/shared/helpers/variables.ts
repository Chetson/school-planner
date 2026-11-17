export const getFromProcessEnv = (key: string, defaultValue = '') => {
  try {
    return import.meta.env[key] || defaultValue;
  } catch (err) {
    console.error(err);

    return defaultValue;
  }
};

export const globalVariables = {
  IS_MOCK: getFromProcessEnv('VITE_MOCK') === 'true',
  BACKEND_URL: getFromProcessEnv(
    'VITE_BACKEND_URL',
    'http://localhost:8080',
  ),
};
