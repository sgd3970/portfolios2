'use client';

import React from 'react';
import Link from 'next/link';
import { navigationData, contactData, companyInfo } from '@/data/mockData';
import { smoothScrollTo } from '@/utils/animations';
import { NavigationItem } from '@/types';

/**
 * Footer 컴포넌트
 * 웹사이트 하단 푸터로 회사 정보와 네비게이션을 제공
 * 
 * 주요 기능:
 * - 회사 정보 및 로고
 * - 네비게이션 링크
 * - 연락처 정보
 * - 소셜 미디어 링크
 * - 저작권 정보
 * - 법적 고지사항 링크
 */

interface FooterProps {
  /** 추가 CSS 클래스 */
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ 
  className = '' 
}) => {
  /**
   * 네비게이션 클릭 핸들러
   */
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      smoothScrollTo(targetId, 80);
    }
  };

  /**
   * 현재 연도 반환
   */
  const currentYear = new Date().getFullYear();

  /**
   * 소셜 미디어 링크 데이터
   */
  const socialLinks = [
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    }
  ];

  /**
   * 법적 링크 데이터
   */
  const legalLinks = [
    { name: '개인정보처리방침', href: '/privacy' },
    { name: '이용약관', href: '/terms' },
    { name: '법적 고지사항', href: '/legal' },
    { name: '쿠키 정책', href: '/cookies' }
  ];

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      {/* 메인 푸터 콘텐츠 */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* 회사 정보 */}
          <div className="lg:col-span-2">
            {/* 로고 및 회사명 */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gold-accent rounded-lg flex items-center justify-center">
                <span className="text-navy-primary font-serif font-bold text-2xl">V</span>
              </div>
              <div>
                <h3 className="text-white font-serif font-bold text-xl lg:text-2xl">
                  {companyInfo.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {companyInfo.tagline}
                </p>
              </div>
            </div>

            {/* 회사 설명 */}
            <p className="text-gray-300 leading-relaxed mb-8 max-w-lg text-base">
              {companyInfo.description}
            </p>

            {/* 소셜 미디어 링크 */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 hover:bg-gold-accent rounded-lg flex items-center justify-center transition-all duration-300 hover:transform hover:-translate-y-1 text-white hover:text-navy-primary"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 네비게이션 링크 */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">
              페이지
            </h4>
            <ul className="space-y-3 list-none">
              {navigationData.map((item: NavigationItem) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-300 hover:text-gold-accent transition-colors duration-200 text-base hover:pl-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 정보 */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">
              연락처
            </h4>
            <div className="space-y-4">
              {/* 주소 */}
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gold-accent mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-300 text-base leading-relaxed">
                  {contactData.address}
                </p>
              </div>

              {/* 전화 */}
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-gold-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href={`tel:${contactData.phone}`}
                  className="text-gray-300 hover:text-gold-accent transition-colors duration-200 text-base"
                >
                  {contactData.phone}
                </a>
              </div>

              {/* 이메일 */}
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-gold-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href={`mailto:${contactData.email}`}
                  className="text-gray-300 hover:text-gold-accent transition-colors duration-200 text-base"
                >
                  {contactData.email}
                </a>
              </div>

              {/* 운영시간 */}
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-gold-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-300 text-base">
                  {contactData.businessHours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 구분선 */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* 저작권 */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p className="text-base">
                © {currentYear} {companyInfo.name}. All rights reserved.
              </p>
              <p className="mt-2 text-gray-500">
                Est. 1994 | Trusted by 500+ clients worldwide
              </p>
            </div>

            {/* 법적 링크 */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold-accent transition-colors duration-200 text-sm hover:underline"
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-600 hidden md:inline">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 맨 위로 버튼 */}
      <button
        onClick={() => smoothScrollTo('hero', 0)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gold-accent hover:bg-navy-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group cursor-pointer hover:scale-110"
        aria-label="맨 위로 이동"
      >
        <svg 
          className="w-6 h-6 mx-auto group-hover:transform group-hover:-translate-y-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer; 