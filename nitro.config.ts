//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-01-30',
  alias: {
    '@': './server',
    '@db': './server/db',
    '@models': './server/models',
    '@routes': './server/routes',
    '@test': './server/test',
    '@utils': './server/utils',
  },
  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    },
  },
});
