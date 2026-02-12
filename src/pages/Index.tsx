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
      features: ['Быстрый вынос', 'До 10 кг', 'Только бытовой мусор']
    },
    {
      id: 'weekly',
      name: 'Неделя',
      price: '250 ₽',
      period: '/неделя',
      icon: 'Calendar',
      features: ['Пн, Ср, Сб: 10:00-17:00', 'До 10 кг за раз', 'Только бытовой мусор']
    },
    {
      id: 'monthly',
      name: 'Месяц',
      price: '850 ₽',
      period: '/месяц',
      icon: 'CalendarCheck',
      features: ['Вынос мусора еженедельно', 'Пн, Ср, Сб: 10:00-17:00', 'До 10 кг только бытовой мусор']
    }
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
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
                  src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/files/02fd315a-23bf-480e-96c4-582a7c71fafa.jpg" 
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
              onClick={() => scrollToSection('tariffs')} 
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
                  src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/files/02fd315a-23bf-480e-96c4-582a7c71fafa.jpg" 
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
              className="w-full bg-[#90C850] hover:bg-[#7AB840] text-white text-lg py-6"
              onClick={() => scrollToSection('tariffs')}
            >
              Оформить тариф
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
                src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/files/02fd315a-23bf-480e-96c4-582a7c71fafa.jpg" 
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

          <div className="bg-[#90C850] rounded-lg p-8 mb-6 max-w-4xl mx-auto shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">ОБСЛУЖИВАЕМ ДОМА</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-left">
              <div>
                <p className="font-bold mb-2">ВЫСОТНАЯ:</p>
                <p className="mb-4">2, 4, 6, 8, 10, 10/1, 12</p>
                
                <p className="font-bold mb-2">ГАРАНЬКИНА:</p>
                <p className="mb-4">27, 25, 23, 21/1</p>
                
                <p className="font-bold mb-2">ЕСИМОВА:</p>
                <p className="mb-4">13/2, 13/1, 13, 11, 9, 7, 3/2, 3/1, 3</p>
                
                <p className="font-bold mb-2">КАРПОВА:</p>
                <p className="mb-4">1, 3, 5</p>
                
                <p className="font-bold mb-2">ПОЛЯНИЧКО:</p>
                <p className="mb-4">4/1, 2, 1, 5, 8, 10, 10/1, 12</p>
              </div>
              <div>
                <p className="font-bold mb-2">ПР-Д СЕВЕРНЫЙ:</p>
                <p className="mb-4">16, 16/1</p>
                
                <p className="font-bold mb-2">САЛМЫШСКАЯ:</p>
                <p className="mb-4">76, 74, 72, 72/2, 72/1, 70, 70/1, 70/2, 68, 67/1, 67/2, 67/3, 67/4, 66, 64, 62, 58/1, 58, 56, 54/1, 52, 52/1, 52/2, 48, 46/2, 46, 44/2, 44/1, 44, 47/1, 47А, 47, 45/4, 45/3, 45/1, 45, 43/5, 43/3, 43/2, 43/1, 43</p>
                
                <p className="font-bold mb-2">ТРАНСПОРТНАЯ:</p>
                <p className="mb-4">18, 18/2, 16, 16/1, 16/2, 16/3, 16/4, 16Б, 7</p>
                
                <p className="font-bold mb-2">ФРОНТОВИКОВ:</p>
                <p className="mb-4">6, 6/1, 8/1, 8/2, 8/3</p>
              </div>
            </div>
            <p className="text-center mt-6 font-bold">ИНФОРМАЦИЯ ОБНОВЛЯЕТСЯ<br />РАЗ В НЕДЕЛЮ</p>
          </div>

          <Button 
            onClick={() => scrollToSection('tariffs')} 
            className="bg-[#90C850] hover:bg-[#7AB840] text-white text-lg px-8 py-6 mb-8"
          >
            Посмотреть тарифы ↓
          </Button>

          <div className="mb-12">
            <h2 className="text-4xl font-bold text-center mb-8">Почему выбирают нас</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Мы делаем вашу жизнь комфортнее, избавляя от рутинной задачи выноса мусора</p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#90C850]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={40} className="text-[#90C850]" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Экономия времени</h3>
                <p className="text-gray-600">Не тратьте время на походы к баку — мы всё сделаем за вас без лишних хлопот</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#90C850]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Sparkles" size={40} className="text-[#90C850]" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Чистота в подъезде</h3>
                <p className="text-gray-600">Вынесем мусор, не оставляя следов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tariffs" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Выберите подходящий тариф</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tariffs.map((tariff) => (
              <Card 
                key={tariff.id} 
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-[#90C850]"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-[#90C850]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name={tariff.icon} size={32} className="text-[#90C850]" />
                  </div>
                  <CardTitle className="text-2xl text-center">{tariff.name}</CardTitle>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#90C850]">{tariff.price}</p>
                    {tariff.period && <p className="text-gray-600">{tariff.period}</p>}
                  </div>
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
                    className="w-full bg-[#90C850] hover:bg-[#7AB840] text-white"
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Оформить заказ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-4">Оплата по QR-коду</h2>
          <p className="text-gray-600 mb-8">Быстрая и удобная оплата через приложение банка</p>
          
          <div className="bg-white rounded-lg border-2 border-[#90C850] p-8 mb-8 inline-block">
            <img 
              src="https://cdn.poehali.dev/files/qr-payment.png" 
              alt="QR код для оплаты" 
              className="w-64 h-64 mx-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5RUiBrb2Q8L3RleHQ+PC9zdmc+';
              }}
            />
          </div>
          
          <Button className="bg-[#90C850] hover:bg-[#7AB840] text-white mb-8">
            <Icon name="Download" size={18} className="mr-2" />
            Скачать QR-код
          </Button>

          <div className="bg-white rounded-lg p-8 text-left border border-gray-200">
            <h3 className="text-2xl font-bold mb-6">Как оплатить:</h3>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#90C850] text-white rounded-full flex items-center justify-center font-bold">1</span>
                <span>В приложении вашего банка выберите способ оплатить QR-кодом</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#90C850] text-white rounded-full flex items-center justify-center font-bold">2</span>
                <span>Наведите камеру на QR-код</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#90C850] text-white rounded-full flex items-center justify-center font-bold">3</span>
                <span>Нажмите кнопку "ВСЕ ВЕРНО"</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#90C850] text-white rounded-full flex items-center justify-center font-bold">4</span>
                <span>Далее нажмите "ОПЛАТИТЬ" и введите сумму перевода</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#90C850] text-white rounded-full flex items-center justify-center font-bold">5</span>
                <span>Подтвердите оплату</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white border-t">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
            <div className="flex gap-3">
              <Icon name="AlertCircle" size={24} className="text-orange-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Важная информация</h3>
                <p className="text-gray-700">
                  Мы выносим только <strong>бытовой мусор</strong> весом до 10 кг. Строительный мусор, крупногабаритные отходы и опасные материалы не принимаем.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">Сервис выноса мусора</h2>
          <p className="text-xl mb-6">от двери до контейнера</p>
          
          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">График работы</p>
            <p className="text-gray-300">понедельник, среда, суббота</p>
            <p className="text-gray-300">с 10:00 до 17:00</p>
          </div>

          <a href="tel:+79033901093" className="inline-flex items-center gap-2 text-3xl font-bold mb-6 hover:text-[#90C850] transition-colors">
            <Icon name="Phone" size={32} />
            +7 9033 90 10 93
          </a>

          <div className="flex items-center justify-center gap-4 mb-8">
            <a 
              href="https://t.me/+79033901093" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
            >
              <img 
                src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/files/47d3685e-76f7-4d89-9eab-159d33b9a447.jpg" 
                alt="Telegram" 
                className="w-full h-full object-cover"
              />
            </a>
            <a 
              href="tel:+79033901093" 
              className="w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-all overflow-hidden"
            >
              <img 
                src="https://cdn.poehali.dev/projects/dffe596b-1f66-4561-b818-4d13ccf46520/files/02fd315a-23bf-480e-96c4-582a7c71fafa.jpg" 
                alt="Телефон" 
                className="w-full h-full object-cover"
              />
            </a>
            <a 
              href="tel:+79033901093" 
              className="w-16 h-16 rounded-2xl shadow-lg hover:scale-110 transition-all overflow-hidden"
            >
              <img 
                src="https://cdn.poehali.dev/files/1000018995.png" 
                alt="Max" 
                className="w-full h-full object-cover"
              />
            </a>
          </div>

          <p className="text-xl font-semibold underline">Служба поддержки</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
