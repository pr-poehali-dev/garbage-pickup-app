CREATE TABLE IF NOT EXISTS signed_contracts (
    id SERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_phone TEXT,
    client_address TEXT,
    contract_text TEXT,
    signature_base64 TEXT,
    client_ip TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);