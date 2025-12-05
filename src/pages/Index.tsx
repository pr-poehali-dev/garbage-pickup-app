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
      id: 'one-time',
      name: 'Разовый вынос',
      price: '70',
      icon: 'Package',
      features: ['Без абонплаты', 'Быстрый вынос', 'До 10 кг', 'Только бытовой мусор']
    },
    {
      id: 'weekly',
      name: 'Неделя',
      price: '180',
      period: '/неделя',
      icon: 'Calendar',
      features: ['Пн, Ср, Сб: 10:00-17:00', 'До 10 кг за раз', 'Только бытовой мусор']
    },
    {
      id: 'daily',
      name: 'Месяц',
      price: '650',
      period: '/месяц',
      icon: 'CalendarCheck',
      features: ['Вынос мусора еженедельно', 'Пн, Ср, Сб: 10:00-17:00', 'До 10 кг за раз', 'Только бытовой мусор', 'Заключаем договор']
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
              src="https://cdn.poehali.dev/files/df1f6f41-122d-43f9-a00c-955dc49a2aac.jpg" 
              alt="Логотип Мусорок" 
              className="h-12 object-contain"
            />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+79033901093" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Icon name="Phone" size={20} />
              <span className="font-semibold">+7 903 390-10-93</span>
            </a>
            <div className="flex items-center gap-2">
              <Button 
                size="icon"
                variant="ghost"
                onClick={() => window.open('https://wa.me/79033901093', '_blank')}
                className="hover:bg-green-100"
              >
                <Icon name="MessageCircle" size={20} className="text-green-600" />
              </Button>
              <Button 
                size="icon"
                variant="ghost"
                onClick={() => window.open('https://t.me/+79033901093', '_blank')}
                className="hover:bg-blue-100"
              >
                <Icon name="Send" size={20} className="text-blue-600" />
              </Button>
            </div>
            <Button 
              onClick={() => scrollToSection('contract')} 
              className="bg-[#90C850] hover:bg-[#7AB840] text-white"
            >
              Оформить тариф
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </Button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] z-40 bg-white/95 backdrop-blur-md animate-fade-in">
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
            <a href="tel:+79033901093" className="flex items-center justify-center gap-3 text-lg font-semibold py-4 bg-primary/10 rounded-lg">
              <Icon name="Phone" size={24} />
              +7 903 390-10-93
            </a>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="flex-1 py-6"
                onClick={() => window.open('https://wa.me/79033901093', '_blank')}
              >
                <Icon name="MessageCircle" size={20} className="mr-2 text-green-600" />
                WhatsApp
              </Button>
              <Button 
                variant="outline"
                className="flex-1 py-6"
                onClick={() => window.open('https://t.me/+79033901093', '_blank')}
              >
                <Icon name="Send" size={20} className="mr-2 text-blue-600" />
                Telegram
              </Button>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-lg py-6"
              onClick={() => scrollToSection('tariffs')}
            >
              <Icon name="DollarSign" size={20} className="mr-3" />
              Тарифы
            </Button>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-lg py-6 mt-4"
              onClick={() => scrollToSection('contract')}
            >
              <Icon name="FileText" size={20} className="mr-2" />
              Оформить заявку
            </Button>
          </nav>
        </div>
      )}

      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="mx-auto mb-6 animate-scale-in">
            <img 
              src="https://cdn.poehali.dev/files/df1f6f41-122d-43f9-a00c-955dc49a2aac.jpg" 
              alt="Логотип Мусорок" 
              className="h-24 mx-auto object-contain"
            />
            <p className="text-lg font-bold text-secondary tracking-wider mt-4 uppercase">
              Вынос мусора в срок
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">
            Вынесем ваш мусор от двери до контейнера
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            Забудьте о неудобстве. Заберем мусор у двери и отнесем до контейнера за вас
          </p>
          <p className="text-lg text-primary font-semibold mb-6">
            График выноса: понедельник, среда, суббота с 10:00 до 17:00
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a href="tel:+79033901093" className="flex items-center gap-2 text-lg font-semibold px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Icon name="Phone" size={24} className="text-primary" />
              +7 903 390-10-93
            </a>
            <div className="flex gap-2">
              <Button 
                size="lg"
                variant="outline"
                className="bg-white"
                onClick={() => window.open('https://wa.me/79033901093', '_blank')}
              >
                <Icon name="MessageCircle" size={20} className="mr-2 text-green-600" />
                WhatsApp
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-white"
                onClick={() => window.open('https://t.me/+79033901093', '_blank')}
              >
                <Icon name="Send" size={20} className="mr-2 text-blue-600" />
                Telegram
              </Button>
            </div>
          </div>
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
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-lg hover:bg-primary/5 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} className="text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2">Экономия времени</h4>
              <p className="text-sm text-muted-foreground">
                Не тратьте время на походы к баку — мы всё сделаем за вас без лишних хлопот
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:bg-primary/5 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Sparkles" size={32} className="text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2">Чистота в подъезде</h4>
              <p className="text-sm text-muted-foreground">
                Вынесем мусор, не оставляя следов
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
                  <ul className="space-y-3 mb-6">
                    {tariff.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-[#90C850] hover:bg-[#7AB840] text-white"
                    onClick={() => {
                      if (tariff.id === 'daily') {
                        scrollToSection('contract');
                      } else {
                        window.open('https://t.me/musorok', '_blank');
                      }
                    }}
                  >
                    {tariff.id === 'daily' ? 'Оформить договор' : 'Оплатить'}
                    <Icon name={tariff.id === 'daily' ? 'FileText' : 'CreditCard'} size={18} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 max-w-2xl mx-auto">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-white">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Оплата по QR-коду</CardTitle>
                <CardDescription className="text-center">
                  Быстрая и удобная оплата через приложение банка
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <img 
                  src="https://cdn.poehali.dev/files/b285c592-4989-413d-afb7-33395df2a728.jpg" 
                  alt="QR-код для оплаты" 
                  className="w-64 h-64 rounded-lg shadow-md mb-4"
                />
                <Button
                  variant="outline"
                  className="mb-6"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = 'https://cdn.poehali.dev/files/b285c592-4989-413d-afb7-33395df2a728.jpg';
                    link.download = 'qr-kod-oplata-musorok.jpg';
                    link.click();
                  }}
                >
                  <Icon name="Download" size={18} className="mr-2" />
                  Скачать QR-код
                </Button>
                <div className="bg-white p-6 rounded-lg border border-border w-full">
                  <h4 className="font-semibold mb-3 text-center">Как оплатить:</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary">1.</span>
                      <span>В приложении вашего банка выберите способ оплатить QR-кодом</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary">2.</span>
                      <span>Наведите камеру на QR-код</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary">3.</span>
                      <span>Нажмите кнопку "ВСЕ ВЕРНО"</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary">4.</span>
                      <span>Далее нажмите "ОПЛАТИТЬ" и введите сумму перевода</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary">5.</span>
                      <span>Подтвердите оплату</span>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-start gap-4 bg-white p-6 rounded-lg border border-amber-300">
            <div className="flex-shrink-0">
              <Icon name="AlertCircle" size={32} className="text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-amber-900">Важная информация</h4>
              <p className="text-amber-800">
                Мы выносим только <strong>бытовой мусор</strong> весом до 10 кг. 
                Строительный мусор, крупногабаритные отходы и опасные материалы не принимаем.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-8">
            Свяжитесь с нами
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Icon name="Phone" size={48} className="mx-auto mb-4 text-primary" />
                <h4 className="font-semibold mb-2">Позвоните</h4>
                <a href="tel:+79033901093" className="text-lg font-bold text-primary hover:underline">
                  +7 903 390-10-93
                </a>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-green-600" />
                <h4 className="font-semibold mb-2">WhatsApp</h4>
                <Button 
                  variant="link"
                  className="text-lg font-bold text-green-600"
                  onClick={() => window.open('https://wa.me/79033901093', '_blank')}
                >
                  Написать
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Icon name="Send" size={48} className="mx-auto mb-4 text-blue-600" />
                <h4 className="font-semibold mb-2">Telegram</h4>
                <Button 
                  variant="link"
                  className="text-lg font-bold text-blue-600"
                  onClick={() => window.open('https://t.me/+79033901093', '_blank')}
                >
                  Написать
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-8">
            Свяжитесь с нами
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Icon name="Phone" size={48} className="mx-auto mb-4 text-primary" />
                <h4 className="font-semibold mb-2">Позвоните</h4>
                <a href="tel:+79033901093" className="text-lg font-bold text-primary hover:underline">
                  +7 903 390-10-93
                </a>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-green-600" />
                <h4 className="font-semibold mb-2">WhatsApp</h4>
                <Button 
                  variant="link"
                  className="text-lg font-bold text-green-600"
                  onClick={() => window.open('https://wa.me/79033901093', '_blank')}
                >
                  Написать
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Icon name="Send" size={48} className="mx-auto mb-4 text-blue-600" />
                <h4 className="font-semibold mb-2">Telegram</h4>
                <Button 
                  variant="link"
                  className="text-lg font-bold text-blue-600"
                  onClick={() => window.open('https://t.me/+79033901093', '_blank')}
                >
                  Написать
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contract" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold text-center mb-4 text-secondary">
            Оформить тариф "Месяц"
          </h3>
          <p className="text-center text-muted-foreground mb-8">
            Заполните форму для заключения договора
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
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

                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Выбранный тариф:</p>
                    <p className="text-lg font-bold text-primary">Месяц — 650 ₽/месяц</p>
                    <p className="text-sm text-muted-foreground mt-2">Понедельник, среда, суббота • До 10 кг за раз</p>
                  </div>

                  <Button type="submit" className="w-full bg-[#90C850] hover:bg-[#7AB840] text-white py-6 text-lg">
                    Отправить заявку
                    <Icon name="Send" size={20} className="ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-center">Оплата по QR-коду</CardTitle>
                <CardDescription className="text-center">
                  Оплатите после оформления заявки
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <img 
                  src="https://cdn.poehali.dev/files/b285c592-4989-413d-afb7-33395df2a728.jpg" 
                  alt="QR-код для оплаты" 
                  className="w-48 h-48 rounded-lg shadow-md mb-3"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-3"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = 'https://cdn.poehali.dev/files/b285c592-4989-413d-afb7-33395df2a728.jpg';
                    link.download = 'qr-kod-oplata-musorok.jpg';
                    link.click();
                  }}
                >
                  <Icon name="Download" size={16} className="mr-1" />
                  Скачать
                </Button>
                <div className="bg-white p-4 rounded-lg border border-border w-full">
                  <h4 className="font-semibold mb-2 text-sm">Как оплатить:</h4>
                  <ol className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex gap-1">
                      <span className="font-semibold text-primary">1.</span>
                      <span>Откройте приложение банка</span>
                    </li>
                    <li className="flex gap-1">
                      <span className="font-semibold text-primary">2.</span>
                      <span>Выберите оплату QR-кодом</span>
                    </li>
                    <li className="flex gap-1">
                      <span className="font-semibold text-primary">3.</span>
                      <span>Наведите на код</span>
                    </li>
                    <li className="flex gap-1">
                      <span className="font-semibold text-primary">4.</span>
                      <span>Нажмите "ВСЕ ВЕРНО", затем "ОПЛАТИТЬ"</span>
                    </li>
                    <li className="flex gap-1">
                      <span className="font-semibold text-primary">5.</span>
                      <span>Введите сумму и подтвердите</span>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://cdn.poehali.dev/files/df1f6f41-122d-43f9-a00c-955dc49a2aac.jpg" 
              alt="Логотип Мусорок" 
              className="h-12 object-contain"
            />
          </div>
          <p className="text-white/80 mb-2">Сервис выноса мусора от двери до контейнера</p>
          <p className="text-white/70 text-sm mb-3">График: понедельник, среда, суббота 10:00-17:00</p>
          <div className="flex items-center justify-center gap-4 text-sm text-white/80">
            <a href="tel:+73532296728" className="hover:text-white flex items-center gap-2">
              <Icon name="Phone" size={16} />
              +7 (3532) 296728
            </a>
            <a href="https://t.me/musorok" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2">
              <Icon name="Send" size={16} />
              @musorok
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;