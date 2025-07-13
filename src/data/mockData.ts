// Mock data for the consulting/legal/financial website

import { 
  TeamMember, 
  Strength, 
  Achievement, 
  NewsArticle, 
  ContactInfo, 
  NavigationItem, 
  HeroSection 
} from '@/types';

// Hero Section Data
export const heroData: HeroSection = {
  title: "전문성과 신뢰를 바탕으로 한 <br/><br/>최고의 법률 서비스",
  subtitle: "30년 이상의 경험과 전문성을 바탕으로 고객의 성공을 위해 헌신합니다.",
  backgroundImage: "/images/hero/lawImage.png",
  ctaText: "서비스 문의",
  ctaLink: "#contact"
};

// Navigation Data
export const navigationData: NavigationItem[] = [
  { id: "home", label: "홈", href: "/" },
  { id: "strengths", label: "소개", href: "#strengths" },
  { id: "team", label: "전문 인력", href: "#team" },
  { id: "achievements", label: "실적", href: "#achievements" },
  { id: "news", label: "뉴스", href: "#news" },
  { id: "contact", label: "문의", href: "#contact" }
];

// Company Strengths Data
export const strengthsData: Strength[] = [
  {
    id: "expertise",
    title: "전문성",
    description: "30년 이상의 경험을 바탕으로 한 전문적인 법률 서비스와 컨설팅을 제공합니다. 각 분야별 전문가들이 최고 수준의 서비스를 보장합니다.",
    icon: "⚖️",
    order: 1
  },
  {
    id: "trust",
    title: "신뢰성",
    description: "고객과의 약속을 최우선으로 생각하며, 투명하고 정직한 서비스를 제공합니다. 모든 프로젝트에서 최고의 결과를 보장합니다.",
    icon: "🤝",
    order: 2
  },
  {
    id: "innovation",
    title: "혁신성",
    description: "최신 기술과 혁신적인 접근법을 통해 고객에게 최적화된 솔루션을 제공합니다. 끊임없는 연구와 개발로 업계를 선도합니다.",
    icon: "💡",
    order: 3
  },
  {
    id: "global",
    title: "글로벌 네트워크",
    description: "전 세계 주요 도시의 파트너들과 협력하여 국제적인 법률 서비스를 제공합니다. 다양한 국가의 법률 전문가들과 연결됩니다.",
    icon: "🌍",
    order: 4
  },
  {
    id: "efficiency",
    title: "효율성",
    description: "체계적인 프로세스와 최신 기술을 활용하여 빠르고 효율적인 서비스를 제공합니다. 시간과 비용을 최적화하여 고객 만족도를 높입니다.",
    icon: "⚡",
    order: 5
  },
  {
    id: "support",
    title: "24/7 지원",
    description: "언제든지 필요한 순간에 전문가의 도움을 받을 수 있는 24시간 지원 서비스를 제공합니다. 긴급 상황에도 즉시 대응합니다.",
    icon: "🕐",
    order: 6
  }
];

