import { faker } from '@faker-js/faker';
import { Community } from './../entity/Community';
import { User } from '../entity/User';
import { Thread } from '../entity/Thread';
import { KeywordUser } from '../entity/KeywordUser';
import { Keyword } from '../entity/Keyword';
import { CommunityUser } from '../entity/CommunityUser';
import fs from 'fs';
import dataSource from './data-source';
import { join } from 'path';

function makeIterator<T>(iter: Iterable<T>): Generator<T, never, T> {
  const generator = (function* () {
    while (true) {
      for (const element of iter) {
        yield element;
      }
    }
  })();

  return generator;
}
function makeRandomIterator<T>(iter: Iterable<T>): Generator<T, never, T> {
  const generator = (function* () {
    while (true) {
      for (const element of iter) {
        yield element;
      }
    }
  })();

  return generator;
}
function makeShuffleIterator<T>(arr: Array<T>): Generator<T, never, T> {
  const array = arr.map((val) => val).sort(() => Math.random() - 0.5);
  const generator = (function* () {
    while (true) {
      for (const element of array) {
        yield element;
      }
      array.sort(() => Math.random() - 0.5);
    }
  })();

  return generator;
}

function makeNumbers(counts: number): number[] {
  const numbers = [];
  for (let i = 1; i <= counts; i++) {
    numbers.push(i);
  }
  return numbers;
}

class Wrapper<T> {
  constructor(private readonly generator: Generator<T, never, T>) {}

  get value(): T {
    return this.generator.next().value;
  }
}

