import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
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
  );
};

export default HeroSection;
