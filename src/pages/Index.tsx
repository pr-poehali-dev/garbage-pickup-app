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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    tariff: '',
    duration: ''
  });

  const tariffs = [
    {
      id: 'one-time',
      name: 'Разовый вывоз',
      price: '500',
      icon: 'Trash2',
      features: ['Вывоз в течение суток', 'До 5 мешков', 'Без абонплаты']
    },
    {
      id: 'weekly',
      name: 'Еженедельный',
      price: '1500',
      period: '/месяц',
      icon: 'Calendar',
      features: ['Вывоз раз в неделю', 'До 10 мешков', 'Экономия 25%']
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
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Trash2" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-secondary">Мусорок</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" onClick={() => scrollToSection('tariffs')}>
              Тарифы
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection('contract')}>
              Договор
            </Button>
          </nav>
          <Button onClick={() => scrollToSection('contract')} className="bg-primary hover:bg-primary/90">
            Оформить
          </Button>
        </div>
      </header>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Icon name="Trash2" size={40} className="text-white" />
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Trash2" size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold">Мусорок</span>
          </div>
          <p className="text-white/80">Сервис вывоза мусора от двери до бака</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
