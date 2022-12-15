import type { KeywordData } from '#types/types';

// TODO: 테스트코드 작성 가능
// 키워드가 커뮤니티에 존재하는지 확인하여 id 혹은 false를 반환하는 함수
const checkIsExistKeyword = (
  keyword: string,
  communityKeywordData: KeywordData[] | undefined,
): string | false => {
  // 커뮤니티 키워드 데이터가 없으면 검색할 수 없다.
  if (!communityKeywordData) {
    return false;
  }

  // some을 쓰면 예외처리가 힘들 것 같아서 filter 사용
  const result = communityKeywordData?.filter(
    (keywordData) => keywordData.keywordName === keyword,
  );

  if (result.length === 0) {
    return false;
  }

  if (result.length > 1) {
    // TODO: 커스텀 에러 객체 만들기
    throw new Error('중복된 id가 있습니다.');
  }

  return result[0].keywordId;
};

export default checkIsExistKeyword;
