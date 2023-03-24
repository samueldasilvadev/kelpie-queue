import type { QueueOptions } from 'bull';
import dotenv from 'dotenv';

dotenv.config();

export const REDIS_CONFIG = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
}

export const BASE_QUEUE_OPTIONS: QueueOptions = {
  redis: {
    ...REDIS_CONFIG,
    maxRetriesPerRequest: Number(process.env.REDIS_MAX_RETRIES) || null,
  },
}
