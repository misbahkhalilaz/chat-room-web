import mockConfig from 'src/config/next.runtimeConfig';

// Makes sure you can use "publicRuntimeConfig" within tests.
jest.mock('next/config', () => () => ({
    publicRuntimeConfig: mockConfig.publicRuntimeConfig,
}));
