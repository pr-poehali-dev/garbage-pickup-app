-- Создание таблицы заказов
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    telegram VARCHAR(255),
    tariff VARCHAR(255) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для быстрого поиска по telegram
CREATE INDEX idx_orders_telegram ON orders(telegram);

-- Индекс для поиска по статусу оплаты
CREATE INDEX idx_orders_payment_status ON orders(payment_status);