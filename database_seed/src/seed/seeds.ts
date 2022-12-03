import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Community } from '../entity/Community';
import { User } from '../entity/User';
import { Thread } from '../entity/Thread';
import { KeywordUser } from '../entity/KeywordUser';
import { Keyword } from '../entity/Keyword';
import { CommunityUser } from '../entity/CommunityUser';
import fs from 'fs';
import dataSource from '../repository/data-source';
import { join } from 'path';
import { GeneratorWrapper, makeIterator, makeNumbers, makeRandomIterator, makeShuffleIterator } from './utils';

const plan =
  ({
    userCounts,
    communityCounts,
    communityPerUser,
  }: {
    userCounts: number;
    communityCounts: number;
    communityPerUser: number;
  }) =>
  async (dataSource: DataSource) => {
    const names = JSON.parse(fs.readFileSync(join(__dirname, 'names.json'), { encoding: 'utf8' })) as string[];
    const phrases = JSON.parse(fs.readFileSync(join(__dirname, 'phrases.json'), { encoding: 'utf8' })) as string[];
    const urls = JSON.parse(fs.readFileSync(join(__dirname, 'urls.json'), { encoding: 'utf8' })) as string[];
    const words = JSON.parse(fs.readFileSync(join(__dirname, 'words.json'), { encoding: 'utf8' })) as string[];
    const emails = JSON.parse(fs.readFileSync(join(__dirname, 'emails.json'), { encoding: 'utf8' })) as string[];
    const roles = ['USER'];
    const oauthMethods = ['GITHUB', 'GOOGLE', 'INSTAGRAM'];

    const nameGenerator = new GeneratorWrapper(makeIterator(names));
    const phraseGenerator = new GeneratorWrapper(makeIterator(phrases));
    const urlGenerator = new GeneratorWrapper(makeRandomIterator(urls));
    const wordGenerator = new GeneratorWrapper(makeIterator(words));
    const emailGenerator = new GeneratorWrapper(makeIterator(emails));
    const rolesGenerator = new GeneratorWrapper(makeIterator(roles));
    const oauthMethodGenerator = new GeneratorWrapper(makeRandomIterator(oauthMethods));

    const userIdGenerator = new GeneratorWrapper(makeShuffleIterator(makeNumbers(userCounts)));
    const communityIdGenerator = new GeneratorWrapper(makeShuffleIterator(makeNumbers(communityCounts)));

    // user 저장하기
    const users = [];
    for (let i = 0; i < userCounts; i++) {
      const user = new User();
      user.oauthKey = wordGenerator.value;
      user.username = nameGenerator.value;
      user.oauthMethod = oauthMethodGenerator.value;
      user.profileImageUrl = urlGenerator.value;
      user.email = emailGenerator.value;
      user.role = rolesGenerator.value;

      users.push(user);
    }

    console.log('1-1 users 완료!');

    const communities = [];
    for (let i = 0; i < communityCounts; i++) {
      const community = new Community();
      community.title = wordGenerator.value;
      community.summary = phraseGenerator.value;
      community.userId = userIdGenerator.value.toString();
      communities.push(community);
    }

    console.log('1-2 communities 완료!');

    const communityToUser: { [key: string]: string[] } = {};
    const communityUsers: CommunityUser[] = [];
    let dupCheck: { [key: string]: boolean } = {};
    for (let i = 1; i <= communityPerUser * userCounts; i++) {
      const communityUser = new CommunityUser();
      const communityId = communityIdGenerator.value.toString();
      const userId = userIdGenerator.value.toString();
      if (dupCheck[`${communityId} ${userId}`]) continue;
      dupCheck[`${communityId} ${userId}`] = true;

      communityUser.communityId = communityId;
      communityUser.userId = userId;
      communityUser.communityUsername = nameGenerator.value;
      communityUser.profileImageUrl = urlGenerator.value;

      communityUsers.push(communityUser);
      communityToUser[communityId] = communityToUser[communityId] || [];
      communityToUser[communityId].push(userId);
    }

    console.log('1-3 communityUsers 완료!');

    const communityToKeyword: { [key: string]: { userId: string; keywordId: string }[] } = {};
    const keywords: Keyword[] = [];
    communityUsers.forEach(({ communityId, userId }) => {
      const eachKeywordCount = Math.round(Math.random() ** 5 * 10);
      for (let i = 0; i < eachKeywordCount; i++) {
        const keyword = new Keyword();
        keyword.authorId = userId;
        keyword.keyword = wordGenerator.value;
        keyword.communityId = communityId;
        keywords.push(keyword);
        if (communityId && userId) {
          communityToKeyword[communityId] = communityToKeyword[communityId] || [];
          communityToKeyword[communityId].push({ userId, keywordId: keywords.length.toString() });
        }
      }
    });

    console.log('1-4 keywords 완료!');

    const keywordToUser: { [key: string]: Array<string> } = {};
    const keywordUsers: KeywordUser[] = [];
    keywords.forEach(({ authorId, communityId }, idx) => {
      {
        const keywordUser = new KeywordUser();
        keywordUser.communityId = communityId;
        keywordUser.userId = authorId;
        keywordUser.keywordId = (idx + 1).toString();
        keywordUsers.push(keywordUser);
        keywordToUser[(idx + 1).toString()] = keywordToUser[(idx + 1).toString()] || [];
        keywordToUser[(idx + 1).toString()].push(authorId as string);
      }
      if (!communityId) return;

      communityToUser[communityId]
        .slice(0, Math.round(Math.random() ** 2 * communityToUser[communityId].length))
        .filter((userId) => userId !== authorId)
        .forEach((userId) => {
          const keywordUser = new KeywordUser();
          keywordUser.communityId = communityId;
          keywordUser.userId = userId;
          keywordUser.keywordId = (idx + 1).toString();
          keywordUsers.push(keywordUser);
        });
    });

    console.log('1-5 keywordUsers 완료!');
    const keywordToThread: { [key: string]: Array<string> } = {};
    const threads: Thread[] = [];
    const childThreads: Thread[] = [];
    keywordUsers.forEach(({ keywordId, userId }) => {
      if (!keywordId) return;
      keywordToThread[keywordId] = keywordToThread[keywordId] || [];

      const count = 1 + Math.round(Math.random() ** 5 * 9);
      for (let i = 0; i < count; i++) {
        const thread = new Thread();
        thread.createdAt = faker.date.past();
        thread.keywordId = keywordId;
        thread.authorId = userId;
        thread.content = phraseGenerator.value;
        threads.push(thread);
        keywordToThread[keywordId].push(threads.length.toString());
      }
    });

    for (const [keywordId, threadIds] of Object.entries(keywordToThread)) {
      if (!threadIds.length) continue;
      while (Math.random() > 0.2) {
        const threadId = threadIds[Math.floor(Math.random() * threadIds.length)];

        const thread = new Thread();
        thread.parentThreadId = threadId;
        thread.createdAt = faker.date.past();
        thread.keywordId = keywordId;
        thread.authorId = keywordToUser[keywordId][Math.floor(Math.random() * keywordToUser[keywordId].length)];
        if (!thread.authorId) console.log('시발');

        thread.content = phraseGenerator.value;
        childThreads.push(thread);
      }
    }

    console.log('1-6 threads 완료!');

    console.log(users.length);
    console.log(communities.length);
    console.log(communityUsers.length);
    console.log(keywords.length);
    console.log(keywordUsers.length);
    console.log(threads.length + childThreads.length);

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

    const childThreadsBatch: Thread[][] = [];
    for (let i = 0; i < Math.min(); i++) {
      childThreadsBatch.push(childThreads.slice(i * 1000, (i + 1) * 1000));
      if ((i + 1) * 1000 > childThreads.length) break;
    }
    for (const threads of childThreadsBatch) {
      await dataSource.createQueryBuilder().insert().into(Thread).values(threads).execute();
    }

    console.log('2-6 threads 완료!');

    process.exit();
  };

dataSource.initialize().then(plan({ userCounts: 1000, communityCounts: 300, communityPerUser: 10 }));
