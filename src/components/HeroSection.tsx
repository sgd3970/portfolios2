'use client';

import React, { useEffect, useState } from 'react';
import { heroData } from '@/data/mockData';
import { smoothScrollTo, createTypingAnimation } from '@/utils/animations';
import { HeroSection as HeroSectionType } from '@/types';

/**
 * HeroSection 컴포넌트
 * 메인 히어로 섹션으로 전문성과 신뢰성을 강조하는 디자인
 * 
 * 주요 기능:
 * - 고품질 배경 이미지로 전문적인 분위기 연출
 * - 타이핑 애니메이션으로 동적인 효과
 * - 반응형 레이아웃 (모바일 최적화)
 * - 부드러운 스크롤 CTA 버튼
 * - 패럴랙스 스크롤 효과
 */

interface HeroSectionProps {
  /** 히어로 섹션 데이터 (선택사항, 기본값은 mockData 사용) */
  data?: HeroSectionType;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 타이핑 애니메이션 활성화 여부 */
  enableTypingAnimation?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  data = heroData,
  className = '',
  enableTypingAnimation = true,
}) => {
  // 상태 관리
  const [isLoaded, setIsLoaded] = useState(false); // 이미지 로드 상태
  const [titleRef, setTitleRef] = useState<HTMLHeadingElement | null>(null); // 제목 참조

  /**
   * 컴포넌트 마운트 시 애니메이션 초기화
   */
  useEffect(() => {
    // 이미지 로드 완료 시 애니메이션 시작
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  /**
   * 타이핑 애니메이션 실행
   */
  useEffect(() => {
    if (isLoaded && enableTypingAnimation && titleRef) {
      // 타이핑 애니메이션 실행
      createTypingAnimation(titleRef, data.title, 100, 500);
    }
  }, [isLoaded, enableTypingAnimation, titleRef, data.title]);

  /**
   * CTA 버튼 클릭 핸들러
   * 부드러운 스크롤로 해당 섹션으로 이동
   */
  const handleCtaClick = () => {
    if (data.ctaLink.startsWith('#')) {
      const targetId = data.ctaLink.substring(1);
      smoothScrollTo(targetId, 80);
    }
  };

  /**
   * 배경 이미지 로드 핸들러
   */
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <section
      id="hero"
      className={`
        relative min-h-screen flex items-center justify-center
        overflow-hidden bg-navy-primary
        ${className}
      `}
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.backgroundImage}
          alt="전문적인 법률 서비스 배경"
          className={`
            w-full h-full object-cover
            transition-opacity duration-1000 ease-out
            filter blur-sm
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={handleImageLoad}
        />
        
        {/* 가독성 향상을 위한 메인 오버레이 (투명도 낮춤) */}
        <div className="absolute inset-0 bg-navy-primary/50" />
        
        {/* 중앙 텍스트 영역 강화 오버레이 (투명도 낮춤) */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-primary/60 via-navy-primary/25 to-navy-primary/60" />
        
        {/* 텍스트 집중 영역 추가 오버레이 (투명도 낮춤) */}
        <div className="absolute top-1/4 left-0 right-0 h-1/2 bg-gradient-to-b from-navy-primary/10 via-navy-primary/20 to-navy-primary/10" />
        
        {/* 추가 백색 오버레이로 밝기 조정 */}
        <div className="absolute inset-0 bg-white/15" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* 메인 제목 */}
          <h1
            ref={setTitleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy-primary leading-tight tracking-wide mb-12 drop-shadow-lg"
            style={{
              textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.6)'
            }}
            dangerouslySetInnerHTML={{
              __html: !enableTypingAnimation ? data.title : ''
            }}
          >
          </h1>

          {/* 서브타이틀 */}
          <p 
            className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed font-medium mb-16 drop-shadow-md"
            style={{
              textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7), -1px -1px 2px rgba(255, 255, 255, 0.5)'
            }}
          >
            {data.subtitle}
          </p>

          {/* CTA 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* 주요 CTA 버튼 */}
            <button
              onClick={handleCtaClick}
              className="bg-gold-accent hover:bg-gold-accent/90 text-navy-primary font-semibold px-8 py-4 rounded-lg text-lg min-w-48 transition-all duration-300 ease-out hover:transform hover:-translate-y-1 hover:shadow-lg"
            >
              {data.ctaText}
            </button>

            {/* 보조 CTA 버튼 */}
            <button
              onClick={() => smoothScrollTo('strengths', 80)}
              className="bg-white text-navy-primary hover:bg-gray-100 px-8 py-4 rounded-lg text-lg min-w-48 font-semibold transition-all duration-300 ease-out hover:transform hover:-translate-y-1 hover:shadow-lg"
            >
              회사 소개
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 