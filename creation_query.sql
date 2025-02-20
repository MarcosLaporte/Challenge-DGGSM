CREATE DATABASE IF NOT EXISTS DGGSM_Laporte;

USE DGGSM_Laporte;

CREATE TABLE
  IF NOT EXISTS AREAS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    area VARCHAR(127) NOT NULL
  );

ALTER TABLE AREAS AUTO_INCREMENT = 101;

CREATE TABLE
  IF NOT EXISTS EMPLOYEES (
    fullName VARCHAR(127) NOT NULL,
    idNo BIGINT PRIMARY KEY,
    birthDate DATE NOT NULL,
    isDev BOOLEAN NOT NULL,
    description VARCHAR(255) NOT NULL,
    areaId INT NOT NULL,
    FOREIGN KEY (areaId) REFERENCES AREAS (id)
  );

INSERT INTO
  AREAS (area)
VALUES
  ('RRHH'),
  ('Logística'),
  ('Desarrollo Web'),
  ('Desarrollo Backend'),
  ('Finanzas'),
  ('Arquitectura de Software'),
  ('Atención al Cliente'),
  ('Desarrollo Móvil');

INSERT INTO
  EMPLOYEES
VALUES
  (
    'Katrina Ríos',
    22428779,
    '1972-03-30',
    1,
    'Arquitecta de software con amplia trayectoria.',
    105
  ),
  (
    'Rolando Fernández',
    24178141,
    '1974-08-20',
    0,
    'Gerente de logística con más de 20 años de experiencia',
    102
  ),
  (
    'Beatriz López',
    25614551,
    '1976-05-15',
    0,
    'Especialista en recursos humanos.',
    101
  ),
  (
    'Tomás Pérez',
    33709320,
    '1990-06-12',
    0,
    'Encargado de atención al cliente.',
    106
  ),
  (
    'Marilén Suárez',
    41872423,
    '2003-05-18',
    1,
    'Desarrolladora de aplicaciones móviles.',
    107
  ),
  (
    'Bruno Herrera',
    41935663,
    '2003-07-25',
    0,
    'Analista financiero en formación.',
    104
  ),
  (
    'Diana Méndez',
    44226347,
    '2006-02-10',
    1,
    'Desarrolladora junior en frontend.',
    103
  );