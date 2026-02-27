# locadora
 página de locadora de veículos

DATABASE:
CREATE TABLE veiculos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    placa VARCHAR(10) NOT NULL UNIQUE,
    categoria VARCHAR(50) NOT NULL,
    valor_diaria DECIMAL(10,2) NOT NULL
);

CREATE TABLE agendamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_cliente VARCHAR(100) NOT NULL,
    email_cliente VARCHAR(100) NOT NULL,
    veiculo_id INT NOT NULL,
    data_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO veiculos (modelo, marca, placa, categoria, valor_diaria)
VALUES 
-- BASICO
('Onix', 'Chevrolet', 'LOC1A01', 'Basico', 95.00),
('HB20', 'Hyundai', 'LOC1A02', 'Basico', 90.00),
('Argo', 'Fiat', 'LOC1A03', 'Basico', 85.00),
('Gol', 'Volkswagen', 'LOC1A04', 'Basico', 80.00),
('Kwid', 'Renault', 'LOC1A05', 'Basico', 75.00),

-- FAMILIA
('Cronos', 'Fiat', 'LOC1F01', 'Familia', 120.00),
('Virtus', 'Volkswagen', 'LOC1F02', 'Familia', 140.00),
('Corolla', 'Toyota', 'LOC1F03', 'Familia', 180.00),
('Civic', 'Honda', 'LOC1F04', 'Familia', 190.00),
('Spin', 'Chevrolet', 'LOC1F05', 'Familia', 170.00),
('Creta', 'Hyundai', 'LOC1F06', 'Familia', 165.00),

-- LUXO
('BMW 320i', 'BMW', 'LOC1L01', 'Luxo', 450.00),
('Audi A4', 'Audi', 'LOC1L02', 'Luxo', 480.00),
('Mercedes C180', 'Mercedes-Benz', 'LOC1L03', 'Luxo', 500.00),
('Jeep Commander', 'Jeep', 'LOC1L04', 'Luxo', 420.00),
('Toyota SW4', 'Toyota', 'LOC1L05', 'Luxo', 550.00);