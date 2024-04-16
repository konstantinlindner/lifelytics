import createJiti from 'jiti'
import { fileURLToPath } from 'node:url'

const jiti = createJiti(fileURLToPath(import.meta.url))

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
jiti('./src/env')

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '8mb',
		},
	},
}

export default nextConfig
