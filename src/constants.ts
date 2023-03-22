import type { QueueOptions } from 'bull';
import dotenv from 'dotenv';

dotenv.config();

export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
}

export const baseQueueOptions: QueueOptions = {
  redis: {
    ...redisConfig,
    // maxRetriesPerRequest: Number(process.env.REDIS_MAX_RETRIES) || null,
    // enableReadyCheck: Boolean(process.env.REDIS_READY_CHECK) || false,
  },
}

export const testQueueOptions: QueueOptions = {
  ...baseQueueOptions,

}