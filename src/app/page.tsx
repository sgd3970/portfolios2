'use client';

import React, { useEffect } from 'react';

// 컴포넌트 import
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StrengthsSection from '@/components/StrengthsSection';
import TeamSection from '@/components/TeamSection';
import AchievementsSection from '@/components/AchievementsSection';
import NewsBlogSection from '@/components/NewsBlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

/**
 * 메인 페이지 컴포넌트
 * 클래식 & 신뢰성 컨셉의 법률/컨설팅/금융 기업 포트폴리오 웹사이트
 * 
 * 포함된 섹션:
 * 1. Header - 상단 고정 네비게이션
 * 2. HeroSection - 메인 히어로 섹션
 * 3. StrengthsSection - 회사 강점/핵심 가치
 * 4. TeamSection - 팀/전문가 소개
 * 5. AchievementsSection - 주요 실적/고객사
 * 6. NewsBlogSection - 뉴스/블로그
 * 7. ContactSection - 문의
 * 8. Footer - 하단 푸터
 */

export default function HomePage() {
  /**
   * 페이지 로드 시 초기화
   */
  useEffect(() => {
    // 스크롤 애니메이션 초기화
    const initScrollAnimations = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, observerOptions);

      // fade-in 클래스를 가진 모든 요소 관찰
      document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    };

    // 애니메이션 초기화
    const cleanup = initScrollAnimations();

    // 페이지 로드 완료 후 body에 loaded 클래스 추가
    document.body.classList.add('loaded');

    // 클린업 함수
    return () => {
      cleanup();
      document.body.classList.remove('loaded');
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* 헤더 - 상단 고정 네비게이션 */}
      <Header transparent={true} />

      {/* 메인 히어로 섹션 */}
      <HeroSection enableTypingAnimation={false} />

      {/* 회사 강점/핵심 가치 섹션 */}
      <StrengthsSection 
        title="우리의 강점"
        subtitle="30년 이상의 경험과 전문성을 바탕으로 한 핵심 경쟁력"
      />

      {/* 팀/전문가 소개 섹션 */}
      <TeamSection 
        title="우리의 전문가"
        subtitle="각 분야별 최고의 전문가들이 고객의 성공을 위해 헌신합니다"
      />

      {/* 주요 실적/고객사 섹션 */}
      <AchievementsSection 
        title="주요 실적 & 고객사"
        subtitle="신뢰받는 파트너로서 다양한 분야에서 성과를 거두고 있습니다"
        displayType="both"
      />

      {/* 뉴스/블로그 섹션 */}
      <NewsBlogSection 
        title="최신 뉴스 & 인사이트"
        subtitle="법률, 경영, 금융 분야의 최신 동향과 전문가 인사이트를 제공합니다"
        maxItems={4}
        featuredOnly={false}
      />

      {/* 문의 섹션 */}
      <ContactSection 
        title="문의하기"
        subtitle="전문가 상담을 통해 최적의 솔루션을 제공해드립니다"
        showMap={true}
      />

      {/* 푸터 */}
      <Footer />
    </main>
  );
}
