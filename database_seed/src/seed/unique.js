import { Worker } from 'worker_threads';
import { join } from 'path';
import fs from 'fs';

const __dirname = join(process.cwd(), 'src', 'seed');
const WORKER_FILE = 'unique.worker.js';
const WORKER_DIR = join(__dirname, WORKER_FILE);

const nameWorker = new Worker(WORKER_DIR);
const wordWorker = new Worker(WORKER_DIR);
const phraseWorker = new Worker(WORKER_DIR);
const urlWorker = new Worker(WORKER_DIR);

nameWorker.postMessage(1);
wordWorker.postMessage(2);
phraseWorker.postMessage(3);
urlWorker.postMessage(4);

nameWorker.on('message', (nameArray) => {
  fs.writeFile(join(__dirname, 'names.json'), JSON.stringify(nameArray), () => {});
});
wordWorker.on('message', (wordArray) => {
  fs.writeFile(join(__dirname, 'words.json'), JSON.stringify(wordArray), () => {});
});
phraseWorker.on('message', (phraseArray) => {
  fs.writeFile(join(__dirname, 'phrases.json'), JSON.stringify(phraseArray), () => {});
});
urlWorker.on('message', (urlArray) => {
  fs.writeFile(join(__dirname, 'urls.json'), JSON.stringify(urlArray), () => {});
});
