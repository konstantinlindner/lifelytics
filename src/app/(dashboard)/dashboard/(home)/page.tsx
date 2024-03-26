import { DateRangePicker } from '../components/date-range-picker'
import CurrencyPicker from './components/currency-picker'
import Stats from './components/stats'

export default function Home() {
	return (
		<main className="flex flex-col gap-5">
			<div className="flex gap-2">
				<CurrencyPicker />
				<DateRangePicker />
			</div>

			<Stats />
		</main>
	)
}
