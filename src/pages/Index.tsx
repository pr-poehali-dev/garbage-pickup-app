import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import ContractSignature from '@/components/ContractSignature';
import { generateContractPDFBase64 } from '@/utils/generateContractPDF';

const Index = () => {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportForm, setSupportForm] = useState({
    name: '',
    address: '',
    message: '',
    phone: '',
    telegram: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    tariff: '',
    duration: ''
  });
  const [showSignature, setShowSignature] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    tariff: '',
    telegram: ''
  });
  const [showOrderForm, setShowOrderForm] = useState(false);

  const tariffs = [
    {
      id: 'one-time',
      name: 'Разовый вынос',
      price: '100',
      icon: 'Package',
      features: ['Быстрый вынос', 'До 10 кг', 'Только бытовой мусор']
    },
    {
      id: 'weekly',
      name: 'Неделя',
      price: '250',
      period: '/неделя',
      icon: 'Calendar',
      features: ['Пн, Ср, Сб: 10:00-17:00', 'До 10 кг за раз', 'Только бытовой мусор']
    },
    {
      id: 'monthly',
      name: 'Месяц',
      price: '850',
      period: '/месяц',
      icon: 'CalendarCheck',
      features: ['Вынос мусора еженедельно', 'Пн, Ср, Сб: 10:00-17:00', 'До 10 кг только бытовой мусор']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: 'Заполните все поля',
        description: 'Пожалуйста, укажите имя, телефон и адрес',
        variant: 'destructive'
      });
      return;
    }

    setShowSignature(true);
  };

  const handleSignatureComplete = async (signatureDataUrl: string) => {
    setIsSubmitting(true);
    
    try {
      await fetch('https://functions.poehali.dev/8f3c5a51-eb00-4694-b4fd-0d5f889f4ecc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          tariff: 'Месяц — 650 ₽/месяц'
        })
      });

      const pdfBase64 = generateContractPDFBase64({
        clientName: formData.name,
        clientPhone: formData.phone,
        clientAddress: formData.address,
        signatureDataUrl
      });

      const contractResponse = await fetch('https://functions.poehali.dev/32d01596-bea3-4369-8220-59664e79a98d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdf_base64: pdfBase64,
          client_name: formData.name,
          client_phone: formData.phone,
          client_address: formData.address
        })
      });

      const contractResult = await contractResponse.json();

      if (contractResponse.ok && contractResult.success) {
        const byteCharacters = atob(pdfBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `Договор_${formData.name.replace(/\s+/g, '_')}.pdf`;
        link.click();
        
        URL.revokeObjectURL(url);

        toast({
          title: 'Договор отправлен!',
          description: 'Подписанный договор скачан на ваше устройство и отправлен нам. Мы свяжемся с вами в ближайшее время.'
        });
        
        setFormData({ name: '', phone: '', address: '', tariff: '', duration: '' });
        setShowSignature(false);
      } else {
        toast({
          title: 'Ошибка отправки',
          description: contractResult.error || 'Попробуйте позже',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка отправки',
        description: 'Проверьте подключение к интернету',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
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
              src="https://cdn.poehali.dev/files/fa5fb18d-7ab2-471a-9709-a7e63d3cbaa5.jpg" 
              alt="Логотип Мусорок" 
              className="h-24 object-contain cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+79033901093" className="flex items-center gap-2 bg-[#90C850] hover:bg-[#7AB840] text-white px-4 py-2 rounded-md transition-colors">
              <Icon name="Phone" size={20} />
              <span className="font-semibold">+7 9033 90 10 93</span>
            </a>
            <div className="flex items-center gap-2">
              <a 
                href="https://t.me/+79033901093" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                aria-label="Telegram"
              >
                <Icon name="Send" size={20} className="text-white" />
              </a>
              <a 
                href="https://wa.me/+79033901093" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                aria-label="WhatsApp"
              >
                <Icon name="MessageCircle" size={20} className="text-white" />
              </a>
              <a 
                href="tel:+79033901093" 
                className="w-10 h-10 rounded-2xl shadow-lg hover:scale-110 transition-all overflow-hidden"
                aria-label="Max"
              >
                <img 
                  src="https://cdn.poehali.dev/files/1000018995.png" 
                  alt="Max" 
                  className="w-full h-full object-cover"
                />
              </a>
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
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://t.me/+79033901093" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                aria-label="Telegram"
              >
                <Icon name="Send" size={28} className="text-white" />
              </a>
              <a 
                href="https://wa.me/+79033901093" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                aria-label="WhatsApp"
              >
                <Icon name="MessageCircle" size={28} className="text-white" />
              </a>
              <a 
                href="tel:+79033901093" 
                className="w-14 h-14 rounded-2xl shadow-lg hover:scale-110 transition-all overflow-hidden"
                aria-label="Max"
              >
                <img 
                  src="https://cdn.poehali.dev/files/1000018995.png" 
                  alt="Max" 
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
            <Button 
              className="w-full justify-start text-lg py-6 bg-[#90C850] hover:bg-[#7AB840] text-white"
              onClick={() => scrollToSection('tariffs')}
            >
              <Icon name="DollarSign" size={20} className="mr-3" />
              Тарифы
            </Button>
            <Button 
              className="w-full bg-[#90C850] hover:bg-[#7AB840] text-lg py-6 mt-4 text-white"
              onClick={() => scrollToSection('contract')}
            >
              <Icon name="FileText" size={20} className="mr-2" />
              Оформить заявку
            </Button>
          </nav>
        </div>
      )}

      <section className="pt-0 pb-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="mx-auto -mb-4 animate-scale-in relative">
            <img 
              src="https://cdn.poehali.dev/files/1000018696.png" 
              alt="Переработка" 
              className="absolute -left-4 top-8 w-24 h-24 opacity-20"
            />
            <img 
              src="https://cdn.poehali.dev/files/fa5fb18d-7ab2-471a-9709-a7e63d3cbaa5.jpg" 
              alt="Логотип Мусорок" 
              className="h-96 mx-auto object-contain mix-blend-multiply relative z-10"
            />
            <img 
              src="https://cdn.poehali.dev/files/1000018696.png" 
              alt="Переработка" 
              className="absolute right-4 top-8 w-24 h-24 opacity-20"
            />
          </div>

          <a href="tel:+79033901093" className="inline-flex items-center gap-2 text-xl font-bold bg-[#90C850] hover:bg-[#7AB840] text-white px-6 py-3 rounded-lg mb-6 hover:scale-105 transition-all whitespace-nowrap">
            <Icon name="Phone" size={24} />
            +7 9033 90 10 93
          </a>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <a 
              href="https://t.me/+79033901093" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
              aria-label="Telegram"
            >
              <Icon name="Send" size={28} className="text-white" />
            </a>
            <a 
              href="https://wa.me/+79033901093" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
              aria-label="WhatsApp"
            >
              <Icon name="MessageCircle" size={28} className="text-white" />
            </a>
            <a 
              href="tel:+79033901093" 
              className="w-14 h-14 rounded-2xl shadow-lg hover:scale-110 transition-all overflow-hidden"
              aria-label="Max"
            >
              <img 
                src="https://cdn.poehali.dev/files/1000018995.png" 
                alt="Max" 
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm border-2 border-[#90C850] rounded-lg p-6 max-w-md mx-auto text-center shadow-lg mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Уважаемые клиенты</h2>
            <p className="text-xl font-semibold text-gray-800 mb-2">Вынос мусора - два раза в день</p>
            <p className="text-lg text-gray-700 mb-1">С 10.00 до 17.00</p>
            <p className="text-lg text-gray-700">Понедельник. Среда. Суббота</p>
          </div>
          <div className="text-2xl text-black font-bold mb-6 uppercase tracking-wide">
            РАБОТАЕМ ТОЛЬКО В ОРЕНБУРГЕ
          </div>
          
          <div className="bg-[#90C850] rounded-lg p-6 mb-6 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-3 uppercase text-center">ОБСЛУЖИВАЕМ ДОМА</h3>
            <p className="text-lg text-white text-center leading-relaxed">
              Гаранькина 27, 25, 23, 21/1
            </p>
            <p className="text-lg text-white text-center leading-relaxed">
              Салмышская 76, 74, 72, 72/2, 72/1, 70, 70/1, 70/2, 68, 67/1, 67/2, 67/3, 67/4, 66, 64, 62
            </p>
            <p className="text-lg text-white text-center leading-relaxed">
              Карпова 1, 3, 5
            </p>
            <p className="text-lg text-white text-center leading-relaxed">
              Высотная 2, 4, 6, 8, 10, 10/1, 12
            </p>
            <div className="text-sm text-black font-semibold text-center mt-4 uppercase">
              <p>информация обновляется</p>
              <p>раз в неделю</p>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="bg-[#90C850] hover:bg-[#7AB840] text-white text-lg px-8 py-6"
            onClick={() => scrollToSection('tariffs')}
          >
            Посмотреть тарифы
            <Icon name="ArrowDown" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section className="pt-0 pb-8 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-2 text-secondary leading-tight">
            Почему выбирают нас
          </h3>
          <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto leading-tight">
            Мы делаем вашу жизнь комфортнее, избавляя от рутинной задачи выноса мусора
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="text-center p-4 rounded-lg hover:bg-primary/5 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name="Clock" size={32} className="text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-1 leading-tight">Экономия времени</h4>
              <p className="text-sm text-muted-foreground leading-tight">
                Не тратьте время на походы к баку — мы всё сделаем за вас без лишних хлопот
              </p>
            </div>

            <div className="text-center p-4 rounded-lg hover:bg-primary/5 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name="Sparkles" size={32} className="text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-1 leading-tight">Чистота в подъезде</h4>
              <p className="text-sm text-muted-foreground leading-tight">
                Вынесем мусор, не оставляя следов
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="tariffs" className="pt-4 pb-8 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-6 text-secondary leading-tight">
            Выберите подходящий тариф
          </h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
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
                      setOrderForm({ ...orderForm, tariff: tariff.name });
                      setShowOrderForm(true);
                      setTimeout(() => {
                        document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 100);
                    }}
                  >
                    Оформить заказ
                    <Icon name="ShoppingCart" size={18} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {showOrderForm && (
            <div id="order-form" className="mt-12 max-w-2xl mx-auto">
              <Card className="border-2 border-primary/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">Оформление заказа</CardTitle>
                  <CardDescription className="text-center">
                    Заполните форму для оформления заказа
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (!orderForm.name || !orderForm.phone || !orderForm.address || !orderForm.telegram) {
                      toast({
                        title: 'Заполните все поля',
                        description: 'Пожалуйста, укажите имя, телефон, адрес и Telegram',
                        variant: 'destructive'
                      });
                      return;
                    }

                    // Отправляем данные в Telegram
                    try {
                      const response = await fetch('https://functions.poehali.dev/8f3c5a51-eb00-4694-b4fd-0d5f889f4ecc', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          name: orderForm.name,
                          phone: orderForm.phone,
                          address: orderForm.address,
                          tariff: orderForm.tariff,
                          telegram: orderForm.telegram
                        })
                      });

                      if (response.ok) {
                        toast({
                          title: 'Спасибо, что выбрали нас!',
                          description: 'Мы свяжемся с вами для подтверждения заказа и оплаты.',
                          duration: 5000
                        });
                        setShowOrderForm(false);
                        setOrderForm({ name: '', phone: '', address: '', tariff: '', telegram: '' });
                      } else {
                        throw new Error('Failed to send notification');
                      }
                    } catch (error) {
                      toast({
                        title: 'Ошибка отправки',
                        description: 'Не удалось отправить заявку. Попробуйте позже.',
                        variant: 'destructive'
                      });
                      console.error('Error sending order:', error);
                    }
                  }} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="order-name">Ваше имя</Label>
                      <Input
                        id="order-name"
                        placeholder="Иван Иванов"
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="order-phone">Телефон</Label>
                      <Input
                        id="order-phone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="order-address">Адрес</Label>
                      <Textarea
                        id="order-address"
                        placeholder="Город, улица, дом, квартира"
                        value={orderForm.address}
                        onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                        rows={3}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="order-telegram">Telegram</Label>
                      <Input
                        id="order-telegram"
                        placeholder="@username или номер телефона"
                        value={orderForm.telegram}
                        onChange={(e) => setOrderForm({ ...orderForm, telegram: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Для получения уведомления об оплате напишите боту: <a href="https://t.me/YOUR_BOT_USERNAME" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@YOUR_BOT_USERNAME</a>
                      </p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Выбранный тариф:</p>
                      <p className="text-lg font-bold text-primary">{orderForm.tariff}</p>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#90C850] hover:bg-[#7AB840] text-white py-6 text-lg"
                    >
                      Оформить заказ
                      <Icon name="ShoppingCart" size={20} className="ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-8 max-w-2xl mx-auto">
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
                  className="mb-6 bg-[#90C850] hover:bg-[#7AB840] text-white"
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

      <section id="contact" className="pt-4 pb-8 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-8">
            Свяжитесь с нами
          </h3>
          <div className="max-w-md mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Icon name="Phone" size={48} className="mx-auto mb-4 text-primary" />
                <h4 className="font-semibold mb-2">Позвоните</h4>
                <a href="tel:+79033901093" className="text-lg font-bold text-primary hover:underline">
                  +7 9033 90 10 93
                </a>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <a 
                    href="https://t.me/+79033901093" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                    aria-label="Telegram"
                  >
                    <Icon name="Send" size={28} className="text-white" />
                  </a>
                  <a 
                    href="https://wa.me/+79033901093" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                    aria-label="WhatsApp"
                  >
                    <Icon name="MessageCircle" size={28} className="text-white" />
                  </a>
                  <a 
                    href="tel:+79033901093" 
                    className="w-14 h-14 rounded-2xl shadow-lg hover:scale-110 transition-all overflow-hidden"
                    aria-label="Max"
                  >
                    <img 
                      src="https://cdn.poehali.dev/files/1000018995.png" 
                      alt="Max" 
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      <footer className="bg-secondary text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-white text-lg mb-1">Сервис выноса мусора</p>
          <p className="text-white text-lg mb-4">от двери до контейнера</p>
          <p className="text-white/90 font-semibold mb-1">График работы</p>
          <p className="text-white/80 mb-1">понедельник, среда, суббота</p>
          <p className="text-white/80 mb-4">с 10:00 до 17:00</p>
          <div className="flex items-center justify-center gap-4 text-white/90">
            <a href="tel:+79033901093" className="hover:text-white flex items-center gap-2 text-xl font-semibold">
              <Icon name="Phone" size={24} />
              +7 9033 90 10 93
            </a>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <a 
              href="https://t.me/+79033901093" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
              aria-label="Telegram"
            >
              <Icon name="Send" size={28} className="text-white" />
            </a>
            <a 
              href="https://wa.me/+79033901093" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
              aria-label="WhatsApp"
            >
              <Icon name="MessageCircle" size={28} className="text-white" />
            </a>
            <a 
              href="tel:+79033901093" 
              className="w-14 h-14 rounded-2xl shadow-lg hover:scale-110 transition-all overflow-hidden"
              aria-label="Max"
            >
              <img 
                src="https://cdn.poehali.dev/files/1000018995.png" 
                alt="Max" 
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          <button 
            onClick={() => setSupportModalOpen(true)}
            className="mt-3 text-white text-base hover:text-white/80 transition-colors cursor-pointer underline"
          >
            Служба поддержки
          </button>
        </div>
      </footer>

      {supportModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSupportModalOpen(false)}>
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="text-2xl">Служба поддержки</CardTitle>
              <CardDescription>Заполните форму и мы с вами свяжемся</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={async (e) => {
                e.preventDefault();
                
                try {
                  const response = await fetch('https://functions.poehali.dev/8f3c5a51-eb00-4694-b4fd-0d5f889f4ecc', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: supportForm.name,
                      phone: supportForm.phone,
                      address: supportForm.address,
                      message: supportForm.message,
                      telegram: supportForm.telegram,
                      tariff: 'Служба поддержки'
                    })
                  });

                  if (response.ok) {
                    toast({
                      title: "Спасибо, что выбираете нас!",
                      description: "Мы свяжемся с вами в ближайшее время для решения вашей проблемы.",
                      duration: 5000
                    });
                    setSupportForm({ name: '', address: '', message: '', phone: '', telegram: '' });
                    setSupportModalOpen(false);
                  } else {
                    throw new Error('Failed to send support request');
                  }
                } catch (error) {
                  toast({
                    title: 'Ошибка отправки',
                    description: 'Не удалось отправить обращение. Попробуйте позже.',
                    variant: 'destructive'
                  });
                  console.error('Error sending support request:', error);
                }
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="support-name">Имя</Label>
                  <Input
                    id="support-name"
                    required
                    value={supportForm.name}
                    onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-address">Адрес</Label>
                  <Input
                    id="support-address"
                    required
                    value={supportForm.address}
                    onChange={(e) => setSupportForm({ ...supportForm, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-message">Сообщение (не более 200 символов)</Label>
                  <Textarea
                    id="support-message"
                    required
                    maxLength={200}
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground text-right">{supportForm.message.length}/200</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-phone">Номер телефона для связи</Label>
                  <Input
                    id="support-phone"
                    type="tel"
                    required
                    value={supportForm.phone}
                    onChange={(e) => setSupportForm({ ...supportForm, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-telegram">Telegram</Label>
                  <Input
                    id="support-telegram"
                    placeholder="@username или номер телефона"
                    value={supportForm.telegram}
                    onChange={(e) => setSupportForm({ ...supportForm, telegram: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Для получения уведомлений напишите боту: <a href="https://t.me/YOUR_BOT_USERNAME" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@YOUR_BOT_USERNAME</a>
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-[#90C850] hover:bg-[#7AB840]">
                    Отправить
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setSupportModalOpen(false)}>
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;