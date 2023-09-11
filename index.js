/* eslint-disable import/extensions */
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './src/backend/user-interface/user-interface.js';

dotenv.config();

// instanciamos el servidor express
const app = express();

// seteamos host y puerto
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '3001';

app.set('port', port);

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false, limit: '1000mb' }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('Node NOT Exiting...');
});

const server = createServer(app);

app.use('/api', api());

app.get('/', (req, res) => {
  res.send('API base backend');
});

server.listen(port, host);
console.log(`Server listening on port :${port}`);
