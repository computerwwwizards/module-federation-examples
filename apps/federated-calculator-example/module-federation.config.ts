import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'federatedCalculatorExample',
  exposes: {
    '.': './src/components/ProviderComponent.tsx',
  },
  getPublicPath: `function(){return'http://localhost:3002/'}`,
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router': { singleton: true }
  },
});
