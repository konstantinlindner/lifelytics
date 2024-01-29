import Link from 'next/link'

import { Coins, DollarSign, Dumbbell, Heart, Plane, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import Footer from './components/footer'
import Navbar from './components/navbar'

export default function Home() {
	return (
		<main>
			<Navbar />

			<section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
				<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
						Visualize the statistics of your life and take control
						of your future
					</h1>
					<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
						Lifelytics is a base for your productivity and
						well-being. Track and visualize your personal finances,
						health and other life stats in one simple to use tool.
					</p>
					<div className="space-x-4">
						<Link
							href={'https://github.com/konstantinlindner'}
							target="_blank"
							rel="noreferrer"
						>
							<Button size="lg" variant="outline">
								Watch the video
							</Button>
						</Link>

						<Link href={'/sign-up'}>
							<Button size="lg" variant="default">
								Get started
							</Button>
						</Link>
					</div>
				</div>
			</section>

			<section
				id="features"
				className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
			>
				<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
					<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
						Features
					</h2>
					<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						Lifelytics includes tools to track your travels -
						including flights and other modes of transportation,
						your personal finances, health, workouts and so much
						more.
					</p>
				</div>
				<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<Plane className="h-12 w-12" />
							<div className="space-y-2">
								<h3 className="font-bold">Travel</h3>
								<p className="text-sm text-muted-foreground">
									Follow how much, to where, and in what ways
									you tend to travel.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<Heart className="h-12 w-12" />
							<div className="space-y-2">
								<h3 className="font-bold">Health</h3>
								<p className="text-sm text-muted-foreground">
									Track health vitals, vaccines, and other
									markers over time.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<Dumbbell className="h-12 w-12" />
							<div className="space-y-2">
								<h3 className="font-bold">Workouts</h3>
								<p className="text-sm text-muted-foreground">
									Create workout plans, track your progress
									over time.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<Coins className="h-12 w-12" />
							<div className="space-y-2">
								<h3 className="font-bold">Budget</h3>
								<p className="text-sm text-muted-foreground">
									Set up a budget and we have the tools to
									make sure you stick to it.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<DollarSign className="h-12 w-12" />
							<div className="space-y-2">
								<h3 className="font-bold">Spending</h3>
								<p className="text-sm text-muted-foreground">
									Track your spending over the months and
									years.
								</p>
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border bg-background p-2">
						<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
							<Plus className="h-12 w-12" />
							<div className="space-y-2">
								<h3 className="font-bold">And more</h3>
								<p className="text-sm text-muted-foreground">
									More features are continously added every
									month.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section
				id="open-source"
				className="container py-8 md:py-12 lg:py-24"
			>
				<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
					<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
						Proudly Open Source
					</h2>
					<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						Lifelytics is open source and powered by open source
						software. <br /> The code is available on{' '}
						<Link
							href={'https://github.com/konstantinlindner'}
							target="_blank"
							rel="noreferrer"
							className="underline underline-offset-4"
						>
							GitHub
						</Link>
						.{' '}
					</p>
				</div>
			</section>

			<Footer />
		</main>
	)
}