dataSource.initialize().then(async (dataSource) => {
  const userCounts = 100;
  const communityCounts = 200;
  const communityUserCounts = 5000;

  const names = JSON.parse(fs.readFileSync(join(__dirname, 'names.json'), { encoding: 'utf8' })) as string[];
  const phrases = JSON.parse(fs.readFileSync(join(__dirname, 'phrases.json'), { encoding: 'utf8' })) as string[];
  const urls = JSON.parse(fs.readFileSync(join(__dirname, 'urls.json'), { encoding: 'utf8' })) as string[];
  const words = JSON.parse(fs.readFileSync(join(__dirname, 'words.json'), { encoding: 'utf8' })) as string[];

  const oauthMethods = ['GITHUB', 'GOOGLE', 'INSTAGRAM'];

  const nameGenerator = new Wrapper(makeIterator(names));
  const phraseGenerator = new Wrapper(makeIterator(phrases));
  const urlsGenerator = new Wrapper(makeRandomIterator(urls));
  const wordsGenerator = new Wrapper(makeIterator(words));
  const oauthMethodGenerator = new Wrapper(makeRandomIterator(oauthMethods));

  const userIdGenerator = new Wrapper(makeShuffleIterator(makeNumbers(userCounts)));
  const communityIdGenerator = new Wrapper(makeShuffleIterator(makeNumbers(communityCounts)));

  // user 저장하기
  const users = [];
  for (let i = 0; i < userCounts; i++) {
    const user = new User();
    user.oauthKey = wordsGenerator.value;
    user.username = nameGenerator.value;
    user.oauthMethod = oauthMethodGenerator.value;
    user.profileImageUrl = urlsGenerator.value;
    users.push(user);
  }

  console.log('1-1 users 완료!');

  const communities = [];
  for (let i = 0; i < communityCounts; i++) {
    const community = new Community();
    community.title = wordsGenerator.value;
    community.summary = phraseGenerator.value;
    community.userId = userIdGenerator.value.toString();
    communities.push(community);
  }

  console.log('1-2 communities 완료!');

  const communityToUser: { [key: string]: string[] } = {};
  const communityUsers: CommunityUser[] = [];
  for (let i = 1; i <= communityUserCounts; i++) {
    const communityUser = new CommunityUser();
    communityUser.communityId = communityIdGenerator.value.toString();
    communityUser.userId = userIdGenerator.value.toString();
    communityUser.communityUsername = nameGenerator.value;
    communityUser.profileImageUrl = urlsGenerator.value;
    communityUsers.push(communityUser);
    communityToUser[communityUser.communityId] = communityToUser[communityUser.communityId] || [];
    communityToUser[communityUser.communityId].push(communityUser.userId);
  }

  console.log('1-3 communityUsers 완료!');

  const communityToKeyword: { [key: string]: { userId: string; keywordId: string }[] } = {};
  const keywords: Keyword[] = [];
  let id = 1;
  communityUsers.forEach(({ communityId, userId }) => {
    const eachKeywordCount = Math.round(Math.random() * 9);
    for (let i = 0; i < eachKeywordCount; i++) {
      const keyword = new Keyword();
      keyword.id = id.toString();
      keyword.authorId = userId;
      keyword.keyword = wordsGenerator.value;
      keyword.communityId = communityId;
      id++;
      if (communityId && userId) {
        communityToKeyword[communityId] = communityToKeyword[communityId] || [];
        communityToKeyword[communityId].push({ userId, keywordId: id.toString() });
      }
      keywords.push(keyword);
    }
  });

  console.log('1-4 keywords 완료!');

  const keywordUsers: KeywordUser[] = [];
  keywords.forEach(({ id: keywordId, authorId, communityId }) => {
    {
      const keywordUser = new KeywordUser();
      keywordUser.communityId = communityId;
      keywordUser.userId = authorId;
      keywordUser.keywordId = keywordId;
      keywordUsers.push(keywordUser);
    }
    if (!communityId) return;

    communityToUser[communityId]
      .slice(0, Math.round(Math.random() * communityToUser[communityId].length))
      .filter((userId) => userId !== authorId)
      .forEach((userId) => {
        const keywordUser = new KeywordUser();
        keywordUser.communityId = communityId;
        keywordUser.userId = userId;
        keywordUser.keywordId = keywordId;
        keywordUsers.push(keywordUser);
      });
  });

  console.log('1-5 keywordUsers 완료!');

  const threads: Thread[] = [];
  keywordUsers.forEach(({ keywordId, userId }) => {
    const count = Math.round(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const thread = new Thread();
      thread.createdAt = faker.date.past();
      thread.keywordId = keywordId;
      thread.authorId = userId;
      thread.content = phraseGenerator.value;
      threads.push(thread);
    }
  });

  console.log('1-6 threads 완료!');

  console.log(users.length);
  console.log(communities.length);
  console.log(communityUsers.length);
  console.log(keywords.length);
  console.log(keywordUsers.length);
  console.log(threads.length);

  await dataSource.createQueryBuilder().insert().into(User).values(users).execute();
  console.log('2-1 users 완료!');
  await dataSource.createQueryBuilder().insert().into(Community).values(communities).execute();
  console.log('2-2 communities 완료!');
  await dataSource.createQueryBuilder().insert().into(CommunityUser).values(communityUsers).execute();
  console.log('2-3 communityUsers 완료!');
  await dataSource.createQueryBuilder().insert().into(Keyword).values(keywords).execute();
  console.log('2-4 keywords 완료!');

  const keywordUsersBatch: KeywordUser[][] = [];
  for (let i = 0; i < Math.min(); i++) {
    keywordUsersBatch.push(keywordUsers.slice(i * 1000, (i + 1) * 1000));
    if ((i + 1) * 1000 > keywordUsers.length) break;
  }
  for (const keywordUsers of keywordUsersBatch) {
    await dataSource.createQueryBuilder().insert().into(KeywordUser).values(keywordUsers).execute();
  }

  console.log('2-5 keywordUsers 완료!');

  const threadBatch: Thread[][] = [];
  for (let i = 0; i < Math.min(); i++) {
    threadBatch.push(threads.slice(i * 1000, (i + 1) * 1000));
    if ((i + 1) * 1000 > threads.length) break;
  }
  for (const threads of threadBatch) {
    await dataSource.createQueryBuilder().insert().into(Thread).values(threads).execute();
  }
  console.log('2-6 threads 완료!');

  process.exit();
});
