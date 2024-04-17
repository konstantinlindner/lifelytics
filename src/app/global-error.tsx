'use client'

import { useEffect } from 'react'

import Error from 'next/error'

import * as Sentry from '@sentry/nextjs'

type GlobalErrorProps = {
	error: unknown
}

export default function GlobalError({ error }: GlobalErrorProps) {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<html>
			<body>
				<Error statusCode={500} />
			</body>
		</html>
	)
}
