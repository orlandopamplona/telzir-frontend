/**
 * @description Include all environment variables with their default values.
*/
export const environment = {
    apiServerPort: { port: process.env.API_SERVER_PORT || 3001 },
    apiServerUrl: { url: process.env.API_SERVER_URL || 'http://localhost' }
}