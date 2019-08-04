import winston from 'winston';
import pool from '../models/database';

const GenerateUserTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
 userId serial PRIMARY KEY,
 email VARCHAR (50) NOT NULL UNIQUE,
 password VARCHAR (200) NOT NULL,
 firstName VARCHAR (50) NOT NULL,
 lastName VARCHAR (50) NOT NULL,
 regDate date NOT NULL DEFAULT CURRENT_DATE
);
`;

const generateEntryTable = `
DROP TABLE IF EXISTS entries;
CREATE TABLE entries (
 entryId serial PRIMARY KEY,
 userId INT NOT NULL,
 entrytitle VARCHAR (255) NOT NULL,
 entrycontent VARCHAR (255) NOT NULL,
 entryDate date NOT NULL DEFAULT CURRENT_DATE,
 FOREIGN KEY (userId) REFERENCES users (userId)
);
`;

const generateTranscationTable = `
DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
 transId serial PRIMARY KEY,
 userId INT NOT NULL,
 coin VARCHAR (255) NOT NULL,
 type INT NOT NULL,
 price  float NOT NULL,
 quantity float NOT NULL,
 note VARCHAR (255),
 transDate DATE NOT NULL DEFAULT CURRENT_DATE,
 transTime TIME NOT NULL DEFAULT CURRENT_TIME,
 FOREIGN KEY (userId) REFERENCES users (userId)
);
`;

const query = `${GenerateUserTable} ${generateEntryTable} ${generateTranscationTable}`;

pool.query(query)
  .then(() => process.exit())
  .catch(error => winston.log(error));