// Team Members Data
export const teamData: TeamMember[] = [
  {
    id: "ceo",
    name: "김철수",
    position: "대표이사",
    department: "경영진",
    profileImage: "data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='300' fill='%230A1F44'/%3E%3Ccircle cx='150' cy='120' r='40' fill='%23ffffff' opacity='0.9'/%3E%3Cpath d='M100,200 C100,180 120,160 150,160 C180,160 200,180 200,200 L200,250 L100,250Z' fill='%23ffffff' opacity='0.85'/%3E%3Crect x='145' y='160' width='10' height='30' fill='%23B8860B'/%3E%3Ctext x='150' y='280' text-anchor='middle' fill='%23ffffff' font-family='serif' font-size='18' font-weight='600'%3E김철수%3C/text%3E%3Ctext x='150' y='295' text-anchor='middle' fill='%23B8860B' font-family='sans-serif' font-size='12' font-weight='500'%3E대표이사%3C/text%3E%3C/svg%3E",
    shortBio: "30년 경력의 법률 전문가로서 기업 법무 및 국제 거래에 특화된 전문가입니다.",
    expertise: ["기업법무", "국제거래", "M&A", "컴플라이언스", "리스크 관리"],
    education: ["서울대학교 법학과", "하버드 로스쿨 LLM"],
    career: ["김앤장 법률사무소 파트너", "대한변호사협회 이사", "법무부 자문위원"],
    email: "kim@company.com",
    phone: "02-1234-5678",
    linkedin: "https://linkedin.com/in/kim-cs"
  },
  {
    id: "cto",
    name: "이영희",
    position: "기술이사",
    department: "기술부",
    profileImage: "data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='300' fill='%230A1F44'/%3E%3Ccircle cx='150' cy='120' r='40' fill='%23ffffff' opacity='0.9'/%3E%3Cpath d='M100,200 C100,180 120,160 150,160 C180,160 200,180 200,200 L200,250 L100,250Z' fill='%23ffffff' opacity='0.85'/%3E%3Crect x='145' y='160' width='10' height='30' fill='%23B8860B'/%3E%3Ctext x='150' y='280' text-anchor='middle' fill='%23ffffff' font-family='serif' font-size='18' font-weight='600'%3E이영희%3C/text%3E%3Ctext x='150' y='295' text-anchor='middle' fill='%23B8860B' font-family='sans-serif' font-size='12' font-weight='500'%3E기술이사%3C/text%3E%3C/svg%3E",
    shortBio: "최신 법률 기술과 디지털 혁신을 선도하는 법률 기술 전문가입니다.",
    expertise: ["법률기술", "디지털혁신", "AI법률", "블록체인", "사이버보안"],
    education: ["KAIST 컴퓨터공학과", "연세대 법학과"],
    career: ["테크 스타트업 CTO", "법률기술 컨설턴트", "디지털 혁신 전문가"],
    email: "lee@company.com",
    phone: "02-1234-5679",
    linkedin: "https://linkedin.com/in/lee-yh"
  },
  {
    id: "cfo",
    name: "박민수",
    position: "재무이사",
    department: "재무부",
    profileImage: "data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='300' fill='%230A1F44'/%3E%3Ccircle cx='150' cy='120' r='40' fill='%23ffffff' opacity='0.9'/%3E%3Cpath d='M100,200 C100,180 120,160 150,160 C180,160 200,180 200,200 L200,250 L100,250Z' fill='%23ffffff' opacity='0.85'/%3E%3Crect x='145' y='160' width='10' height='30' fill='%23B8860B'/%3E%3Ctext x='150' y='280' text-anchor='middle' fill='%23ffffff' font-family='serif' font-size='18' font-weight='600'%3E박민수%3C/text%3E%3Ctext x='150' y='295' text-anchor='middle' fill='%23B8860B' font-family='sans-serif' font-size='12' font-weight='500'%3E재무이사%3C/text%3E%3C/svg%3E",
    shortBio: "글로벌 금융 시장의 전문가로서 기업 재무 전략 및 투자 분석에 특화되어 있습니다.",
    expertise: ["재무관리", "투자분석", "리스크관리", "자본시장", "세무전략"],
    education: ["고려대학교 경영학과", "와튼스쿨 MBA"],
    career: ["삼성증권 투자은행부", "골드만삭스 한국지사", "재무 컨설턴트"],
    email: "park@company.com",
    phone: "02-1234-5680",
    linkedin: "https://linkedin.com/in/park-ms"
  }
];

