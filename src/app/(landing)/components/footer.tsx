import Logo from '@/components/logo'

function Footer() {
	return (
		<footer>
			<div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
				<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<Logo hideText />
					<p className="text-center text-sm leading-loose md:text-left">
						Built by{' '}
						<a
							href={'https://github.com/konstantinlindner'}
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							Konstantin Lindner.
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
