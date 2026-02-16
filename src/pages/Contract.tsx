import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Contract = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const today = new Date();
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 1);

  const formatDate = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;

  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasSigned(true);
  };

  const stopDraw = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const SEND_CONTRACT_URL = 'https://functions.poehali.dev/32d01596-bea3-4369-8220-59664e79a98d';

  const isFormValid = clientName.trim() && clientAddress.trim() && clientPhone.trim() && hasSigned && agreed;

  const submitContract = async () => {
    if (!isFormValid || sendStatus === 'sending') return;
    setSendStatus('sending');

    const canvas = canvasRef.current;
    const signatureData = canvas ? canvas.toDataURL('image/png').split(',')[1] : '';

    const contractText = [
      `Договор от ${formatDate(today)}`,
      `Заказчик: ${clientName.trim()}`,
      `Адрес: ${clientAddress.trim()}`,
      `Телефон: ${clientPhone.trim()}`,
      `Услуга: вынос мусора 3 раза/нед (пн, ср, сб)`,
      `Срок: ${formatDate(today)} — ${formatDate(endDate)}`,
      `Стоимость: 850 ₽`,
    ].join('\n');

    try {
      const res = await fetch(SEND_CONTRACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdf_base64: signatureData,
          client_name: clientName.trim(),
          client_phone: clientPhone.trim(),
          client_address: clientAddress.trim(),
          contract_text: contractText,
        }),
      });
      if (res.ok) {
        setSendStatus('success');
      } else {
        setSendStatus('error');
      }
    } catch {
      setSendStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h1 className="text-lg font-bold">Договор на оказание услуг</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 space-y-4">
          <h2 className="text-lg font-semibold">Данные заказчика</h2>
          <div>
            <label className="block text-sm text-gray-600 mb-1">ФИО</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Иванов Иван Иванович"
              className="w-full border rounded-lg px-4 py-2.5 text-base outline-none focus:border-[#90C850] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Адрес</label>
            <input
              type="text"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              placeholder="г. Пенза, ул. Примерная, д. 1, кв. 1"
              className="w-full border rounded-lg px-4 py-2.5 text-base outline-none focus:border-[#90C850] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Телефон</label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="+7 (999) 999-99-99"
              className="w-full border rounded-lg px-4 py-2.5 text-base outline-none focus:border-[#90C850] transition-colors"
            />
          </div>
        </div>

        <div className="border rounded-lg p-6 md:p-8 mb-8 text-sm leading-relaxed text-gray-800 space-y-4">
          <h2 className="text-center text-base font-bold uppercase">
            Договор на оказание услуг по выносу бытового мусора
          </h2>
          <p className="text-center text-gray-500">от {formatDate(today)} г.</p>

          <p>
            <strong>Исполнитель:</strong> Самозанятая Агеева Дарья Игоревна, применяющая специальный налоговый режим «Налог на профессиональный доход» (НПД), ИНН 564304653850, далее — «Исполнитель».
          </p>
          <p>
            <strong>Заказчик:</strong>{' '}
            {clientName.trim() || '______________________________'}, проживающий(ая) по адресу:{' '}
            {clientAddress.trim() || '______________________________'}, тел.:{' '}
            {clientPhone.trim() || '______________________________'}, далее — «Заказчик».
          </p>

          <h3 className="font-bold pt-2">1. Предмет договора</h3>
          <p>
            1.1. Исполнитель обязуется оказывать Заказчику услуги по выносу бытового мусора из квартиры Заказчика до контейнерной площадки, а Заказчик обязуется оплатить услуги в порядке и на условиях, предусмотренных настоящим Договором.
          </p>
          <p>
            1.2. Вынос мусора осуществляется <strong>3 (три) раза в неделю</strong>: понедельник, среда, суббота.
          </p>

          <h3 className="font-bold pt-2">2. Срок действия договора</h3>
          <p>
            2.1. Настоящий Договор вступает в силу с момента его подписания и действует в течение <strong>1 (одного) календарного месяца</strong>.
          </p>

          <h3 className="font-bold pt-2">3. Стоимость услуг и порядок оплаты</h3>
          <p>
            3.1. Стоимость услуг по настоящему Договору составляет <strong>850 (восемьсот пятьдесят) рублей</strong> за весь период действия Договора.
          </p>
          <p>
            3.2. Оплата производится Заказчиком путём перевода денежных средств на счёт Исполнителя по номеру телефона +7 (961) 929-67-28 (Альфа-Банк) с момента подписания Договора.
          </p>

          <h3 className="font-bold pt-2">4. Обязанности сторон</h3>
          <p>4.1. Исполнитель обязуется:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Выносить бытовой мусор весом до 10 кг за один вынос;</li>
            <li>Соблюдать график выноса мусора;</li>
            <li>Аккуратно обращаться с имуществом Заказчика.</li>
          </ul>
          <p>4.2. Заказчик обязуется:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Обеспечить доступ к мусору (выставить пакет у двери или передать лично);</li>
            <li>Своевременно оплатить услуги;</li>
            <li>Не передавать строительный мусор, крупногабаритные и опасные отходы.</li>
          </ul>

          <h3 className="font-bold pt-2">5. Прочие условия</h3>
          <p>
            5.1. Все споры решаются путём переговоров. При невозможности достижения соглашения споры разрешаются в соответствии с законодательством РФ.
          </p>
          <p>
            5.2. Договор составлен в электронной форме и подписан сторонами.
          </p>

          <div className="border-t pt-6 mt-6 grid grid-cols-2 gap-6">
            <div>
              <p className="font-bold mb-1">Исполнитель:</p>
              <p>Агеева Д.И.</p>
              <p className="text-gray-500 text-xs">ИНН 564304653850</p>
            </div>
            <div>
              <p className="font-bold mb-1">Заказчик:</p>
              <p>{clientName.trim() || '________________________'}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Подпись заказчика</h2>
            {hasSigned && (
              <button onClick={clearSignature} className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                Очистить
              </button>
            )}
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden" style={{ touchAction: 'none' }}>
            <canvas
              ref={canvasRef}
              className="w-full bg-gray-50 cursor-crosshair"
              style={{ height: 150 }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
          </div>
          {!hasSigned && (
            <p className="text-sm text-gray-400 mt-1">Нарисуйте подпись в поле выше</p>
          )}
        </div>

        <label className="flex items-start gap-3 mb-6 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-5 h-5 accent-[#90C850]"
          />
          <span className="text-sm text-gray-700">
            Я ознакомился(ась) с условиями договора и согласен(на) с ними
          </span>
        </label>

        {sendStatus === 'success' ? (
          <div className="text-center py-6 bg-green-50 border border-green-200 rounded-lg">
            <Icon name="CheckCircle" size={40} className="text-[#90C850] mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">Договор подписан и отправлен!</p>
            <p className="text-sm text-gray-500 mt-1">Мы свяжемся с вами для подтверждения</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/')}>
              Вернуться на главную
            </Button>
          </div>
        ) : (
          <Button
            disabled={!isFormValid || sendStatus === 'sending'}
            className="w-full bg-[#90C850] hover:bg-[#7AB840] text-white text-base py-6 disabled:opacity-50"
            onClick={submitContract}
          >
            {sendStatus === 'sending' ? (
              <>Отправка...</>
            ) : sendStatus === 'error' ? (
              <>
                <Icon name="RefreshCw" size={18} className="mr-2" />
                Попробовать снова
              </>
            ) : (
              <>
                <Icon name="FileCheck" size={18} className="mr-2" />
                Подписать договор
              </>
            )}
          </Button>
        )}
      </main>
    </div>
  );
};

export default Contract;