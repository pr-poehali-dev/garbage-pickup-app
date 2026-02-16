CREATE TABLE signed_contracts (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50),
    client_address TEXT,
    contract_text TEXT,
    signature_base64 TEXT,
    client_ip VARCHAR(45),
    signed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);