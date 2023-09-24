import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	collectCoverageFrom: ['src/**/*.ts'],
};

export default config;
