'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { navigationData, companyInfo } from '@/data/mockData';
import { smoothScrollTo } from '@/utils/animations';
import { NavigationItem } from '@/types';

/**
 * Header 컴포넌트
 * 상단 고정 내비게이션 바로 클래식하고 신뢰감 있는 디자인
 * 
 * 주요 기능:
 * - 상단 고정 (sticky) 네비게이션
 * - 스크롤 시 배경 변화 효과
 * - 반응형 모바일 메뉴
 * - 부드러운 스크롤 네비게이션
 * - 로고 및 회사명 표시
 */

interface HeaderProps {
  /** 초기 투명 배경 여부 (히어로 섹션 위에서 투명하게 시작) */
  transparent?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  transparent = false, 
  className = '' 
}) => {
  // 상태 관리
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 상태
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴 상태
  const [activeSection, setActiveSection] = useState('home'); // 현재 활성 섹션

  /**
   * 스크롤 이벤트 핸들러
   * 스크롤 위치에 따라 헤더 배경 변경
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 50; // 스크롤 임계값

      // 스크롤 위치가 임계값을 넘으면 배경 활성화
      setIsScrolled(scrollPosition > threshold);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 초기 스크롤 상태 체크
    handleScroll();

    // 클린업 함수
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**
   * 현재 활성 섹션 감지
   * Intersection Observer를 사용하여 현재 보이는 섹션 추적
   */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // 중앙 부분만 관찰
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // 모든 섹션 관찰 시작
    sections.forEach((section) => {
      observer.observe(section);
    });

    // 클린업 함수
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  /**
   * 네비게이션 아이템 클릭 핸들러
   * 부드러운 스크롤로 해당 섹션으로 이동
   */
  const handleNavClick = (href: string) => {
    // 모바일 메뉴 닫기
    setIsMobileMenuOpen(false);

    // 앵커 링크인 경우 부드러운 스크롤
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      smoothScrollTo(targetId, 80); // 헤더 높이만큼 오프셋
    }
  };

  /**
   * 모바일 메뉴 토글 핸들러
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * 헤더 배경 클래스 결정
   * 투명 모드와 스크롤 상태에 따라 배경 스타일 변경
   */
  const getHeaderClasses = () => {
    const baseClasses = `
      fixed top-0 left-0 right-0 z-50 
      transition-all duration-300 ease-in-out
      ${className}
    `;

    if (transparent && !isScrolled) {
      // 투명 상태 (히어로 섹션 위) - 어두운 배경 위에 밝은 텍스트
      return `${baseClasses} bg-navy-primary shadow-lg border-b border-white/20`;
    } else {
      // 불투명 상태 (스크롤 후 또는 기본)
      return `${baseClasses} bg-white shadow-soft backdrop-blur-sm`;
    }
  };

  /**
   * 네비게이션 아이템 렌더링
   */
  const renderNavItems = (mobile: boolean = false) => {
    const isTransparentMode = transparent && !isScrolled;
    
    const baseItemClasses = mobile
      ? `block py-3 px-4 transition-all duration-200 ${
          isTransparentMode 
            ? 'text-white hover:text-gold-accent hover:bg-white/10 drop-shadow-lg' 
            : 'text-navy-primary hover:text-gold-accent hover:bg-beige-light'
        }`
      : `transition-all duration-200 font-medium relative ${
          isTransparentMode 
            ? 'text-white hover:text-gold-accent drop-shadow-lg' 
            : 'text-navy-primary hover:text-gold-accent'
        }`;

    return navigationData.map((item: NavigationItem) => (
      <li key={item.id} className={mobile ? 'border-b border-gray-light last:border-b-0' : ''}>
        <Link
          href={item.href}
          onClick={() => handleNavClick(item.href)}
          className={`
            ${baseItemClasses}
            ${activeSection === item.id ? 'text-gold-accent' : ''}
            ${!mobile && activeSection === item.id ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-accent' : ''}
          `}
        >
          {item.label}
        </Link>
      </li>
    ));
  };

  return (
    <header className={getHeaderClasses()}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* 로고 및 회사명 */}
          <div className="flex items-center py-2 flex-1">
            <Link 
              href="/" 
              className="flex items-center hover:opacity-80 transition-opacity"
              onClick={() => handleNavClick('/')}
            >
              {/* 통합 로고 SVG */}
              <div className="flex items-center">
                {/* 모바일용 V 로고만 */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 md:hidden"
                >
                  <rect
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    rx="8"
                    fill={transparent && !isScrolled ? '#D4AF37' : '#0A1F44'}
                  />
                  <text
                    x="20"
                    y="26"
                    textAnchor="middle"
                    fontSize="20"
                    fontFamily="serif"
                    fontWeight="bold"
                    fill={transparent && !isScrolled ? '#0A1F44' : 'white'}
                  >
                    V
                  </text>
                </svg>

                {/* 데스크톱용 전체 로고 */}
                <svg
                  width="280"
                  height="40"
                  viewBox="0 0 280 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-auto hidden md:block"
                >
                  {/* V 로고 배경 */}
                  <rect
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    rx="8"
                    fill={transparent && !isScrolled ? '#D4AF37' : '#0A1F44'}
                  />
                  
                  {/* V 로고 텍스트 */}
                  <text
                    x="20"
                    y="26"
                    textAnchor="middle"
                    fontSize="20"
                    fontFamily="serif"
                    fontWeight="bold"
                    fill={transparent && !isScrolled ? '#0A1F44' : 'white'}
                  >
                    V
                  </text>
                  
                  {/* 회사명 */}
                  <text
                    x="52"
                    y="26"
                    fontSize="18"
                    fontFamily="serif"
                    fontWeight="bold"
                    fill={transparent && !isScrolled ? 'white' : '#0A1F44'}
                  >
                    Vision Legal Partners
                  </text>
                </svg>
              </div>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 - 가운데 배치 */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center space-x-8 list-none">
              {renderNavItems()}
            </ul>
          </div>

          {/* CTA 버튼 (데스크톱) - 우측 배치 */}
          <div className="hidden md:flex flex-1 justify-end">
            <Link
              href="#contact"
              onClick={() => handleNavClick('#contact')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                transparent && !isScrolled
                  ? 'bg-gold-accent text-navy-primary hover:bg-gold-accent/90 drop-shadow-lg'
                  : 'bg-navy-primary text-white hover:bg-navy-light'
              }`}
            >
              문의하기
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`hover:text-gold-accent transition-colors p-2 ${
                transparent && !isScrolled
                  ? 'text-white drop-shadow-lg'
                  : 'text-navy-primary'
              }`}
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  // 닫기 아이콘
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // 햄버거 아이콘
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div
          className={`
            md:hidden absolute top-full left-0 right-0 bg-white shadow-medium
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen
              ? 'opacity-100 visible transform translate-y-0'
              : 'opacity-0 invisible transform -translate-y-4'
            }
          `}
        >
          <div className="container mx-auto px-4">
            <ul className="py-4 list-none">
              {renderNavItems(true)}
            </ul>
            
            {/* 모바일 CTA 버튼 */}
            <div className="pb-4 pt-2 border-t border-gray-light">
              <Link
                href="#contact"
                onClick={() => handleNavClick('#contact')}
                className="btn btn-primary w-full justify-center"
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header; 