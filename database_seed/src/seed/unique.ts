import { Worker } from 'worker_threads';
import { join } from 'path';
import fs from 'fs';

const curDir = join(process.cwd(), 'dist', 'seed');
const WORKER_FILE = 'unique.worker.js';
const WORKER_DIR = join(curDir, WORKER_FILE);

const nameWorker = new Worker(WORKER_DIR);
const wordWorker = new Worker(WORKER_DIR);
const phraseWorker = new Worker(WORKER_DIR);
const urlWorker = new Worker(WORKER_DIR);

nameWorker.postMessage(1);
wordWorker.postMessage(2);
phraseWorker.postMessage(3);
urlWorker.postMessage(4);

nameWorker.on('message', (nameArray: string[]) => {
  fs.writeFile(join(curDir, '..', 'repository', 'names.json'), JSON.stringify(nameArray), () => {});
});
wordWorker.on('message', (wordArray: string[]) => {
  fs.writeFile(join(curDir, '..', 'repository', 'words.json'), JSON.stringify(wordArray), () => {});
});
phraseWorker.on('message', (phraseArray: string[]) => {
  fs.writeFile(join(curDir,'..', 'repository',  'phrases.json'), JSON.stringify(phraseArray), () => {});
});
urlWorker.on('message', (urlArray: string[]) => {
  fs.writeFile(join(curDir, '..', 'repository', 'urls.json'), JSON.stringify(urlArray), () => {});
});