// Achievements Data
export const achievementsData: Achievement[] = [
  {
    id: "samsung-case",
    title: "대형 기업 인수합병 자문",
    description: "국내 대기업의 해외 자회사 인수합병 과정에서 전반적인 법률 자문을 제공하여 성공적인 거래를 이끌어냈습니다.",
    clientName: "삼성그룹",
    clientLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InNhbXN1bmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMTQyOEE0Ii8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzIxNTNERiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTUiIGZpbGw9InVybCgjc2Ftc3VuZykiLz4KPHN0eWxlPgoudGV4dCB7IGZpbGw6ICNmZmZmZmY7IGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyBmb250LXNpemU6IDEycHg7IGZvbnQtd2VpZ2h0OiA3MDA7IH0KPC9zdHlsZT4KPHRleHQgeD0iNTAiIHk9IjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0idGV4dCI+U0FNU1VORzwvdGV4dD4KPC9zdmc+",
    year: 2023,
    category: "기업법무",
    value: "50억 원",
    duration: "6개월"
  },
  {
    id: "lg-case",
    title: "국제 계약 분쟁 해결",
    description: "복잡한 국제 상거래 분쟁에서 중재를 통한 성공적인 해결을 이끌어내어 고객의 손실을 최소화했습니다.",
    clientName: "LG그룹",
    clientLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImxnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0E1MzU0NSIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNEQzE0M0MiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjE1IiBmaWxsPSJ1cmwoI2xnKSIvPgo8c3R5bGU+Ci50ZXh0IHsgZmlsbDogI2ZmZmZmZjsgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMTZweDsgZm9udC13ZWlnaHQ6IDcwMDsgfQo8L3N0eWxlPgo8dGV4dCB4PSI1MCIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGNsYXNzPSJ0ZXh0Ij5MRzwvdGV4dD4KPC9zdmc+",
    year: 2023,
    category: "국제법무",
    value: "30억 원",
    duration: "4개월"
  },
  {
    id: "hyundai-case",
    title: "컴플라이언스 시스템 구축",
    description: "글로벌 기업의 내부 컴플라이언스 시스템을 구축하여 법적 리스크를 최소화하고 투명성을 확보했습니다.",
    clientName: "현대자동차",
    clientLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9Imh5dW5kYWkiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMDA0Q0JGIi8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwNjVBNyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTUiIGZpbGw9InVybCgjaHl1bmRhaSkiLz4KPHN0eWxlPgoudGV4dCB7IGZpbGw6ICNmZmZmZmY7IGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyBmb250LXNpemU6IDEycHg7IGZvbnQtd2VpZ2h0OiA3MDA7IH0KPC9zdHlsZT4KPHRleHQgeD0iNTAiIHk9IjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0idGV4dCI+SFlVTkRBSTwvdGV4dD4KPHRleHQgeD0iNTAiIHk9IjY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0idGV4dCI+TU9UT1I8L3RleHQ+Cjwvc3ZnPg==",
    year: 2022,
    category: "컴플라이언스",
    value: "20억 원",
    duration: "8개월"
  },
  {
    id: "kakao-case",
    title: "디지털 플랫폼 법률 자문",
    description: "핀테크 및 디지털 플랫폼 사업의 법적 검토와 규제 대응을 통해 안정적인 사업 운영을 지원했습니다.",
    clientName: "카카오",
    clientLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9Imtha2FvIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZGRUUwMCIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkRCMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjE1IiBmaWxsPSJ1cmwoI2tha2FvKSIvPgo8c3R5bGU+Ci50ZXh0IHsgZmlsbDogIzAwMDAwMDsgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMTJweDsgZm9udC13ZWlnaHQ6IDcwMDsgfQo8L3N0eWxlPgo8dGV4dCB4PSI1MCIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGNsYXNzPSJ0ZXh0Ij5LQUtBTzwvdGV4dD4KPC9zdmc+",
    year: 2022,
    category: "디지털법무",
    value: "15억 원",
    duration: "5개월"
  },
  {
    id: "naver-case",
    title: "IP 및 데이터 보호 자문",
    description: "지적재산권 보호 전략 수립과 개인정보 보호법 준수를 위한 포괄적인 법률 자문을 제공했습니다.",
    clientName: "네이버",
    clientLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9Im5hdmVyIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAzQzc1QSIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMEE5NTEiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjE1IiBmaWxsPSJ1cmwoI25hdmVyKSIvPgo8c3R5bGU+Ci50ZXh0IHsgZmlsbDogI2ZmZmZmZjsgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMTJweDsgZm9udC13ZWlnaHQ6IDcwMDsgfQo8L3N0eWxlPgo8dGV4dCB4PSI1MCIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGNsYXNzPSJ0ZXh0Ij5OQVZFUjwvdGV4dD4KPC9zdmc+",
    year: 2021,
    category: "IP/데이터",
    value: "25억 원",
    duration: "6개월"
  },
  {
    id: "coupang-case",
    title: "이커머스 플랫폼 규제 대응",
    description: "전자상거래 플랫폼의 각종 규제 대응과 소비자 보호 정책 수립을 통해 안정적인 사업 환경을 조성했습니다.",
    clientName: "쿠팡",
    clientLogo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImNvdXBhbmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRkYzMzMzIi8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0VGMjAyMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTUiIGZpbGw9InVybCgjY291cGFuZykiLz4KPHN0eWxlPgoudGV4dCB7IGZpbGw6ICNmZmZmZmY7IGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyBmb250LXNpemU6IDEycHg7IGZvbnQtd2VpZ2h0OiA3MDA7IH0KPC9zdHlsZT4KPHRleHQgeD0iNTAiIHk9IjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBjbGFzcz0idGV4dCI+Q09VUEFORzwvdGV4dD4KPC9zdmc+",
    year: 2021,
    category: "이커머스",
    value: "18억 원",
    duration: "7개월"
  }
];

