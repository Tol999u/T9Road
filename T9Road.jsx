import React, { useState } from 'react';
import { 
  Search, Bell, User, MapPin, AlertTriangle, CloudSun, 
  Mic, Car, DollarSign, ShieldAlert, MessageSquare, ChevronDown, 
  Utensils, Hotel, Bus, ShoppingBag, Star, Shield
} from 'lucide-react';

// 8개국 17개 도시 확장 데이터베이스
const COUNTRY_DATA = {
  // 1. 일본 (4개 도시)
  tokyo: {
    name: "🇯🇵 일본 - 도쿄",
    currency: "JPY (엔화)",
    alert: { type: "⛈️ [LIVE]", text: "도쿄 인근 기습 폭우로 야마노테선 일부 지연 운행 중", level: "bg-amber-500" },
    weather: { temp: "22°C", feels: "21°C", humidity: "55%", tip: "일교차가 큽니다. 가벼운 외투와 접이식 우산을 챙기세요." },
    issues: [
      { id: 1, title: "시부야 메가돈키호테 면세 결제 대기시간 약 45분 소요", comments: 32 },
      { id: 2, title: "도쿄 지하철 72시간 패스 본전 뽑는 추천 코스 공유", comments: 19 },
      { id: 3, title: "스카이트리 당일권 현장 매진, 온라인 사전 예매 필수", comments: 11 }
    ],
    places: [
      { id: 1, name: "이치란 신주쿠 메인다니점", rating: "4.2", reviews: "3,400+", tag: "신주쿠 | 라멘", tip: "비밀 소스 5배 추천! 현금 전용 키오스크가 많으니 현금 준비 필수" },
      { id: 2, name: "몬자야키 모헤지 시부야 스크램블", rating: "4.5", reviews: "1,100+", tag: "시부야 | 몬자야키", tip: "오픈런 추천! 직원분이 직접 맛있게 볶아줍니다." }
    ]
  },
  osaka: {
    name: "🇯🇵 일본 - 오사카",
    currency: "JPY (엔화)",
    alert: { type: "🚨 [안내]", text: "난바역 주변 인파 집중으로 이동 시 소지품 소매치기 주의", level: "bg-blue-500" },
    weather: { temp: "24°C", feels: "24°C", humidity: "60%", tip: "도톤보리 야경 투어 시 도보 이동이 많으니 편한 운동화 착용 권장" },
    issues: [
      { id: 1, title: "유니버설 스튜디오 익스프레스 티켓 현장 구매 불가", comments: 45 },
      { id: 2, title: "우메다 공중정원 노을 시간대 입구 대기 줄 길어짐", comments: 28 },
      { id: 3, title: "난바역 주교통 카드 파스모/이코카 간편 충전 팁", comments: 14 }
    ],
    places: [
      { id: 1, name: "쿠시카츠 다루마 도톤보리점", rating: "4.3", reviews: "2,800+", tag: "도톤보리 | 튀김꼬치", tip: "소스 베이스 한 번만 찍는 규칙 준수! 양배추는 기본 무한 리필" },
      { id: 2, name: "한신데파트 타코야끼", rating: "4.6", reviews: "920+", tag: "우메다 | 타코야끼", tip: "겉바속촉 진수. 파 추가 필수 추천" }
    ]
  },
  fukuoka: {
    name: "🇯🇵 일본 - 후쿠오카",
    currency: "JPY (엔화)",
    alert: { type: "💡 [팁]", text: "하카타역 내 명란 바게트 인기 매장 대기시간 발생 중", level: "bg-emerald-500" },
    weather: { temp: "23°C", feels: "23°C", humidity: "50%", tip: "버스 뒷문 승차 후 정리권 챙기기 필수 (전철보다 버스가 편리함)" },
    issues: [
      { id: 1, title: "텐진 돈키호테 의약품 결제 카운터 별도 운영 안내", comments: 21 },
      { id: 2, title: "유후인 타케오 온천 당일치기 버스 좌석 지정 팁", comments: 37 },
      { id: 3, title: "후쿠오카 공항 입국 심사 스마트폰 Q-Code 전용 줄 이용", comments: 18 }
    ],
    places: [
      { id: 1, name: "신신라멘 하카타 본점", rating: "4.4", reviews: "4,100+", tag: "텐진 | 돈코츠 라멘", tip: "잡내 없는 돈코츠 라멘. 계란 추가 필수!" },
      { id: 2, name: "키와미야 함바그 하카타점", rating: "4.5", reviews: "3,100+", tag: "하카타 | 함바그", tip: "개인 스톤에 구워 먹는 방식. 기름이 많이 튀니 앞치마 필수" }
    ]
  },
  hokkaido: {
    name: "🇯🇵 일본 - 홋카이도(삿포로)",
    currency: "JPY (엔화)",
    alert: { type: "❄️ [날씨]", text: "삿포로 외곽 일교차 심함, 일몰 후 체감온도 급격히 하강 주의", level: "bg-blue-600" },
    weather: { temp: "16°C", feels: "14°C", humidity: "65%", tip: "바람막이 및 경량 패딩 준비 필수. 징기스칸 식당 사전 예약 권장" },
    issues: [
      { id: 1, title: "비에이 투어 버스 당일 예약 불가, 최소 3일 전 완료 권장", comments: 40 },
      { id: 2, title: "신치토세 공항 도라에몽 파크 및 스프카레 대기시간", comments: 16 },
      { id: 3, title: "오타루 운하 야경 가스등 켜지는 시간 안내", comments: 22 }
    ],
    places: [
      { id: 1, name: "징기스칸 다루마 4.4", rating: "4.4", reviews: "2,500+", tag: "스스키노 | 양고기", tip: "연기가 많이 나니 비닐봉투에 옷 보관. 양고기 모듬 메뉴 추천" },
      { id: 2, name: "스프카레 가라쿠", rating: "4.6", reviews: "3,800+", tag: "스스키노 | 스프카레", tip: "맵기 3~5단계 추천. 닭다리 스프카레가 시그니처" }
    ]
  },

  // 2. 태국 (2개 도시)
  bangkok: {
    name: "🇹🇭 태국 - 방콕",
    currency: "THB (바트)",
    alert: { type: "🚨 [속보]", text: "스쿰빗 도로 정체 심화, 인근 이동 시 지하철(BTS/MRT) 권장", level: "bg-red-500" },
    weather: { temp: "32°C", feels: "36°C", humidity: "75%", tip: "야외 활동 시 자외선 차단제 필수! 실내는 에어컨이 강하니 얇은 겉옷 챙기세요." },
    issues: [
      { id: 1, title: "현재 아이콘시암 면세/환전 대기시간 약 15분 소요", comments: 8 },
      { id: 2, title: "스쿰빗 도로 대형 정체 중! BTS 이용 추천", comments: 23 },
      { id: 3, title: "왓 아룬 야경 명소 명당 자리 꿀팁 공유", comments: 15 }
    ],
    places: [
      { id: 1, name: "팁싸마이 (Thipsamai)", rating: "4.3", reviews: "1,200+", tag: "프라나콘 | 팟타이", tip: "오렌지 주스 꼭 주문하세요! 향신료 향이 약해 한국인 입맛에 딱 맞습니다." },
      { id: 2, name: "똠얌꿍 방람푸", rating: "4.5", reviews: "850+", tag: "카오산로드 | 현지 노포", tip: "주문 시 '마이사이팍치(고수 빼주세요)'를 꼭 전달하세요." }
    ]
  },
  phuket: {
    name: "🇹🇭 태국 - 푸켓",
    currency: "THB (바트)",
    alert: { type: "🌊 [해양]", text: "빠통 비치 파도 약간 높음, 수영 시 안전요원 기치 확인", level: "bg-teal-500" },
    weather: { temp: "30°C", feels: "34°C", humidity: "80%", tip: "스노클링 시 래시가드 착용 필수. 택시 이용 시 Bolt/Grab 앱 가격 비교" },
    issues: [
      { id: 1, title: "피피섬 일일 스노클링 투어 선착장 미팅 시간 주의", comments: 19 },
      { id: 2, title: "정실론 쇼핑몰 내 빅씨마트 텍스리펀 창구 현황", comments: 11 },
      { id: 3, title: "올드타운 주말 야시장 영업시간 및 주차 안내", comments: 15 }
    ],
    places: [
      { id: 1, name: "넘버식스 (No.6 Restaurant)", rating: "4.2", reviews: "2,100+", tag: "빠통비치 | 현지식", tip: "모닝글로리볶음과 푸팟퐁커리 강추. 언덕 위 본점행 셔틀 운행" },
      { id: 2, name: "라바이 씨푸드 마켓", rating: "4.4", reviews: "1,300+", tag: "라바이 | 해산물", tip: "시장 부스에서 해산물 구매 후 맞은편 식당에 요리비 지불 방식" }
    ]
  },

  // 3. 베트남 (3개 도시)
  danang: {
    name: "🇻🇳 베트남 - 다낭",
    currency: "VND (동)",
    alert: { type: "🚕 [교통]", text: "공항 호객 행위 주의, Grab(그랩) 예약 차량만 이용하세요", level: "bg-emerald-600" },
    weather: { temp: "29°C", feels: "32°C", humidity: "78%", tip: "바나힐 이동 시 고지대는 서늘하니 가디건 필수. 롯데마트 환전 우대율 좋음" },
    issues: [
      { id: 1, title: "바나힐 골든브릿지 안개 상태 실시간 웹캠 공유", comments: 52 },
      { id: 2, title: "한시장 아오자이 맞춤 제작 소요시간 약 2시간", comments: 34 },
      { id: 3, title: "목식당 해산물 사전 예약 카톡 채널 이용법", comments: 27 }
    ],
    places: [
      { id: 1, name: "목식당 (Moc Seafood)", rating: "4.6", reviews: "4,500+", tag: "미케비치 | 해산물", tip: "크랩 마늘버터 소스+볶음밥 조합 추천. 사전 에어컨 룸 예약 권장" },
      { id: 2, name: "안토이 (An Thoi)", rating: "4.5", reviews: "2,100+", tag: "한시장 인근 | 베트남 가정식", tip: "반쎄오와 반미 플래터 한국인 최애 메뉴" }
    ]
  },
  nhatrang: {
    name: "🇻🇳 베트남 - 나트랑",
    currency: "VND (동)",
    alert: { type: "☀️ [자외선]", text: "낮 시간대 한낮 자외선 지수 매우 높음, 모자/선글라스 필수", level: "bg-amber-500" },
    weather: { temp: "30°C", feels: "33°C", humidity: "72%", tip: "시내 빈원더스 케이블카 운영 여부 사전 확인. 시내 마사지샵 사전예약 필수" },
    issues: [
      { id: 1, title: "담시장 망고 가격 시세 현황 (1kg 기준 3만동 내외)", comments: 41 },
      { id: 2, title: "나트랑 시내 콩카페 코코넛 스무디 피크타임 줄 안내", comments: 15 },
      { id: 3, title: "아이리조트 머드온천 복장 및 준비물 체크리스트", comments: 29 }
    ],
    places: [
      { id: 1, name: "촌촌킴 (Chuon Chuon Kim)", rating: "4.4", reviews: "1,900+", tag: "시내 | 베트남 가정식", tip: "갈비찜 맛 나는 모닝글로리+돼지고기 볶음 추천" },
      { id: 2, name: "똠79 (Tom 79)", rating: "4.7", reviews: "1,200+", tag: "시내 | 크랩/랍스터", tip: "한국인 사장님 운영, 해산물 세트 양 푸짐" }
    ]
  },
  phuquoc: {
    name: "🇻🇳 베트남 - 푸꾸옥",
    currency: "VND (동)",
    alert: { type: "🚌 [셔틀]", text: "빈버스(VinBus) 무료 노선 시간표 최신 버전 앱 내 반영 완료", level: "bg-indigo-500" },
    weather: { temp: "28°C", feels: "31°C", humidity: "80%", tip: "북부(빈원더스)-남부(선셋타운) 이동 거리가 기니 빈버스 무료 셔틀 적극 활용" },
    issues: [
      { id: 1, title: "혼똔섬 케이블카 정기 점검 일정 사전 체크 필수", comments: 26 },
      { id: 2, title: "킹콩마트 기념품/커피 쇼핑 시 택스리펀 받는 법", comments: 33 },
      { id: 3, title: "선셋타운 키오브더씨 분수쇼 명당 자리 안내", comments: 19 }
    ],
    places: [
      { id: 1, name: "신짜오 식당 (Xin Chao)", rating: "4.3", reviews: "2,300+", tag: "즈엉동 | 해산물", tip: "일몰 시간대 창가 자리 예약 필수! 칠리 크랩 인기" },
      { id: 2, name: "메오키친 (Meo Kitchen)", rating: "4.8", reviews: "880+", tag: "소나시 | 베트남식", tip: "깔끔하고 세련된 인테리어. 쌀국수 국물 깊고 진함" }
    ]
  },

  // 4. 필리핀 (2개 도시)
  cebu: {
    name: "🇵🇭 필리핀 - 세부",
    currency: "PHP (페소)",
    alert: { type: "🚘 [교통]", text: "세부 시내-막탄 다리 구간 병목 정체, 공항 이동 시 1시간 여유 확보", level: "bg-red-500" },
    weather: { temp: "31°C", feels: "35°C", humidity: "76%", tip: "오스롭 고래상어 투어 시 새벽 출발(03시). 선크림 바다 입장 불법 유의" },
    issues: [
      { id: 1, title: "모알보알 정품 페소 환전소 샹그릴라 모듈 시세", comments: 18 },
      { id: 2, title: "막탄 아얄라몰 픽드랍 픽업 장소 변경 안내", comments: 12 },
      { id: 3, title: "공항 세부 입국 시 eTravel 바코드 사전 발급 필수", comments: 60 }
    ],
    places: [
      { id: 1, name: "골드망고 그릴 (Gold Mango Grill)", rating: "4.5", reviews: "1,700+", tag: "막탄 | 퓨전 퓨전식", tip: "감바스와 로제 파스타 강력 추천. 픽드랍 서비스 가능" },
      { id: 2, name: "라부에요 (Labuyo)", rating: "4.6", reviews: "950+", tag: "막탄 | 필리핀 현지식", tip: "시식(Sisig)과 레촌 롤 현지식 도전 필수" }
    ]
  },
  boracay: {
    name: "🇵🇭 필리핀 - 보라카이",
    currency: "PHP (페소)",
    alert: { type: "⛵ [이동]", text: "까티클란 선착장 환경세 징수 창구 줄 길어짐, 현금 준비", level: "bg-teal-600" },
    weather: { temp: "30°C", feels: "33°C", humidity: "75%", tip: "화이트비치 내 음식물 섭취 및 음주 금지 구역 설정 유의" },
    issues: [
      { id: 1, title: "디몰 단골 환전소 위치 및 실시간 달러 우대율", comments: 24 },
      { id: 2, title: "선셋 호핑투어 방카 배 사전 예약 예약금 환불 규정", comments: 16 },
      { id: 3, title: "크리스탈코브 섬 투어 재개장 여부 현황", comments: 20 }
    ],
    places: [
      { id: 1, name: "게릴라 아일랜드 (Guerilla)", rating: "4.4", reviews: "1,100+", tag: "디몰 | 해산물/바베큐", tip: "알리망오 크랩과 악마의 잼 할인 쿠폰 앱 적용" },
      { id: 2, name: "게르하르트 게스트하우스 베이커리", rating: "4.7", reviews: "800+", tag: "스테이션2 | 브런치", tip: "망고 셰이크와 갓 구운 모닝빵 가성비 최상" }
    ]
  },

  // 5. 호주 (3개 도시)
  sydney: {
    name: "🇦🇺 호주 - 시드니",
    currency: "AUD (호주달러)",
    alert: { type: "💳 [교통]", text: "트램/버스/페리 모두 실물 신용카드 컨택리스 결제 지원", level: "bg-blue-600" },
    weather: { temp: "19°C", feels: "18°C", humidity: "50%", tip: "자외선이 매우 강하니 SPF50+ 선크림 필수. 오페라하우스 내부 투어 사전 예약" },
    issues: [
      { id: 1, title: "오페라하우스 인근 시큐어 파킹 주차 예약 요금 할인", comments: 14 },
      { id: 2, title: "블루마운틴 궤도열차 가파른 구간 탑승 꿀팁", comments: 29 },
      { id: 3, title: "하버브릿지 클라이밍 티켓 취소 수수료 안내", comments: 9 }
    ],
    places: [
      { id: 1, name: "팬케이크 온 더 록스 (Pancakes On The Rocks)", rating: "4.3", reviews: "4,200+", tag: "록스 | 브런치/스테이크", tip: "악마의 초콜릿 팬케이크와 리브 바베큐 립 조화 추천" },
      { id: 2, name: "하버 사이드 해산물 시장 (Fish Market)", rating: "4.2", reviews: "3,100+", tag: "피시마켓 | 생굴/해산물", tip: "생굴(Oyster)과 연어회 현장 구매 후 야외 테이블 식사" }
    ]
  },
  perth: {
    name: "🇦🇺 호주 - 퍼스",
    currency: "AUD (호주달러)",
    alert: { type: "🚌 [무료버스]", text: "시내 중심가 FTZ(Free Transit Zone) 구역 버스 탑승 무료", level: "bg-emerald-600" },
    weather: { temp: "21°C", feels: "20°C", humidity: "45%", tip: "로트네스트 섬 이동 전 쿼카 셀카 렌즈 준비! 햇빛 차단 양산 추천" },
    issues: [
      { id: 1, title: "로트네스트 페리 화요일 할인 프로모션 스케줄", comments: 31 },
      { id: 2, title: "피너클스 사막 은하수 스냅투어 모임 장소 안내", comments: 25 },
      { id: 3, title: "킹스파크 킹스파크 야경 명소 주차장 팁", comments: 17 }
    ],
    places: [
      { id: 1, name: "C Restaurant in the Sky", rating: "4.5", reviews: "1,500+", tag: "시내 | 360도 회전 레스토랑", tip: "퍼스 시내 360도 뷰 감상. 애프터눈 티 세트 사전 예약 필수" },
      { id: 2, name: "시스 파크 버거 (Ciccerello's Fremantle)", rating: "4.3", reviews: "2,200+", tag: "프리맨틀 | 피시앤칩스", tip: "항구 앞에서 먹는 정통 피시앤칩스. 갈매기 주의!" }
    ]
  },
  brisbane: {
    name: "🇦🇺 호주 - 브리즈번",
    currency: "AUD (호주달러)",
    alert: { type: "⛴️ [페리]", text: "시티호퍼(CityHopper) 무료 레드 페리로 주요 관광지 이동 가능", level: "bg-teal-500" },
    weather: { temp: "23°C", feels: "22°C", humidity: "55%", tip: "사우스뱅크 인공비치 수영복 챙기기. 론파인 코알라 보호구역 입장권 사전할인" },
    issues: [
      { id: 1, title: "골드코스트 서퍼스 파라다이스 당일치기 트램 이용권", comments: 23 },
      { id: 2, title: "사우스뱅크 인공비치 라커룸 사용 요금 안내", comments: 11 },
      { id: 3, title: "마운트쿠사 전망대 일몰 카메라스팟 위치", comments: 16 }
    ],
    places: [
      { id: 1, name: "모에 모에 (Moo Moo The Wine Bar)", rating: "4.6", reviews: "1,100+", tag: "시내 | 드라이에이징 스테이크", tip: "호주산 드라이에이징 스테이크의 정석. 와인 페어링 추천" },
      { id: 2, name: "Eat Street Northshore", rating: "4.7", reviews: "5,400+", tag: "해안가 | 컨테이너 야시장", tip: "금/토/일만 영업! 라이브 공연과 전 세계 길거리 음식 총집합" }
    ]
  },

  // 6. 프랑스 (1개 도시)
  paris: {
    name: "🇫🇷 프랑스 - 파리",
    currency: "EUR (유로)",
    alert: { type: "⚠️ [치안]", text: "에펠탑 및 지하철 1/4호선 주변 소매치기 삼중 주의", level: "bg-red-600" },
    weather: { temp: "18°C", feels: "17°C", humidity: "60%", tip: "나비고 트래블 카드 증명사진 준비. 뮤지엄패스 사전 시간 지정 예약 필수" },
    issues: [
      { id: 1, title: "루브르 박물관 현장권 매진, 공식홈 시각 예약 필수", comments: 68 },
      { id: 2, title: "에펠탑 정각 반짝이는 화이트 에펠 시각 및 스팟", comments: 42 },
      { id: 3, title: "소매치기 수법: 서명 운동/팔찌 강제 착용 주의", comments: 85 }
    ],
    places: [
      { id: 1, name: "오 피에 드 코숑 (Au Pied de Cochon)", rating: "4.2", reviews: "4,100+", tag: "레알 | 전통 브라세리", tip: "프랑스식 족발 요리와 양파스프 맛집. 24시간 영업" },
      { id: 2, name: "사노키 (Sanuki Ya)", rating: "4.4", reviews: "2,900+", tag: "루브르 인근 | 우동", tip: "지드래곤 방문 우동집. 튀김 냉우동 세트 강추" }
    ]
  },

  // 7. 영국 (1개 도시)
  london: {
    name: "🇬🇧 영국 - 런던",
    currency: "GBP (파운드)",
    alert: { type: "🚌 [교통]", text: "오이스터 카드 대신 컨택리스(트래블로그/월렛) 카드 탑승 가능", level: "bg-blue-600" },
    weather: { temp: "17°C", feels: "16°C", humidity: "70%", tip: "갑작스러운 소나기 잦음. 3단 우산 항시 소지. 대영박물관 무료 입장이나 예약 필수" },
    issues: [
      { id: 1, title: "뮤지컬 데이티켓/로터리 당첨 확률 올리는 팁", comments: 39 },
      { id: 2, title: "스카이가든 무료 전망대 오픈 예약 3주 전 스케줄", comments: 51 },
      { id: 3, title: "버킹엄 궁전 근위병 교대식 일정 및 인파 회피 명당", comments: 30 }
    ],
    places: [
      { id: 1, name: "플랫 아이언 (Flat Iron Covent Garden)", rating: "4.4", reviews: "6,200+", tag: "코벤트가든 | 가성비 스테이크", tip: "14파운드 갓성비 스테이크! 후식으로 아이스크림 도장 받기" },
      { id: 2, name: "버로우 마켓 빠에야 (Borough Market)", rating: "4.5", reviews: "8,900+", tag: "버로우마켓 | 시장 먹거리", tip: "대형 솥 빠에야와 몬머스 커피 원두 구매 코스 추천" }
    ]
  },

  // 8. 미주 - 하와이 (1개 지역)
  hawaii: {
    name: "🇺🇸 미국 - 하와이(호놀룰루)",
    currency: "USD (달러)",
    alert: { type: "🚗 [렌트]", text: "와이키키 시내 주차비 박당 $40~$50 선, 공영주차장 활용 권장", level: "bg-amber-500" },
    weather: { temp: "27°C", feels: "29°C", humidity: "60%", tip: "ESTA 비자 사전 발급 필수. 하나우마베이 스노클링 예약 요일/시각 사전 체크" },
    issues: [
      { id: 1, title: "하나우마베이 수요일 오픈 예약전쟁 팁 공유", comments: 57 },
      { id: 2, title: "와이키키 인터내셔널 마켓 스트리트 3시간 무료주차 조건", comments: 22 },
      { id: 3, title: "쿠알로아 랜치 무비사이틀 투어 예약 가능 시기", comments: 33 }
    ],
    places: [
      { id: 1, name: "지오바니 새우트럭 (Giovanni's Shrimp)", rating: "4.3", reviews: "7,200+", tag: "노스쇼어 | 갈릭새우", tip: "스카피(Garlic Scampi) 강력 추천. 핫소스는 진짜 매우니 주의" },
      { id: 2, name: "마루카메 우동 와이키키 (Marugame Udon)", rating: "4.5", reviews: "9,100+", tag: "와이키키 | 우동/튀김", tip: "항상 줄이 길지만 회전율 빠름. 니쿠우동+무스비 조합 추천" }
    ]
  }
};

