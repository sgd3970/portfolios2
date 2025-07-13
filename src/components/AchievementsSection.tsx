'use client';

import React, { useState, useEffect } from 'react';
import { achievementsData } from '@/data/mockData';
import { initScrollAnimations } from '@/utils/animations';
import { Achievement } from '@/types';

/**
 * AchievementsSection 컴포넌트
 * 주요 실적과 고객사를 표시하는 섹션
 * 
 * 주요 기능:
 * - 주요 고객사 로고 표시 (그레이 톤)
 * - 실적 카드 형태로 성과 소개
 * - 반응형 레이아웃
 * - 스크롤 애니메이션 효과
 * - 카테고리별 필터링
 * - 호버 시 로고 컬러 복원
 */

interface AchievementsSectionProps {
  /** 실적 데이터 (선택사항, 기본값은 mockData 사용) */
  data?: Achievement[];
  /** 추가 CSS 클래스 */
  className?: string;
  /** 섹션 제목 */
  title?: string;
  /** 섹션 부제목 */
  subtitle?: string;
  /** 표시 방식 ('logos' | 'cards' | 'both') */
  displayType?: 'logos' | 'cards' | 'both';
  /** 표시할 실적 수 제한 */
  maxItems?: number;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  data = achievementsData,
  className = '',
  title = '주요 실적 & 고객사',
  subtitle = '신뢰받는 파트너로서 다양한 분야에서 성과를 거두고 있습니다',
  displayType = 'both',
  maxItems,
}) => {
  // 상태 관리
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 표시할 데이터 필터링
  const displayData = maxItems ? data.slice(0, maxItems) : data;
  
  // 카테고리 목록 생성
  const categories = ['all', ...Array.from(new Set(data.map(item => item.category)))];
  
  // 선택된 카테고리에 따른 데이터 필터링
  const filteredData = selectedCategory === 'all' 
    ? displayData 
    : displayData.filter(item => item.category === selectedCategory);

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
            // 아이템 애니메이션 스태거 효과
            setTimeout(() => {
              filteredData.forEach((achievement, index) => {
                setTimeout(() => {
                  setAnimatedItems(prev => new Set([...prev, achievement.id]));
                }, index * 100);
              });
            }, 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sectionElement = document.getElementById('achievements');
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, [filteredData]);

  /**
   * 카테고리 변경 핸들러
   */
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setAnimatedItems(new Set());
    
    // 새로운 데이터에 대한 애니메이션
    setTimeout(() => {
      const newFilteredData = category === 'all' 
        ? displayData 
        : displayData.filter(item => item.category === category);
      
      newFilteredData.forEach((achievement, index) => {
        setTimeout(() => {
          setAnimatedItems(prev => new Set([...prev, achievement.id]));
        }, index * 100);
      });
    }, 100);
  };

  /**
   * 고객사 로고 렌더링
   */
  const renderClientLogos = () => {
    // 고객사 로고만 추출 (중복 제거)
    const uniqueClients = Array.from(
      new Map(data.map(item => [item.clientName, item])).values()
    );

    return (
      <div className="mb-16">
        <h3 className="text-2xl font-serif font-bold text-navy-primary text-center mb-8">
          신뢰하는 파트너들
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {uniqueClients.map((client, index) => (
            <div
              key={client.clientName}
              className={`
                flex items-center justify-center p-4 rounded-lg
                transition-all duration-500 ease-out
                ${isVisible && animatedItems.has(client.id)
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-0 transform translate-y-8'
                }
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="group cursor-pointer w-full h-16 flex items-center justify-center">
                {client.clientLogo ? (
                  <img
                    src={client.clientLogo}
                    alt={`${client.clientName} 로고`}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  // 로고가 없는 경우 텍스트로 표시
                  <div className="text-gray-primary group-hover:text-navy-primary font-medium text-center transition-colors duration-300">
                    {client.clientName}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * 카테고리 필터 렌더링
   */
  const renderCategoryFilter = () => (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${selectedCategory === category
              ? 'bg-navy-primary text-white shadow-medium'
              : 'bg-beige-light text-navy-primary hover:bg-gold-accent hover:text-white'
            }
          `}
        >
          {category === 'all' ? '전체' : category}
        </button>
      ))}
    </div>
  );

  /**
   * 실적 카드 렌더링
   */
  const renderAchievementCard = (achievement: Achievement, index: number) => {
    const isAnimated = animatedItems.has(achievement.id);
    
    return (
      <div
        key={achievement.id}
        className={`
          card group hover:shadow-strong
          transition-all duration-500 ease-out
          ${isAnimated 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
          }
        `}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* 카드 헤더 */}
        <div className="card-header flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {achievement.clientLogo ? (
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={achievement.clientLogo}
                  alt={`${achievement.clientName} 로고`}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-navy-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold">
                  {achievement.clientName.charAt(0)}
                </span>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-serif font-bold text-navy-primary group-hover:text-gold-accent transition-colors">
                {achievement.clientName}
              </h3>
              <p className="text-gold-accent text-sm font-medium">
                {achievement.year}년 • {achievement.category}
              </p>
            </div>
          </div>
          
          {/* 카테고리 태그 */}
          <span className="px-2 py-1 bg-beige-light text-navy-primary text-xs rounded-full">
            {achievement.category}
          </span>
        </div>

        {/* 카드 본문 */}
        <div className="card-body">
          <h4 className="text-xl font-serif font-bold text-navy-primary mb-3">
            {achievement.title}
          </h4>
          
          <p className="text-gray-primary leading-relaxed">
            {achievement.description}
          </p>
        </div>

        {/* 호버 효과 인디케이터 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg" />
      </div>
    );
  };

  return (
    <section
      id="achievements"
      className={`section ${className}`}
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

        {/* 고객사 로고 섹션 */}
        {(displayType === 'logos' || displayType === 'both') && renderClientLogos()}

        {/* 실적 카드 섹션 */}
        {(displayType === 'cards' || displayType === 'both') && (
          <div>
            {/* 카테고리 필터 */}
            {renderCategoryFilter()}
            
            {/* 실적 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((achievement, index) => 
                renderAchievementCard(achievement, index)
              )}
            </div>
          </div>
        )}

        {/* 성과 통계 (선택사항) */}
        <div
          className={`
            mt-16 pt-12 border-t border-gray-light
            transition-all duration-800 ease-out delay-1000
            ${isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
            }
          `}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
            {/* 총 프로젝트 수 */}
            <div className="space-y-3 py-6 px-4 rounded-lg hover:bg-beige-light transition-colors duration-300">
              <div className="text-4xl md:text-5xl font-serif font-bold text-navy-primary">
                {data.length}+
              </div>
              <div className="text-gray-primary font-medium">성공적인 프로젝트</div>
            </div>
            
            {/* 고객사 수 */}
            <div className="space-y-3 py-6 px-4 rounded-lg hover:bg-beige-light transition-colors duration-300">
              <div className="text-4xl md:text-5xl font-serif font-bold text-navy-primary">
                {Array.from(new Set(data.map(item => item.clientName))).length}+
              </div>
              <div className="text-gray-primary font-medium">신뢰하는 고객사</div>
            </div>
            
            {/* 분야 수 */}
            <div className="space-y-3 py-6 px-4 rounded-lg hover:bg-beige-light transition-colors duration-300">
              <div className="text-4xl md:text-5xl font-serif font-bold text-navy-primary">
                {categories.length - 1}+
              </div>
              <div className="text-gray-primary font-medium">전문 분야</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection; 