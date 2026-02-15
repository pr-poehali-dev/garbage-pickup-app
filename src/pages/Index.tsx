import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tariffs = [
    {
      id: 'one-time',
      name: 'Разовый вынос',
      price: '100 ₽',
      icon: 'Package',
    },
    {
      id: 'weekly',
      name: 'Неделя',
      price: '250 ₽',
      period: '/неделя',
      icon: 'Calendar',
    },
    {
      id: 'monthly',
      name: 'Месяц',
      price: '850 ₽',
      period: '/месяц',
      icon: 'CalendarCheck',
    }
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/fa5fb18d-7ab2-471a-9709-a7e63d3cbaa5.jpg" 
              alt="Логотип Мусорок" 
              className="h-20 object-contain cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+79033901093" className="flex items-center gap-2 bg-[#90C850] hover:bg-[#7AB840] text-white px-4 py-2 rounded-md transition-colors text-base">
              <Icon name="Phone" size={18} />
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
                <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '0% 50%'}} />
              </a>
              <a 
                href="https://wa.me/79033901093" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
                aria-label="WhatsApp"
              >
                <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '50% 50%'}} />
              </a>
              <a 
                href="tel:+79033901093" 
                className="w-10 h-10 rounded-2xl shadow-lg hover:scale-110 transition-all overflow-hidden"
                aria-label="VK Мессенджер"
              >
                <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '100% 50%'}} />
              </a>
            </div>
            <Button 
              onClick={() => scrollToSection('tariffs')} 
              className="bg-[#90C850] hover:bg-[#7AB840] text-white text-base"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] z-40 bg-white/95 backdrop-blur-md animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <a href="tel:+79033901093" className="flex items-center justify-center gap-3 text-lg font-semibold py-3 bg-primary/10 rounded-lg">
              <Icon name="Phone" size={22} />
              +7 903 390-10-93
            </a>
            <div className="flex items-center justify-center gap-3">
              <a 
                href="https://t.me/+79033901093" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
                aria-label="Telegram"
              >
                <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '0% 50%'}} />
              </a>
              <a 
                href="https://wa.me/79033901093" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
                aria-label="WhatsApp"
              >
                <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '50% 50%'}} />
              </a>
              <a 
                href="tel:+79033901093" 
                className="w-12 h-12 rounded-2xl shadow-lg hover:scale-110 transition-all overflow-hidden"
                aria-label="VK Мессенджер"
              >
                <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '100% 50%'}} />
              </a>
            </div>
            <Button 
              className="w-full bg-[#90C850] hover:bg-[#7AB840] text-white text-base py-5"
              onClick={() => scrollToSection('tariffs')}
            >
              Оформить тариф
            </Button>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-0 pb-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center max-w-4xl">
          {/* Logo with decorative elements */}
          <div className="mx-auto -mb-4 animate-scale-in relative">
            <img 
              src="https://cdn.poehali.dev/files/1000018696.png" 
              alt="Переработка" 
              className="absolute -left-4 top-8 w-20 h-20 opacity-20"
            />
            <img 
              src="https://cdn.poehali.dev/files/fa5fb18d-7ab2-471a-9709-a7e63d3cbaa5.jpg" 
              alt="Логотип Мусорок" 
              className="h-80 mx-auto object-contain mix-blend-multiply relative z-10"
            />
            <img 
              src="https://cdn.poehali.dev/files/1000018696.png" 
              alt="Переработка" 
              className="absolute right-4 top-8 w-20 h-20 opacity-20"
            />
          </div>

          {/* Phone Button */}
          <a href="tel:+79033901093" className="inline-flex items-center gap-2 text-lg font-bold bg-[#90C850] hover:bg-[#7AB840] text-white px-5 py-2.5 rounded-lg mb-5 hover:scale-105 transition-all whitespace-nowrap">
            <Icon name="Phone" size={20} />
            +7 9033 90 10 93
          </a>
          
          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <a 
              href="https://t.me/+79033901093" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
              aria-label="Telegram"
            >
              <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '0% 50%'}} />
            </a>
            <a 
              href="https://wa.me/79033901093" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
              aria-label="WhatsApp"
            >
              <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '50% 50%'}} />
            </a>
            <a 
              href="tel:+79033901093" 
              className="w-12 h-12 rounded-2xl shadow-lg hover:scale-110 transition-all overflow-hidden"
              aria-label="VK Мессенджер"
            >
              <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '100% 50%'}} />
            </a>
          </div>
          
          {/* Schedule Info */}
          <div className="bg-white/90 backdrop-blur-sm border-2 border-[#90C850] rounded-lg p-5 max-w-md mx-auto text-center shadow-lg mb-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Уважаемые клиенты</h2>
            <p className="text-lg font-semibold text-gray-800 mb-1.5">Вынос мусора - два раза в день</p>
            <p className="text-base text-gray-700 mb-1">С 10.00 до 17.00</p>
            <p className="text-base text-gray-700">Понедельник. Среда. Суббота</p>
          </div>
          
          {/* Working Area Title */}
          <div className="text-xl text-black font-bold mb-5 uppercase tracking-wide text-center">
            <p>РАБОТАЕМ</p>
            <p>ТОЛЬКО В ОРЕНБУРГЕ</p>
          </div>

          {/* Addresses Block */}
          <div className="bg-[#90C850] rounded-lg p-6 mb-5 max-w-5xl mx-auto shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-5 text-center">ОБСЛУЖИВАЕМ ДОМА</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-left text-base">
              <div>
                <p className="font-bold mb-1.5">ВЫСОТНАЯ:</p>
                <p className="mb-3">2, 4, 6, 8, 10, 10/1, 12</p>
                
                <p className="font-bold mb-1.5">ГАРАНЬКИНА:</p>
                <p className="mb-3">27, 25, 23, 21/1</p>
                
                <p className="font-bold mb-1.5">ЕСИМОВА:</p>
                <p className="mb-3">13/2, 13/1, 13, 11, 9, 7, 3/2, 3/1, 3</p>
                
                <p className="font-bold mb-1.5">КАРПОВА:</p>
                <p className="mb-3">1, 3, 5</p>
                
                <p className="font-bold mb-1.5">ПОЛЯНИЧКО:</p>
                <p className="mb-3">4/1, 2, 1, 5, 8, 10, 10/1, 12</p>
              </div>
              <div>
                <p className="font-bold mb-1.5">ПР-Д СЕВЕРНЫЙ:</p>
                <p className="mb-3">16, 16/1</p>
                
                <p className="font-bold mb-1.5">САЛМЫШСКАЯ:</p>
                <p className="mb-3">76, 74, 72, 72/2, 72/1, 70, 70/1, 70/2, 68, 67/1, 67/2, 67/3, 67/4, 66, 64, 62, 58/1, 58, 56, 54/1, 52, 52/1, 52/2, 48, 46/2, 46, 44/2, 44/1, 44, 47/1, 47А, 47, 45/4, 45/3, 45/1, 45, 43/5, 43/3, 43/2, 43/1, 43</p>
                
                <p className="font-bold mb-1.5">ТРАНСПОРТНАЯ:</p>
                <p className="mb-3">18, 18/2, 16, 16/1, 16/2, 16/3, 16/4, 16Б, 7</p>
                
                <p className="font-bold mb-1.5">ФРОНТОВИКОВ:</p>
                <p className="mb-3">6, 6/1, 8/1, 8/2, 8/3</p>
              </div>
            </div>
            <p className="text-center mt-5 font-bold text-sm">ИНФОРМАЦИЯ ОБНОВЛЯЕТСЯ<br />РАЗ В НЕДЕЛЮ</p>
          </div>

          {/* View Tariffs Button */}
          <Button 
            onClick={() => scrollToSection('tariffs')} 
            className="bg-[#90C850] hover:bg-[#7AB840] text-white text-base px-6 py-5 mb-6"
          >
            Посмотреть тарифы ↓
          </Button>

          {/* Why Choose Us */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-center mb-6">Почему выбирают нас</h2>
            <p className="text-center text-gray-600 mb-10 text-base">Мы делаем вашу жизнь комфортнее, избавляя от рутинной задачи выноса мусора</p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#90C850]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Clock" size={32} className="text-[#90C850]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Экономия времени</h3>
                <p className="text-gray-600 text-base">Не тратьте время на походы к баку — мы всё сделаем за вас без лишних хлопот</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#90C850]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Sparkles" size={32} className="text-[#90C850]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Чистота в подъезде</h3>
                <p className="text-gray-600 text-base">Вынесем мусор, не оставляя следов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tariffs Section */}
      <section id="tariffs" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Выберите подходящий тариф</h2>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {tariffs.map((tariff) => (
              <Card 
                key={tariff.id} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-[#90C850]"
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-[#90C850]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name={tariff.icon} size={28} className="text-[#90C850]" />
                  </div>
                  <CardTitle className="text-xl text-center">{tariff.name}</CardTitle>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#90C850]">{tariff.price}</p>
                    {tariff.period && <p className="text-gray-600 text-sm">{tariff.period}</p>}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-[#90C850] hover:bg-[#7AB840] text-white"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Оформить заказ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* QR Payment Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-3">Оплата по QR-коду</h2>
          <p className="text-gray-600 mb-6 text-base">Быстрая и удобная оплата через приложение банка</p>
          
          <div className="bg-white rounded-lg border-2 border-[#90C850] p-6 mb-6 inline-block">
            <img 
              src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/96c559a0-1578-496b-903b-61e0d8ab25e0.png" 
              alt="QR код для оплаты" 
              className="w-56 h-56 mx-auto"
            />
          </div>
          
          <Button className="bg-[#90C850] hover:bg-[#7AB840] text-white mb-6 text-base">
            <Icon name="Download" size={16} className="mr-2" />
            Скачать QR-код
          </Button>

          <div className="bg-white rounded-lg p-6 text-left border border-gray-200">
            <h3 className="text-xl font-bold mb-5">Как оплатить:</h3>
            <ol className="space-y-2.5 text-base">
              <li className="flex gap-2.5">
                <span className="flex-shrink-0 w-7 h-7 bg-[#90C850] text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                <span>В приложении вашего банка выберите способ оплатить QR-кодом</span>
              </li>
              <li className="flex gap-2.5">
                <span className="flex-shrink-0 w-7 h-7 bg-[#90C850] text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                <span>Наведите камеру на QR-код</span>
              </li>
              <li className="flex gap-2.5">
                <span className="flex-shrink-0 w-7 h-7 bg-[#90C850] text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                <span>Нажмите кнопку "ВСЕ ВЕРНО"</span>
              </li>
              <li className="flex gap-2.5">
                <span className="flex-shrink-0 w-7 h-7 bg-[#90C850] text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                <span>Далее нажмите "ОПЛАТИТЬ" и введите сумму перевода</span>
              </li>
              <li className="flex gap-2.5">
                <span className="flex-shrink-0 w-7 h-7 bg-[#90C850] text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
                <span>Подтвердите оплату</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Important Info */}
      <section className="py-10 px-4 bg-white border-t">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded">
            <div className="flex gap-2.5">
              <Icon name="AlertCircle" size={22} className="text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Важная информация</h3>
                <p className="text-gray-700 text-base">
                  Мы выносим только <strong>бытовой мусор</strong> весом до 10 кг. Строительный мусор, крупногабаритные отходы и опасные материалы не принимаем.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-1.5">Сервис выноса мусора</h2>
          <p className="text-lg mb-5">от двери до контейнера</p>
          
          <div className="mb-5">
            <p className="text-base font-semibold mb-1.5">График работы</p>
            <p className="text-gray-300 text-sm">понедельник, среда, суббота</p>
            <p className="text-gray-300 text-sm">с 10:00 до 17:00</p>
          </div>

          <a href="tel:+79033901093" className="inline-flex items-center gap-2 text-2xl font-bold mb-5 hover:text-[#90C850] transition-colors">
            <Icon name="Phone" size={28} />
            +7 9033 90 10 93
          </a>

          <div className="flex items-center justify-center gap-3 mb-6">
            <a 
              href="https://t.me/+79033901093" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
            >
              <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '0% 50%'}} />
            </a>
            <a 
              href="https://wa.me/79033901093" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
            >
              <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '50% 50%'}} />
            </a>
            <a 
              href="tel:+79033901093" 
              className="w-14 h-14 rounded-2xl shadow-lg hover:scale-110 transition-all overflow-hidden"
            >
              <div className="w-full h-full" style={{backgroundImage: `url(https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/bucket/38804d19-d8cf-4add-b0fa-c821b483e696.jpg)`, backgroundSize: '300% 100%', backgroundPosition: '100% 50%'}} />
            </a>
          </div>

          <p className="text-lg font-semibold underline">Служба поддержки</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;