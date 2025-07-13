'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { newsData } from '@/data/mockData';
import { initScrollAnimations } from '@/utils/animations';
import { formatDate, truncateText, calculateReadingTime } from '@/utils';
import { NewsArticle } from '@/types';

/**
 * NewsBlogSection 컴포넌트
 * 최신 뉴스와 블로그 게시물을 카드 형태로 표시하는 섹션
 * 
 * 주요 기능:
 * - 최신 뉴스/블로그 게시물 카드 표시
 * - 카테고리별 필터링
 * - 읽기 시간 계산
 * - 반응형 레이아웃
 * - 스크롤 애니메이션 효과
 * - 더보기 링크 제공
 */

interface NewsBlogSectionProps {
  /** 뉴스 데이터 (선택사항, 기본값은 mockData 사용) */
  data?: NewsArticle[];
  /** 추가 CSS 클래스 */
  className?: string;
  /** 섹션 제목 */
  title?: string;
  /** 섹션 부제목 */
  subtitle?: string;
  /** 표시할 게시물 수 제한 */
  maxItems?: number;
  /** 더보기 링크 URL */
  moreLink?: string;
  /** 특성 게시물만 표시 여부 */
  featuredOnly?: boolean;
}

const NewsBlogSection: React.FC<NewsBlogSectionProps> = ({
  data = newsData,
  className = '',
  title = '최신 뉴스 & 인사이트',
  subtitle = '법률, 경영, 금융 분야의 최신 동향과 전문가 인사이트를 제공합니다',
  maxItems = 4,
  moreLink = '#news',
  featuredOnly = false,
}) => {
  // 상태 관리
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 데이터 필터링 및 정렬
  const filteredData = data
    .filter(article => featuredOnly ? article.featured : true)
    .filter(article => selectedCategory === 'all' || article.category === selectedCategory)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, maxItems);

  // 카테고리 목록 생성
  const categories = ['all', ...Array.from(new Set(data.map(item => item.category)))];

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
              filteredData.forEach((article, index) => {
                setTimeout(() => {
                  setAnimatedCards(prev => new Set([...prev, article.id]));
                }, index * 150);
              });
            }, 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sectionElement = document.getElementById('news');
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
    setAnimatedCards(new Set());
    
    // 새로운 데이터에 대한 애니메이션
    setTimeout(() => {
      const newFilteredData = data
        .filter(article => featuredOnly ? article.featured : true)
        .filter(article => category === 'all' || article.category === category)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, maxItems);
      
      newFilteredData.forEach((article, index) => {
        setTimeout(() => {
          setAnimatedCards(prev => new Set([...prev, article.id]));
        }, index * 150);
      });
    }, 100);
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
   * 뉴스 카드 렌더링
   */
  const renderNewsCard = (article: NewsArticle, index: number) => {
    const isAnimated = animatedCards.has(article.id);
    const readingTime = calculateReadingTime(article.content);
    
    return (
      <article
        key={article.id}
        className={`
          card group cursor-pointer hover:shadow-strong
          transition-all duration-500 ease-out
          ${isAnimated 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
          }
        `}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* 카드 헤더 */}
        <div className="card-header flex items-start justify-between">
          <div className="flex-1">
            {/* 카테고리 및 날짜 */}
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-gold-accent text-white text-xs rounded-full">
                {article.category}
              </span>
              <span className="text-gray-primary text-xs">
                {formatDate(article.publishedAt)}
              </span>
              <span className="text-gray-primary text-xs">
                • {readingTime}분 읽기
              </span>
            </div>
            
            {/* 제목 */}
            <h3 className="text-xl font-serif font-bold text-navy-primary mb-2 group-hover:text-gold-accent transition-colors">
              {article.title}
            </h3>
            
            {/* 작성자 */}
            <p className="text-gray-primary text-sm font-medium">
              by {article.author}
            </p>
          </div>
          
          {/* 특성 게시물 표시 */}
          {article.featured && (
            <div className="flex-shrink-0 ml-4">
              <span className="px-2 py-1 bg-burgundy-accent text-white text-xs rounded-full">
                특성
              </span>
            </div>
          )}
        </div>

        {/* 카드 본문 */}
        <div className="card-body">
          <p className="text-gray-primary leading-relaxed mb-4">
            {truncateText(article.excerpt, 120)}
          </p>
          
          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-beige-light text-navy-primary text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-light text-gray-primary text-xs rounded-full">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* 카드 푸터 */}
        <div className="card-footer">
          <Link
            href={`/news/${article.id}`}
            className="inline-flex items-center text-navy-primary hover:text-gold-accent transition-colors font-medium"
          >
            자세히 읽기
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* 호버 효과 인디케이터 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg" />
      </article>
    );
  };

  /**
   * 메인 뉴스 카드 렌더링 (첫 번째 게시물을 크게 표시)
   */
  const renderMainNewsCard = (article: NewsArticle) => {
    const isAnimated = animatedCards.has(article.id);
    const readingTime = calculateReadingTime(article.content);
    
    return (
      <article
        key={`main-${article.id}`}
        className={`
          card group cursor-pointer hover:shadow-strong col-span-1 md:col-span-2
          transition-all duration-500 ease-out
          ${isAnimated 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
          }
        `}
      >
        {/* 메인 카드 헤더 */}
        <div className="card-header">
          <div className="flex items-center space-x-2 mb-3">
            <span className="px-3 py-1 bg-gold-accent text-white text-sm rounded-full">
              {article.category}
            </span>
            <span className="text-gray-primary text-sm">
              {formatDate(article.publishedAt)}
            </span>
            <span className="text-gray-primary text-sm">
              • {readingTime}분 읽기
            </span>
            {article.featured && (
              <span className="px-2 py-1 bg-burgundy-accent text-white text-xs rounded-full">
                특성
              </span>
            )}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-primary mb-3 group-hover:text-gold-accent transition-colors">
            {article.title}
          </h2>
          
          <p className="text-gray-primary font-medium mb-4">
            by {article.author}
          </p>
        </div>

        {/* 메인 카드 본문 */}
        <div className="card-body">
          <p className="text-gray-primary leading-relaxed text-lg mb-6">
            {truncateText(article.excerpt, 200)}
          </p>
          
          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 bg-beige-light text-navy-primary text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* 읽기 버튼 */}
          <Link
            href={`/news/${article.id}`}
            className="btn btn-primary"
          >
            자세히 읽기
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* 호버 효과 인디케이터 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg" />
      </article>
    );
  };

  // 메인 뉴스와 일반 뉴스 분리
  const mainNews = filteredData[0];
  const regularNews = filteredData.slice(1);

  return (
    <section
      id="news"
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

        {/* 카테고리 필터 */}
        {renderCategoryFilter()}

        {/* 뉴스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* 메인 뉴스 (첫 번째 게시물을 크게 표시) */}
          {mainNews && renderMainNewsCard(mainNews)}
          
          {/* 일반 뉴스 카드들 */}
          {regularNews.map((article, index) => renderNewsCard(article, index + 1))}
        </div>

        {/* 더보기 섹션 */}
        <div
          className={`
            text-center
            transition-all duration-800 ease-out delay-1000
            ${isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
            }
          `}
        >
          <Link
            href={moreLink}
            className="btn btn-outline btn-lg"
          >
            더 많은 뉴스 보기
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsBlogSection; 