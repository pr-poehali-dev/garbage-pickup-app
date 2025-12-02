import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    tariff: '',
    duration: ''
  });

  const tariffs = [
    {
      id: 'one-time-5kg',
      name: 'Разовый вывоз до 5 кг',
      price: '50',
      icon: 'PackageOpen',
      features: ['Вывоз в течение суток', 'До 5 кг', 'Без абонплаты']
    },
    {
      id: 'one-time-10kg',
      name: 'Разовый вывоз до 10 кг',
      price: '100',
      icon: 'Package',
      features: ['Вывоз в течение суток', 'До 10 кг', 'Без абонплаты']
    },
    {
      id: 'weekly',
      name: 'Еженедельный',
      price: '350',
      period: '/месяц',
      icon: 'Calendar',
      features: ['Вывоз раз в неделю', 'До 10 кг за раз', 'Выгодная подписка']
    },
    {
      id: 'daily',
      name: 'Ежедневный',
      price: '3500',
      period: '/месяц',
      icon: 'CalendarCheck',
      features: ['Вывоз каждый день', 'Без лимитов', 'Экономия 40%']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.tariff || !formData.duration) {
      toast({
        title: 'Заполните все поля',
        description: 'Пожалуйста, укажите все данные для заключения договора',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время для подтверждения договора'
    });
    
    setFormData({
      name: '',
      phone: '',
      address: '',
      tariff: '',
      duration: ''
    });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const updateCalculation = () => {
    const tariffSelect = document.getElementById('calc-tariff');
    const timesInput = document.getElementById('calc-times') as HTMLInputElement;
    const resultElement = document.getElementById('calc-result');
    
    if (!tariffSelect || !timesInput || !resultElement) return;
    
    const selectedTariffId = tariffSelect.getAttribute('data-value') || 'one-time-5kg';
    const times = parseInt(timesInput.value) || 1;
    
    const selectedTariff = tariffs.find(t => t.id === selectedTariffId);
    if (!selectedTariff) return;
    
    let totalPrice = 0;
    
    if (selectedTariff.period) {
      totalPrice = parseInt(selectedTariff.price);
    } else {
      totalPrice = parseInt(selectedTariff.price) * times;
    }
    
    resultElement.textContent = `${totalPrice} ₽`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/e874aa52-8b3e-4c07-acd3-a414ac9f3d84.jpg" 
              alt="Мусорок логотип" 
              className="h-12 object-contain"
            />
          </div>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" onClick={() => scrollToSection('tariffs')}>
              Тарифы
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection('contract')}>
              Договор
            </Button>
          </nav>
          <div className="flex items-center gap-3">
            <Button onClick={() => scrollToSection('contract')} className="bg-primary hover:bg-primary/90 hidden md:flex">
              Оформить
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </Button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] z-40 bg-white/95 backdrop-blur-md animate-fade-in">
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-lg py-6"
              onClick={() => scrollToSection('tariffs')}
            >
              <Icon name="DollarSign" size={20} className="mr-3" />
              Тарифы
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-lg py-6"
              onClick={() => scrollToSection('contract')}
            >
              <Icon name="FileText" size={20} className="mr-3" />
              Договор
            </Button>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-lg py-6 mt-4"
              onClick={() => scrollToSection('contract')}
            >
              <Icon name="Send" size={20} className="mr-2" />
              Оформить заявку
            </Button>
          </nav>
        </div>
      )}

      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="mx-auto mb-6 animate-scale-in">
            <img 
              src="https://cdn.poehali.dev/files/e874aa52-8b3e-4c07-acd3-a414ac9f3d84.jpg" 
              alt="Мусорок логотип" 
              className="h-24 mx-auto object-contain"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">
            Вывоз мусора от двери до бака
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Забудьте о неудобстве выноса мусора. Мы заберем его прямо у вашей двери и доставим до контейнера
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            onClick={() => scrollToSection('tariffs')}
          >
            Посмотреть тарифы
            <Icon name="ArrowDown" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-4 text-secondary">
            Почему выбирают нас
          </h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Мы делаем вашу жизнь комфортнее, избавляя от рутинной задачи выноса мусора
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg hover:bg-primary/5 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} className="text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2">Экономия времени</h4>
              <p className="text-sm text-muted-foreground">
                Не тратьте время на походы к баку — мы всё сделаем за вас
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:bg-primary/5 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Sparkles" size={32} className="text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2">Чистота в подъезде</h4>
              <p className="text-sm text-muted-foreground">
                Мусор забираем аккуратно, не оставляя следов и запахов
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:bg-primary/5 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2">Надёжность</h4>
              <p className="text-sm text-muted-foreground">
                Работаем по договору с гарантией выполнения услуги
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:bg-primary/5 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Heart" size={32} className="text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2">Забота о природе</h4>
              <p className="text-sm text-muted-foreground">
                Сортируем отходы и заботимся об экологии вашего района
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="tariffs" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-secondary">
            Выберите подходящий тариф
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tariffs.map((tariff, idx) => (
              <Card 
                key={tariff.id} 
                className="hover-scale cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={tariff.icon as any} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{tariff.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-primary mt-2">
                    {tariff.price} ₽
                    {tariff.period && <span className="text-base text-muted-foreground">{tariff.period}</span>}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tariff.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold text-center mb-4 text-secondary">
            Калькулятор стоимости
          </h3>
          <p className="text-center text-muted-foreground mb-12">
            Рассчитайте стоимость вывоза мусора на месяц
          </p>
          
          <Card className="shadow-xl">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="calc-tariff">Выберите тариф</Label>
                  <Select 
                    defaultValue="one-time-5kg" 
                    onValueChange={(value) => {
                      const select = document.getElementById('calc-tariff') as HTMLSelectElement;
                      if (select) select.setAttribute('data-value', value);
                      updateCalculation();
                    }}
                  >
                    <SelectTrigger id="calc-tariff">
                      <SelectValue placeholder="Выберите тариф" />
                    </SelectTrigger>
                    <SelectContent>
                      {tariffs.map((tariff) => (
                        <SelectItem key={tariff.id} value={tariff.id}>
                          {tariff.name} — {tariff.price} ₽{tariff.period || ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calc-times">Количество вывозов в месяц</Label>
                  <Input
                    id="calc-times"
                    type="number"
                    min="1"
                    max="31"
                    defaultValue="4"
                    onChange={updateCalculation}
                    placeholder="Введите количество"
                  />
                </div>

                <div className="bg-primary/5 rounded-lg p-6 text-center">
                  <p className="text-muted-foreground mb-2">Итоговая стоимость в месяц:</p>
                  <p className="text-4xl font-bold text-primary" id="calc-result">200 ₽</p>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 py-6"
                  onClick={() => scrollToSection('contract')}
                >
                  Оформить договор
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-4 text-secondary">
            Отзывы наших клиентов
          </h3>
          <p className="text-center text-muted-foreground mb-12">
            Более 500 довольных клиентов уже пользуются нашим сервисом
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Отличный сервис! Больше не нужно таскать тяжёлые мешки через весь подъезд. Ребята приходят точно по расписанию."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Мария К.</p>
                    <p className="text-sm text-muted-foreground">Еженедельный тариф</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Очень удобно для пожилых людей. Моя бабушка в восторге — теперь ей не нужно спускаться с 5 этажа с мусором."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Алексей Н.</p>
                    <p className="text-sm text-muted-foreground">Ежедневный тариф</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Пользуемся уже полгода. Цена адекватная, сервис на высоте. Всем рекомендую, особенно молодым семьям с детьми."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Ольга П.</p>
                    <p className="text-sm text-muted-foreground">Еженедельный тариф</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contract" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <h3 className="text-3xl font-bold text-center mb-4 text-secondary">
            Заключить договор
          </h3>
          <p className="text-center text-muted-foreground mb-8">
            Заполните форму, и мы свяжемся с вами для подтверждения
          </p>
          
          <Card className="shadow-xl">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Textarea
                    id="address"
                    placeholder="Город, улица, дом, квартира"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tariff">Выберите тариф</Label>
                  <Select value={formData.tariff} onValueChange={(value) => setFormData({ ...formData, tariff: value })}>
                    <SelectTrigger id="tariff">
                      <SelectValue placeholder="Выберите тариф" />
                    </SelectTrigger>
                    <SelectContent>
                      {tariffs.map((tariff) => (
                        <SelectItem key={tariff.id} value={tariff.id}>
                          {tariff.name} — {tariff.price} ₽{tariff.period || ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Срок договора</Label>
                  <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Выберите срок" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 месяц</SelectItem>
                      <SelectItem value="3">3 месяца</SelectItem>
                      <SelectItem value="6">6 месяцев</SelectItem>
                      <SelectItem value="12">12 месяцев</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg">
                  Отправить заявку
                  <Icon name="Send" size={20} className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://cdn.poehali.dev/files/e874aa52-8b3e-4c07-acd3-a414ac9f3d84.jpg" 
              alt="Мусорок логотип" 
              className="h-12 object-contain brightness-0 invert"
            />
          </div>
          <p className="text-white/80">Сервис вывоза мусора от двери до бака</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;