export default function Tol9uRoadApp() {
  const [selectedCity, setSelectedCity] = useState('tokyo');
  const [activeCategory, setActiveCategory] = useState('food');
  const currentData = COUNTRY_DATA[selectedCity] || COUNTRY_DATA['tokyo'];

  const handlePreventAction = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className="max-w-md mx-auto bg-gray-50 min-h-screen pb-32 font-sans text-gray-800 relative shadow-2xl select-none"
      onContextMenu={handlePreventAction}
      onCopy={handlePreventAction}
      onCut={handlePreventAction}
    >
      {/* HEADER */}
      <header className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-black tracking-wider">톨구로드 <span className="text-yellow-300 text-sm font-normal">(T9 Road)</span></h1>
        <div className="flex gap-3">
          <button className="p-1 hover:bg-blue-700 rounded-full"><Bell size={20} /></button>
          <button className="p-1 hover:bg-blue-700 rounded-full"><User size={20} /></button>
        </div>
      </header>

      {/* 1. 국가 / 도시 선택 영역 (17개 도시 드롭다운) */}
      <section className="bg-blue-600 px-4 pb-4 text-white">
        <div className="relative">
          <select 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-white text-gray-900 font-bold py-2.5 px-4 pr-10 rounded-xl appearance-none shadow-md focus:outline-none cursor-pointer text-base"
          >
            <optgroup label="🇯🇵 일본">
              <option value="tokyo">🇯🇵 일본 - 도쿄</option>
              <option value="osaka">🇯🇵 일본 - 오사카</option>
              <option value="fukuoka">🇯🇵 일본 - 후쿠오카</option>
              <option value="hokkaido">🇯🇵 일본 - 홋카이도(삿포로)</option>
            </optgroup>
            <optgroup label="🇹🇭 태국">
              <option value="bangkok">🇹🇭 태국 - 방콕</option>
              <option value="phuket">🇹🇭 태국 - 푸켓</option>
            </optgroup>
            <optgroup label="🇻🇳 베트남">
              <option value="danang">🇻🇳 베트남 - 다낭</option>
              <option value="nhatrang">🇻🇳 베트남 - 나트랑</option>
              <option value="phuquoc">🇻🇳 베트남 - 푸꾸옥</option>
            </optgroup>
            <optgroup label="🇵🇭 필리핀">
              <option value="cebu">🇵🇭 필리핀 - 세부</option>
              <option value="boracay">🇵🇭 필리핀 - 보라카이</option>
            </optgroup>
            <optgroup label="🇦🇺 호주">
              <option value="sydney">🇦🇺 호주 - 시드니</option>
              <option value="perth">🇦🇺 호주 - 퍼스</option>
              <option value="brisbane">🇦🇺 호주 - 브리즈번</option>
            </optgroup>
            <optgroup label="🇪🇺 유럽">
              <option value="paris">🇫🇷 프랑스 - 파리</option>
              <option value="london">🇬🇧 영국 - 런던</option>
            </optgroup>
            <optgroup label="🇺🇸 미주">
              <option value="hawaii">🇺🇸 미국 - 하와이(호놀룰루)</option>
            </optgroup>
          </select>
          <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={20} />
        </div>
      </section>

      {/* 2. 실시간 속보 */}
      <section className={`${currentData.alert.level} text-white px-4 py-2.5 flex items-center justify-between text-xs font-semibold shadow-inner`}>
        <div className="flex items-center gap-2 truncate pr-2">
          <span className="font-bold whitespace-nowrap bg-black/20 px-1.5 py-0.5 rounded">{currentData.alert.type}</span>
          <span className="truncate">{currentData.alert.text}</span>
        </div>
        <button className="whitespace-nowrap text-yellow-200 underline font-bold">자세히</button>
      </section>

      <main className="p-4 space-y-4">
        {/* 3. 날씨 */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-600 font-bold">
              <CloudSun size={24} />
              <span className="text-lg">{currentData.weather.temp}</span>
              <span className="text-xs text-gray-500 font-normal">(체감 {currentData.weather.feels})</span>
            </div>
            <span className="text-xs text-gray-400">습도 {currentData.weather.humidity}</span>
          </div>
          <p className="text-xs text-gray-600 bg-blue-50 p-2.5 rounded-xl border border-blue-100 leading-relaxed">
            💡 {currentData.weather.tip}
          </p>
        </div>

        {/* 4. 퀵 버튼 */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: <Mic className="text-blue-500" />, label: "파파고번역" },
            { icon: <Car className="text-green-500" />, label: "교통호출" },
            { icon: <DollarSign className="text-amber-500" />, label: currentData.currency.split(' ')[0] },
            { icon: <ShieldAlert className="text-red-500" />, label: "긴급SOS" },
          ].map((item, idx) => (
            <button key={idx} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-1 active:scale-95 transition">
              {item.icon}
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>

        {/* 5. 실시간 이슈 */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1">
            🔥 현지 실시간 ISSUE TOP 3
          </h2>
          <div className="space-y-2">
            {currentData.issues.map((issue) => (
              <div key={issue.id} className="flex justify-between items-center text-xs py-1.5 border-b border-gray-50 last:border-none">
                <span className="font-medium text-gray-700 truncate pr-2">{issue.id}. {issue.title}</span>
                <span className="text-gray-400 flex items-center gap-0.5 text-[10px] whitespace-nowrap">
                  <MessageSquare size={12} /> {issue.comments}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. 정보 카드 */}
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'food', label: '🍜 맛집·카페' },
              { id: 'stay', label: '🛏️ 숙소·치안' },
              { id: 'transit', label: '🚌 교통 guide' },
              { id: 'shop', label: '🛍️ 쇼핑·꿀팁' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                  activeCategory === tab.id 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-white text-gray-600 border border-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {currentData.places.map((place) => (
              <div key={place.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{place.name}</h3>
                    <span className="text-[11px] text-gray-400">{place.tag}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span>{place.rating}</span>
                    <span className="text-gray-300 font-normal">({place.reviews})</span>
                  </div>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-100 text-xs text-amber-900">
                  <span className="font-bold">💡 꿀팁: </span>{place.tip}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. 최하단 푸터 */}
        <footer className="mt-8 pt-6 pb-20 border-t border-gray-200 text-center text-gray-400 space-y-2 text-[11px] leading-relaxed">
          <div className="flex justify-center items-center gap-3 text-gray-500 font-medium">
            <button className="hover:underline">이용약관</button>
            <span>|</span>
            <button className="hover:underline font-bold text-gray-700">개인정보처리방침</button>
            <span>|</span>
            <button className="hover:underline">문의처</button>
          </div>
          
          <p className="text-gray-400">
            고객센터: support@tol9u.road | 1:1 문의 운영시간 09:00~18:00
          </p>

          <div className="bg-gray-100 p-3 rounded-xl border border-gray-200 text-[10px] text-gray-500 text-left space-y-1">
            <p className="font-bold text-gray-600 flex items-center gap-1">
              <Shield size={12} /> 무단 복제 및 배포 금지 안내
            </p>
            <p>
              본 서비스(톨구로드 / T9 Road)의 모든 콘텐츠, 디자인, 데이터 구조 및 소스코드는 저작권법의 보호를 받습니다. 
              소유권자의 서면 동의 없는 무단 복제, 배포, 수정, 2차 가공 및 상업적 이용을 엄격히 금지합니다.
            </p>
          </div>

          <p className="font-bold text-gray-500 pt-1">
            by tol9u. All rights reserved.
          </p>
        </footer>

      </main>

      {/* 8. 플로팅 바 */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-4 z-40">
        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-98 transition">
          <Mic className="animate-pulse" size={20} />
          <span className="text-xs font-bold">터치하여 현지인과 음성 대화하기 (파파고 STT)</span>
        </button>
      </div>

      {/* NAVBAR */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center text-xs text-gray-400 z-50">
        <button className="flex flex-col items-center gap-0.5 text-blue-600 font-bold">
          <MapPin size={18} /> 홈
        </button>
        <button className="flex flex-col items-center gap-0.5 hover:text-gray-600">
          <Bus size={18} /> 현지지도
        </button>
        <button className="flex flex-col items-center gap-0.5 hover:text-gray-600">
          <Mic size={18} /> 번역기
        </button>
        <button className="flex flex-col items-center gap-0.5 hover:text-gray-600">
          <ShoppingBag size={18} /> 저장목록
        </button>
      </nav>

    </div>
  );
}