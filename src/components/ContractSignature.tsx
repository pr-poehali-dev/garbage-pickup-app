import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ContractSignatureProps {
  onSigned: (signatureDataUrl: string) => void;
  onCancel: () => void;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
}

export default function ContractSignature({
  onSigned,
  onCancel,
  clientName,
  clientPhone,
  clientAddress
}: ContractSignatureProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const clear = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
  };

  const save = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current.toDataURL();
      onSigned(dataUrl);
    }
  };

  const handleBegin = () => {
    setIsEmpty(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold mb-4 text-center">Договор на оказание услуг</h3>
          
          <div className="bg-muted/30 p-4 rounded-lg mb-6 text-sm space-y-2">
            <p className="font-semibold text-center mb-3">ДОГОВОР № _____</p>
            <p className="text-center mb-4">на оказание услуг по вывозу бытовых отходов</p>
            
            <div className="space-y-2">
              <p><strong>Заказчик:</strong> {clientName}</p>
              <p><strong>Телефон:</strong> {clientPhone}</p>
              <p><strong>Адрес:</strong> {clientAddress}</p>
            </div>

            <div className="mt-4 space-y-2">
              <p className="font-semibold">Предмет договора:</p>
              <p>Исполнитель обязуется оказывать услуги по вывозу бытовых отходов от двери Заказчика до мусорного контейнера.</p>
              
              <p className="font-semibold mt-3">Условия оказания услуг:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>График: понедельник, среда, суббота с 10:00 до 17:00</li>
                <li>Максимальный вес за один раз: до 10 кг</li>
                <li>Стоимость: 650 рублей в месяц</li>
                <li>Оплата производится до 5 числа текущего месяца</li>
              </ul>

              <p className="font-semibold mt-3">Ответственность сторон:</p>
              <p className="text-xs">Стороны несут ответственность за неисполнение или ненадлежащее исполнение обязательств по настоящему договору в соответствии с действующим законодательством РФ.</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Подпись Заказчика:</p>
            <div className="border-2 border-primary/20 rounded-lg overflow-hidden bg-white">
              <SignatureCanvas
                ref={sigCanvas}
                canvasProps={{
                  className: 'w-full h-40',
                }}
                onBegin={handleBegin}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Нарисуйте подпись пальцем или мышкой
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={clear}
              variant="outline"
              className="flex-1"
              disabled={isEmpty}
            >
              <Icon name="Eraser" size={18} className="mr-2" />
              Очистить
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1"
            >
              <Icon name="X" size={18} className="mr-2" />
              Отмена
            </Button>
            <Button
              onClick={save}
              className="flex-1 bg-[#90C850] hover:bg-[#7AB840]"
              disabled={isEmpty}
            >
              <Icon name="Check" size={18} className="mr-2" />
              Подписать
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
