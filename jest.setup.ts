import { http } from './src/config/http';
import supertest from 'supertest';

export const testServer = supertest(http);
