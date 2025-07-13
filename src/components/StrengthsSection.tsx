'use client';

import React, { useEffect, useState } from 'react';
import { strengthsData } from '@/data/mockData';
import { initScrollAnimations, createCounterAnimation } from '@/utils/animations';
import { Strength } from '@/types';

/**
 * StrengthsSection 컴포넌트
 * 회사의 핵심 강점과 가치를 카드 형태로 제시하는 섹션
 * 
 * 주요 기능:
 * - 핵심 강점을 카드 형태로 시각화
 * - 2열 그리드 레이아웃 (반응형)
 * - 스크롤 애니메이션 효과
 * - 아이콘과 함께 강점 표시
 * - 번호 매기기 또는 아이콘 표시
 */

interface StrengthsSectionProps {
  /** 강점 데이터 (선택사항, 기본값은 mockData 사용) */
  data?: Strength[];
  /** 추가 CSS 클래스 */
  className?: string;
  /** 섹션 제목 */
  title?: string;
  /** 섹션 부제목 */
  subtitle?: string;
  /** 카드 레이아웃 타입 */
  layoutType?: 'grid' | 'list';
  /** 번호 표시 여부 */
  showNumbers?: boolean;
}

const StrengthsSection: React.FC<StrengthsSectionProps> = ({
  data = strengthsData,
  className = '',
  title = '우리의 강점',
  subtitle = '30년 이상의 경험과 전문성을 바탕으로 한 핵심 경쟁력',
  layoutType = 'grid',
  showNumbers = true,
}) => {
  // 상태 관리
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(new Set());

  /**
   * 컴포넌트 마운트 시 스크롤 애니메이션 초기화
   */
  useEffect(() => {
    // 스크롤 애니메이션 초기화
    initScrollAnimations();

    // Intersection Observer로 섹션 가시성 감지
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // 카드 애니메이션 스태거 효과
            setTimeout(() => {
              data.forEach((strength, index) => {
                setTimeout(() => {
                  setAnimatedCards(prev => new Set([...prev, strength.id]));
                }, index * 200);
              });
            }, 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sectionElement = document.getElementById('strengths');
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, [data]);

  /**
   * 강점 카드 렌더링
   */
  const renderStrengthCard = (strength: Strength, index: number) => {
    const isAnimated = animatedCards.has(strength.id);
    
    return (
      <div
        key={strength.id}
        className={`
          card group cursor-pointer
          transition-all duration-500 ease-out
          ${isAnimated 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
          }
        `}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* 카드 헤더 */}
        <div className="card-header flex items-center space-x-4">
          {/* 번호 또는 아이콘 */}
          <div className="flex-shrink-0">
            {showNumbers ? (
              <div className="w-12 h-12 bg-gold-accent rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">
                  {strength.order}
                </span>
              </div>
            ) : (
              <div className="w-12 h-12 bg-beige-light rounded-full flex items-center justify-center text-2xl">
                {strength.icon}
              </div>
            )}
          </div>
          
          {/* 강점 제목 */}
          <h3 className="text-xl md:text-2xl font-serif font-bold text-navy-primary group-hover:text-gold-accent transition-colors">
            {strength.title}
          </h3>
        </div>

        {/* 카드 본문 */}
        <div className="card-body">
          <p className="text-gray-primary leading-relaxed">
            {strength.description}
          </p>
        </div>

        {/* 호버 효과 인디케이터 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg" />
      </div>
    );
  };

  /**
   * 리스트 형태 강점 렌더링
   */
  const renderStrengthList = (strength: Strength, index: number) => {
    const isAnimated = animatedCards.has(strength.id);
    
    return (
      <div
        key={strength.id}
        className={`
          flex items-start space-x-6 p-6 rounded-lg
          hover:bg-beige-light transition-all duration-300
          ${isAnimated 
            ? 'opacity-100 transform translate-x-0' 
            : 'opacity-0 transform translate-x-8'
          }
        `}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        {/* 번호 또는 아이콘 */}
        <div className="flex-shrink-0">
          {showNumbers ? (
            <div className="w-16 h-16 bg-navy-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-2xl">
                {strength.order}
              </span>
            </div>
          ) : (
            <div className="w-16 h-16 bg-beige-light rounded-lg flex items-center justify-center text-3xl">
              {strength.icon}
            </div>
          )}
        </div>

        {/* 내용 */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-navy-primary mb-3">
            {strength.title}
          </h3>
          <p className="text-gray-primary leading-relaxed">
            {strength.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="strengths"
      className={`section section-alt ${className}`}
    >
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2
            className={`
              text-3xl md:text-4xl font-serif font-bold text-navy-primary mb-4
              transition-all duration-800 ease-out
              ${isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
              }
            `}
          >
            {title}
          </h2>
          
          <p
            className={`
              text-lg md:text-xl text-gray-primary max-w-2xl mx-auto
              transition-all duration-800 ease-out delay-200
              ${isVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
              }
            `}
          >
            {subtitle}
          </p>
          
          {/* 구분선 */}
          <div
            className={`
              w-20 h-1 bg-gold-accent mx-auto mt-6
              transition-all duration-800 ease-out delay-400
              ${isVisible 
                ? 'opacity-100 transform scale-x-100' 
                : 'opacity-0 transform scale-x-0'
              }
            `}
          />
        </div>

        {/* 강점 카드들 */}
        {layoutType === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data
              .sort((a, b) => a.order - b.order)
              .map((strength, index) => renderStrengthCard(strength, index))
            }
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {data
              .sort((a, b) => a.order - b.order)
              .map((strength, index) => renderStrengthList(strength, index))
            }
          </div>
        )}

        {/* 통계 섹션 (선택사항) */}
        <div
          className={`
            mt-16 pt-12 border-t border-gray-light
            transition-all duration-800 ease-out delay-800
            ${isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
            }
          `}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 text-center">
            {/* 설립년도 */}
            <div className="space-y-3 py-6 px-4 rounded-lg hover:bg-beige-light transition-colors duration-300">
              <div className="text-3xl md:text-4xl font-serif font-bold text-navy-primary">
                1994
              </div>
              <div className="text-gray-primary font-medium">설립년도</div>
            </div>
            
            {/* 직원 수 */}
            <div className="space-y-3 py-6 px-4 rounded-lg hover:bg-beige-light transition-colors duration-300">
              <div className="text-3xl md:text-4xl font-serif font-bold text-navy-primary">
                150+
              </div>
              <div className="text-gray-primary font-medium">전문 인력</div>
            </div>
            
            {/* 고객 수 */}
            <div className="space-y-3 py-6 px-4 rounded-lg hover:bg-beige-light transition-colors duration-300">
              <div className="text-3xl md:text-4xl font-serif font-bold text-navy-primary">
                500+
              </div>
              <div className="text-gray-primary font-medium">고객사</div>
            </div>
            
            {/* 성공률 */}
            <div className="space-y-3 py-6 px-4 rounded-lg hover:bg-beige-light transition-colors duration-300">
              <div className="text-3xl md:text-4xl font-serif font-bold text-navy-primary">
                95%
              </div>
              <div className="text-gray-primary font-medium">성공률</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrengthsSection; 