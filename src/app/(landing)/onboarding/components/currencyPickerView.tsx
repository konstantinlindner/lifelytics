import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CurrencyPickerViewProps {
  currentViewIndex: number;
  setCurrentViewIndex: (view: number) => void;
}

const currencies = ['SEK', 'EUR', 'USD', 'CAD', 'MXN', 'KRW', 'JPY'] as const;
type Currency = (typeof currencies)[number];

export default function CurrencyPickerView({
  currentViewIndex,
  setCurrentViewIndex,
}: CurrencyPickerViewProps) {
  const [selectedCurrencies, setSelectedCurrencies] = useState<Currency[]>([]);

  return (
    <section className="w-full space-y-10 flex flex-col items-center">
      <div className="flex space-x-1 border border-black rounded-lg px-10 py-12">
        {currencies.map((currency) => (
          <button
            key={currency}
            onClick={() =>
              setSelectedCurrencies((current) =>
                current.includes(currency)
                  ? current.filter((x) => x !== currency)
                  : [...current, currency],
              )
            }
          >
            <Badge
              className="text-sm"
              variant={
                selectedCurrencies.includes(currency) ? 'default' : 'outline'
              }
            >
              {currency}
            </Badge>
          </button>
        ))}
      </div>

      <Button
        disabled={selectedCurrencies.length === 0}
        variant={selectedCurrencies.length === 0 ? 'secondary' : 'default'}
        className="w-60"
        onClick={() => setCurrentViewIndex(currentViewIndex + 1)}
      >
        Next
      </Button>
    </section>
  );
}
