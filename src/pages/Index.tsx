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
                className="w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
                aria-label="Telegram"
              >
                <img 
                  src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/files/47d3685e-76f7-4d89-9eab-159d33b9a447.jpg" 
                  alt="Telegram" 
                  className="w-full h-full object-cover"
                />
              </a>
              <a 
                href="tel:+79033901093" 
                className="w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
                aria-label="Телефон"
              >
                <img 
                  src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/77d955e7-e61a-4fdf-b5d8-f631ead376f9.jpg" 
                  alt="Телефон" 
                  className="w-full h-full object-cover"
                />
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
                className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
                aria-label="Telegram"
              >
                <img 
                  src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/files/47d3685e-76f7-4d89-9eab-159d33b9a447.jpg" 
                  alt="Telegram" 
                  className="w-full h-full object-cover"
                />
              </a>
              <a 
                href="tel:+79033901093" 
                className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
                aria-label="Телефон"
              >
                <img 
                  src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/77d955e7-e61a-4fdf-b5d8-f631ead376f9.jpg" 
                  alt="Телефон" 
                  className="w-full h-full object-cover"
                />
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
              className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
              aria-label="Telegram"
            >
              <img 
                src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/files/47d3685e-76f7-4d89-9eab-159d33b9a447.jpg" 
                alt="Telegram" 
                className="w-full h-full object-cover"
              />
            </a>
            <a 
              href="tel:+79033901093" 
              className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
              aria-label="Телефон"
            >
              <img 
                src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/77d955e7-e61a-4fdf-b5d8-f631ead376f9.jpg" 
                alt="Телефон" 
                className="w-full h-full object-cover"
              />
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
          <div className="text-2xl text-black font-bold mb-6 uppercase tracking-wide text-center">
            <p>РАБОТАЕМ</p>
            <p>ТОЛЬКО В ОРЕНБУРГЕ</p>
          </div>
          
          <div className="bg-[#90C850] rounded-lg p-6 mb-6 max-w-2xl mx-auto shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-2">
              <Icon name="Trash2" size={32} />
              Что можно выкидывать?
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Icon name="Check" size={20} />
                  Можно
                </h3>
                <ul className="text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="mt-1 flex-shrink-0" />
                    <span>Пищевые отходы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="mt-1 flex-shrink-0" />
                    <span>Бумага, картон</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="mt-1 flex-shrink-0" />
                    <span>Пластик (бутылки, упаковка)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="mt-1 flex-shrink-0" />
                    <span>Стекло</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="mt-1 flex-shrink-0" />
                    <span>Текстиль (одежда, тряпки)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Icon name="X" size={20} />
                  Нельзя
                </h3>
                <ul className="text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="XCircle" size={16} className="mt-1 flex-shrink-0" />
                    <span>Строительный мусор</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="XCircle" size={16} className="mt-1 flex-shrink-0" />
                    <span>Крупногабаритные предметы (мебель)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="XCircle" size={16} className="mt-1 flex-shrink-0" />
                    <span>Опасные отходы (батарейки, лампы)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="XCircle" size={16} className="mt-1 flex-shrink-0" />
                    <span>Медицинские отходы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="XCircle" size={16} className="mt-1 flex-shrink-0" />
                    <span>Химические вещества</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section id="contract" className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-2 border-[#90C850] shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-3xl">
                <Icon name="FileText" size={32} className="text-[#90C850]" />
                Оформление договора
              </CardTitle>
              <CardDescription>Заполните форму для заключения договора на вывоз мусора</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">ФИО *</Label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Иванов Иван Иванович"
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+7 (900) 123-45-67"
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="address">Адрес *</Label>
                  <Input 
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="г. Оренбург, ул. Примерная, д. 1, кв. 1"
                    required 
                  />
                </div>
                
                <div className="bg-[#90C850]/10 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    <Icon name="Info" size={16} className="inline mr-1" />
                    После нажатия кнопки откроется окно для подписи договора
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#90C850] hover:bg-[#7AB840] text-white text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Продолжить к подписанию'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {showSignature && (
        <ContractSignature
          clientData={{
            name: formData.name,
            phone: formData.phone,
            address: formData.address
          }}
          onComplete={handleSignatureComplete}
          onCancel={() => setShowSignature(false)}
        />
      )}

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold mb-4">ООО "Мусорок"</p>
          <p className="text-gray-400 mb-2">ИНН: 5612345678</p>
          <p className="text-gray-400 mb-6">Оренбург, ул. Примерная, д. 1</p>
          <p className="text-gray-500 text-sm">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
