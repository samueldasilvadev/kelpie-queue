import 'dotenv/config';
import { argv, exit, pid } from 'process';
import cluster from 'cluster';
import Logger from './application/utils/logger';
import Colors from './types/EColors';

import { queues } from './queues'

const params = {
  queueName: argv[2],
  clusterNodes: Number.parseInt(argv[3]) || 0
};

if (cluster.isPrimary && params.clusterNodes > 0) {
  Logger.log(Colors.magenta , `Starting in Cluster Mode...`);
  for (let i = 0; i < params.clusterNodes - 1; i++) {
    cluster.fork();
  }
}

Logger.log(Colors.magenta, `Start Node: ${pid}`);
const start = async () => {
  try {
    const processQueue = queues[params.queueName];
    if (typeof processQueue === 'undefined') {
      Logger.error('Consumer not found');
      exit(1);
    }
    processQueue(params.queueName).startup();
  } catch (e) {
    Logger.error(e);
    exit(1);
  }
};

start();
