import { env } from '$env/dynamic/private';

const DEV_ENVIRONMENT = {
	API: env.API_HOST_DEV
};

const PROD_ENVIRONMENT = {
	API: env.API_HOST_PROD
};

export function getCurrentEnv(url: URL) {
	return url.host === '' ? PROD_ENVIRONMENT : DEV_ENVIRONMENT;
}
