import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import CounterpartsCard from './components/counterparts/counterparts-card'
import PaymentMethodsCard from './components/payment-methods/payment-methods-card'

export default function Constants() {
	return (
		<main>
			<Tabs defaultValue="paymentMethods" className="flex flex-col gap-4">
				<div className="flex items-center">
					<TabsList>
						<TabsTrigger value="paymentMethods">
							Payment methods
						</TabsTrigger>
						<TabsTrigger value="counterparts">
							Counterparts
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="paymentMethods">
					<PaymentMethodsCard />
				</TabsContent>
				<TabsContent value="counterparts">
					<CounterpartsCard />
				</TabsContent>
			</Tabs>
		</main>
	)
}
