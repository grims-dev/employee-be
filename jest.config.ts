import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	collectCoverageFrom: ['src/**/*.ts'],
	testPathIgnorePatterns: ['node_modules', 'build'],
};

export default config;
