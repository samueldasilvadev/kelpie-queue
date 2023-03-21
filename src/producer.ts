import Bull from 'bull';

const producer = new Bull('simple-queue');

producer.add({
  'data': '$2y$10$7mQ7eZuZB4UAo5JKn3O81.4qYdg7tDMkGZxCiwxPIg3J2hrSHnVVK'
}).then(job => {
  console.log(job);
  process.exit(0);
});
