export default {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: Number(process.env.REDIS_MAX_RETRIES) || null,
    enableReadyCheck: (Number(process.env.REDIS_READY_CHECK) == 1) || false,
  }
}
