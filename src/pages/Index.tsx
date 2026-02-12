import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TariffsSection from '@/components/TariffsSection';
import ContractSection from '@/components/ContractSection';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    tariff: '',
    duration: ''
  });
  const [showSignature, setShowSignature] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <Header 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />
      
      <HeroSection scrollToSection={scrollToSection} />
      
      <TariffsSection 
        tariffs={tariffs}
        updateCalculation={updateCalculation}
        scrollToSection={scrollToSection}
      />
      
      <ContractSection 
        formData={formData}
        setFormData={setFormData}
        showSignature={showSignature}
        setShowSignature={setShowSignature}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />

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
