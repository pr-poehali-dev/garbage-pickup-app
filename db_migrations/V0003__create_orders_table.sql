CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    telegram TEXT,
    tariff TEXT,
    payment_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);