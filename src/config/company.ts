/**
 * 사업자 정보 단일 소스.
 *
 * 푸터, 개인정보처리방침, 회사소개, 문의 페이지, 구조화 데이터가 전부 여기서 파생됩니다.
 * 값이 바뀌면 이 파일만 고치면 됩니다.
 *
 * 브랜드명(닥터플래너스)과 법인 상호(DCD 컴퍼니)는 다릅니다 — 사이트가 파는 이름은
 * 브랜드지만, 법적으로 표기해야 하는 것은 상호·대표자·사업자등록번호입니다.
 */
export const COMPANY = {
  /** 법인 상호 */
  legalName: "DCD 컴퍼니",
  legalNameKo: "디씨디컴퍼니",
  ceo: "한재운",
  bizNo: "501-05-48517",

  email: "contact@dcdcompany.com",
  tel: "010-9752-2358",

  address: {
    line1: "충북 청주시 율봉로 183",
    line2: "3층 303호",
    region: "충청북도",
    locality: "청주시",
    country: "KR",
  },
} as const;

/** 한 줄 주소 */
export const ADDRESS_LINE = `${COMPANY.address.line1} ${COMPANY.address.line2}`;

/** tel: 링크용 — 하이픈 제거 */
export const TEL_HREF = `tel:${COMPANY.tel.replace(/-/g, "")}`;

/** 푸터 하단 법적 표기 한 줄 */
export const LEGAL_LINE = [
  `상호 ${COMPANY.legalName}(${COMPANY.legalNameKo})`,
  `대표 ${COMPANY.ceo}`,
  `사업자등록번호 ${COMPANY.bizNo}`,
].join(" · ");
