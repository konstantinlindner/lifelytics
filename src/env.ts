import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		CLOUDINARY_API_KEY: z
			.string()
			.min(1)
			.refine(
				(str) => !str.includes('YOUR_CLOUDINARY_API_KEY'),
				'You forgot to change the default Cloudinary API key',
			),
		CLOUDINARY_API_SECRET: z
			.string()
			.min(1)
			.refine(
				(str) => !str.includes('YOUR_CLOUDINARY_API_SECRET'),
				'You forgot to change the default Cloudinary API secret',
			),
		CLOUDINARY_NAME: z
			.string()
			.min(1)
			.refine(
				(str) => !str.includes('YOUR_CLOUDINARY_NAME'),
				'You forgot to change the default Cloudinary name',
			),
	},

	client: {
		NEXT_PUBLIC_SUPABASE_URL: z
			.string()
			.url()
			.refine(
				(str) => !str.includes('YOUR_SUPABASE_URL'),
				'You forgot to change the default Supabase URL',
			),
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z
			.string()
			.min(1)
			.refine(
				(str) => !str.includes('YOUR_SUPABASE_ANON_KEY'),
				'You forgot to change the default Supabase anon key',
			),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
		CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
		CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY:
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	},
	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
	 * useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	/**
	 * Makes it so that empty strings are treated as undefined.
	 * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
})
