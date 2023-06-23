import type { QueueOptions } from 'bull';

export const REDIS_CONFIG = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
}

export const BASE_QUEUE_OPTIONS: QueueOptions = {
  redis: {
    ...REDIS_CONFIG,
    maxRetriesPerRequest: Number(process.env.REDIS_MAX_RETRIES) || null,
    enableReadyCheck: (Number(process.env.REDIS_READY_CHECK) == 1) || false,
  },
}

export const FALLBACK_QUEUE = process.env.FALLBACK_QUEUE || 'test';
export const FALLBACK_JOB_CONFIG = {
  attempts: Number(process.env.FALLBACK_ATTEMPTS) || 5,
  backoff: Number(process.env.JOB_BACKOFF) || 30000,
}
