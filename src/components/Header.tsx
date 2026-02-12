import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
}

const Header = ({ mobileMenuOpen, setMobileMenuOpen, scrollToSection }: HeaderProps) => {
  return (
    <>
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
    </>
  );
};

export default Header;
