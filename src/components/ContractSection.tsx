import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import ContractSignature from '@/components/ContractSignature';
import { generateContractPDFBase64 } from '@/utils/generateContractPDF';

interface ContractSectionProps {
  formData: {
    name: string;
    phone: string;
    address: string;
    tariff: string;
    duration: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    phone: string;
    address: string;
    tariff: string;
    duration: string;
  }>>;
  showSignature: boolean;
  setShowSignature: (show: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
}

const ContractSection = ({ 
  formData, 
  setFormData, 
  showSignature, 
  setShowSignature,
  isSubmitting,
  setIsSubmitting
}: ContractSectionProps) => {
  const { toast } = useToast();

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

  return (
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
    </section>
  );
};

export default ContractSection;
