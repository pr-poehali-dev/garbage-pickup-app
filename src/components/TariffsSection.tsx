import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface TariffsSectionProps {
  tariffs: Array<{
    id: string;
    name: string;
    price: string;
    period?: string;
    icon: string;
    features: string[];
  }>;
  updateCalculation: () => void;
  scrollToSection: (id: string) => void;
}

const TariffsSection = ({ tariffs, updateCalculation, scrollToSection }: TariffsSectionProps) => {
  return (
    <section id="tariffs" className="py-20 px-4 bg-gradient-to-br from-secondary/10 via-background to-primary/5">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <Icon name="DollarSign" size={36} />
          Наши тарифы
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {tariffs.map((tariff) => (
            <Card 
              key={tariff.id} 
              className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-[#90C850] bg-white/80 backdrop-blur-sm"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name={tariff.icon} size={28} className="text-[#90C850]" />
                  {tariff.name}
                </CardTitle>
                <CardDescription className="text-3xl font-bold text-[#90C850] mt-2">
                  {tariff.price} ₽{tariff.period && <span className="text-lg">{tariff.period}</span>}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tariff.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-[#90C850] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => scrollToSection('contract')} 
                  className="w-full bg-[#90C850] hover:bg-[#7AB840] text-white"
                >
                  Выбрать тариф
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-md mx-auto border-2 border-[#90C850] shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Icon name="Calculator" size={28} className="text-[#90C850]" />
              Калькулятор стоимости
            </CardTitle>
            <CardDescription>Рассчитайте стоимость вывоза мусора</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="calc-tariff">Выберите тариф</Label>
              <Select onValueChange={updateCalculation}>
                <SelectTrigger id="calc-tariff">
                  <SelectValue placeholder="Выберите тариф" />
                </SelectTrigger>
                <SelectContent>
                  {tariffs.map((tariff) => (
                    <SelectItem key={tariff.id} value={tariff.id}>
                      {tariff.name} - {tariff.price} ₽{tariff.period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="calc-times">Количество раз (для разового)</Label>
              <Input 
                id="calc-times" 
                type="number" 
                min="1" 
                defaultValue="1"
                onChange={updateCalculation}
              />
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Итоговая стоимость:</p>
              <p id="calc-result" className="text-3xl font-bold text-[#90C850]">0 ₽</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TariffsSection;