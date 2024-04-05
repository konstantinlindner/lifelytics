'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Database() {
	return (
		<main>
			<Tabs defaultValue="cities">
				<div className="flex items-center">
					<TabsList>
						<TabsTrigger value="cities">Cities</TabsTrigger>
						<TabsTrigger value="countries">Countries</TabsTrigger>
						<TabsTrigger value="currencies">Currencies</TabsTrigger>
						<TabsTrigger value="airports">Airports</TabsTrigger>
						<TabsTrigger value="airlines">Airlines</TabsTrigger>
						<TabsTrigger value="airlineAlliances">
							Airline alliances
						</TabsTrigger>
						<TabsTrigger value="flightClasses">
							Flight classes
						</TabsTrigger>
						<TabsTrigger value="flightLuggageCategories">
							Flight luggage categories
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="cities">Cities</TabsContent>
				<TabsContent value="countries">Countries</TabsContent>
				<TabsContent value="currencies">Currencies</TabsContent>
				<TabsContent value="airports">Airports</TabsContent>
				<TabsContent value="airlines">Airlines</TabsContent>
				<TabsContent value="airlineAlliances">
					Airline alliances
				</TabsContent>
				<TabsContent value="flightClasses">Flight classes</TabsContent>
				<TabsContent value="flightLuggageCategories">
					Flight luggage categories
				</TabsContent>
			</Tabs>
		</main>
	)
}
