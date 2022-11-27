import { faker } from '@faker-js/faker';
import { parentPort } from 'worker_threads';

parentPort.on('message', (value) => {
  if (value === 1) {
    const nameSet = new Set();
    for (let i = 0; i < 10000; i++) {
      nameSet.add(faker.name.fullName());
    }

    parentPort.postMessage(Array.from(nameSet));
    parentPort.close();
    return;
  }

  if (value === 2) {
    const wordSet = new Set();
    for (let i = 0; i < 10000; i++) {
      wordSet.add(faker.lorem.word());
      wordSet.add(faker.commerce.product());
      wordSet.add(faker.company.name());
    }
    parentPort.postMessage(Array.from(wordSet));
    parentPort.close();
    return;
  }

  if (value === 3) {
    const phraseSet = new Set();
    for (let i = 0; i < 10000; i++) {
      phraseSet.add(faker.lorem.paragraph());
    }

    parentPort.postMessage(Array.from(phraseSet));
    parentPort.close();
    return;
  }

  if (value === 4) {
    const urlSet = new Set();
    for (let i = 0; i < 10000; i++) {
      urlSet.add(faker.image.image());
    }
    parentPort.postMessage(Array.from(urlSet));
    parentPort.close();
  }
});