// News Articles Data
export const newsData: NewsArticle[] = [
  {
    id: "news-1",
    title: "2024년 개인정보보호법 개정안 주요 변경사항",
    excerpt: "개인정보보호법의 중요한 변경사항들과 기업이 준비해야 할 사항들을 상세히 분석했습니다.",
    content: "개인정보보호법 개정안의 주요 변경사항과 기업 대응 방안에 대한 전문가 분석...",
    category: "법률분석",
    author: "김철수",
    publishedAt: "2024-01-15",
    tags: ["개인정보보호법", "법률개정", "컴플라이언스", "데이터보호"],
    featured: true
  },
  {
    id: "news-2",
    title: "ESG 경영과 법적 리스크 관리",
    excerpt: "ESG 경영 도입 시 고려해야 할 법적 리스크와 관리 방안을 제시합니다.",
    content: "ESG 경영이 기업에 미치는 법적 영향과 리스크 관리 전략...",
    category: "기업법무",
    author: "이영희",
    publishedAt: "2024-01-10",
    tags: ["ESG", "기업경영", "지속가능경영", "리스크관리"],
    featured: false
  },
  {
    id: "news-3",
    title: "메타버스 플랫폼의 법적 쟁점과 대응전략",
    excerpt: "메타버스 시대의 새로운 법적 쟁점들과 기업의 대응 전략을 분석합니다.",
    content: "메타버스 플랫폼 운영 시 발생할 수 있는 법적 쟁점들과 대응 방안...",
    category: "디지털법무",
    author: "박민수",
    publishedAt: "2024-01-05",
    tags: ["메타버스", "디지털법무", "플랫폼", "가상현실"],
    featured: false
  },
  {
    id: "news-4",
    title: "국제 계약서 작성 시 주의사항",
    excerpt: "국제 계약서 작성 시 놓치기 쉬운 중요 사항들과 실무 팁을 공유합니다.",
    content: "국제 계약서 작성의 핵심 포인트와 실무에서 유의할 점들...",
    category: "국제법무",
    author: "김철수",
    publishedAt: "2023-12-28",
    tags: ["국제계약", "계약서작성", "국제법무", "실무"],
    featured: false
  },
  {
    id: "news-5",
    title: "스타트업 투자유치 시 법적 체크리스트",
    excerpt: "스타트업이 투자유치 과정에서 반드시 확인해야 할 법적 사항들을 정리했습니다.",
    content: "스타트업 투자유치 시 필요한 법적 준비사항과 체크리스트...",
    category: "투자법무",
    author: "이영희",
    publishedAt: "2023-12-20",
    tags: ["스타트업", "투자유치", "법적검토", "체크리스트"],
    featured: false
  },
  {
    id: "news-6",
    title: "AI 기술 도입 시 법적 고려사항",
    excerpt: "기업에서 AI 기술을 도입할 때 반드시 고려해야 할 법적 사항들을 분석합니다.",
    content: "AI 기술 도입의 법적 쟁점과 기업의 대응 방안...",
    category: "기술법무",
    author: "박민수",
    publishedAt: "2023-12-15",
    tags: ["인공지능", "AI", "기술법무", "법적검토"],
    featured: true
  }
];

// Company Information
export const companyInfo = {
  name: "Vision Legal Partners",
  tagline: "Excellence in Legal Services",
  description: "30년 이상의 경험과 전문성을 바탕으로 고객의 성공을 위해 헌신하는 법률 전문 기업입니다.",
  address: "서울특별시 강남구 테헤란로 123",
  phone: "02-1234-5678",
  email: "info@visionlegal.com",
  website: "https://visionlegal.com"
};

// Contact Information
export const contactData: ContactInfo = {
  address: "서울특별시 강남구 테헤란로 123, 타워빌딩 15층",
  phone: "02-1234-5678",
  email: "info@visionlegal.com",
  businessHours: "24시간 상담 가능",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.425!2d127.0276!3d37.4979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI5JzUyLjQiTiAxMjfCsDAzJzIzLjQiRQ!5e0!3m2!1sko!2skr!4v1234567890"
}; 