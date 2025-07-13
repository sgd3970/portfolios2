'use client';

import React, { useState, useEffect } from 'react';
import { teamData } from '@/data/mockData';
import { initScrollAnimations } from '@/utils/animations';
import { TeamMember } from '@/types';

/**
 * TeamSection 컴포넌트
 * 팀/전문가 소개 섹션으로 전문가 프로필을 카드 형태로 표시
 * 
 * 주요 기능:
 * - 전문가 프로필 카드 (3열 그리드)
 * - 카드 클릭 시 상세 정보 모달 팝업
 * - 반응형 레이아웃
 * - 스크롤 애니메이션 효과
 * - 전문 분야 태그 표시
 * - 연락처 정보 포함
 */

interface TeamSectionProps {
  /** 팀 데이터 (선택사항, 기본값은 mockData 사용) */
  data?: TeamMember[];
  /** 추가 CSS 클래스 */
  className?: string;
  /** 섹션 제목 */
  title?: string;
  /** 섹션 부제목 */
  subtitle?: string;
  /** 표시할 카드 수 제한 */
  maxCards?: number;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  data = teamData,
  className = '',
  title = '우리의 전문가',
  subtitle = '각 분야별 최고의 전문가들이 고객의 성공을 위해 헌신합니다',
  maxCards,
}) => {
  // 상태 관리
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(new Set());
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 표시할 데이터 필터링
  const displayData = maxCards ? data.slice(0, maxCards) : data;

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
              displayData.forEach((member, index) => {
                setTimeout(() => {
                  setAnimatedCards(prev => new Set([...prev, member.id]));
                }, index * 150);
              });
            }, 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sectionElement = document.getElementById('team');
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, [displayData]);

  /**
   * 모달 열기 함수
   */
  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    // 스크롤 방지
    document.body.style.overflow = 'hidden';
  };

  /**
   * 모달 닫기 함수
   */
  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
    // 스크롤 복원
    document.body.style.overflow = 'unset';
  };

  /**
   * 모달 외부 클릭 시 닫기
   */
  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  /**
   * ESC 키로 모달 닫기
   */
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  /**
   * 팀 카드 렌더링
   */
  const renderTeamCard = (member: TeamMember, index: number) => {
    const isAnimated = animatedCards.has(member.id);
    
    return (
      <div
        key={member.id}
        className={`
          card group cursor-pointer hover:shadow-strong
          transition-all duration-500 ease-out
          ${isAnimated 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
          }
        `}
        style={{ transitionDelay: `${index * 100}ms` }}
        onClick={() => openModal(member)}
      >
        {/* 프로필 이미지 */}
        <div className="relative mb-4">
          <div className="w-full h-48 rounded-lg overflow-hidden bg-navy-primary">
            <img
              src={member.profileImage}
              alt={`${member.name} 프로필`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center bg-navy-primary text-white">
                    <div class="text-center">
                      <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                        <span class="text-2xl font-bold text-navy-primary">${member.name.charAt(0)}</span>
                      </div>
                      <div class="text-sm font-medium">${member.name}</div>
                      <div class="text-xs text-gold-accent">${member.position}</div>
                    </div>
                  </div>
                `;
              }}
            />
          </div>
          
          {/* 호버 오버레이 */}
          <div className="absolute inset-0 bg-navy-primary bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 rounded-lg flex items-center justify-center">
            <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-sm font-medium mb-1">자세히 보기</div>
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="text-center">
          <h3 className="text-xl font-serif font-bold text-navy-primary mb-1 group-hover:text-gold-accent transition-colors">
            {member.name}
          </h3>
          
          <p className="text-gold-accent font-medium mb-2">
            {member.position}
          </p>
          
          <p className="text-gray-primary text-sm leading-relaxed mb-4">
            {member.shortBio}
          </p>
          
          {/* 전문 분야 태그 */}
          <div className="flex flex-wrap gap-2 justify-center">
            {member.expertise.slice(0, 3).map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-2 py-1 bg-beige-light text-navy-primary text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {member.expertise.length > 3 && (
              <span className="px-2 py-1 bg-gray-light text-gray-primary text-xs rounded-full">
                +{member.expertise.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section
        id="team"
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

          {/* 팀 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayData.map((member, index) => renderTeamCard(member, index))}
          </div>
        </div>
      </section>

      {/* 모달 */}
      {isModalOpen && selectedMember && (
        <div
          className="modal-overlay"
          onClick={handleModalBackdropClick}
        >
          <div className="modal-content max-w-2xl">
            {/* 모달 헤더 */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={selectedMember.profileImage}
                    alt={`${selectedMember.name} 프로필`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-navy-primary">
                    {selectedMember.name}
                  </h3>
                  <p className="text-gold-accent font-medium">
                    {selectedMember.position}
                  </p>
                  <p className="text-gray-primary text-sm">
                    {selectedMember.department}
                  </p>
                </div>
              </div>
              
              {/* 닫기 버튼 */}
              <button
                onClick={closeModal}
                className="text-gray-primary hover:text-navy-primary transition-colors p-2"
                aria-label="모달 닫기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="space-y-6">
              {/* 소개 */}
              <div>
                <h4 className="text-lg font-serif font-bold text-navy-primary mb-3">소개</h4>
                <p className="text-gray-primary leading-relaxed">
                  {selectedMember.shortBio}
                </p>
              </div>

              {/* 전문 분야 */}
              <div>
                <h4 className="text-lg font-serif font-bold text-navy-primary mb-3">전문 분야</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-beige-light text-navy-primary text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 학력 */}
              <div>
                <h4 className="text-lg font-serif font-bold text-navy-primary mb-3">학력</h4>
                <ul className="space-y-2">
                  {selectedMember.education.map((edu, index) => (
                    <li key={index} className="text-gray-primary flex items-start">
                      <span className="text-gold-accent mr-2">•</span>
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 자격증 */}
              <div>
                <h4 className="text-lg font-serif font-bold text-navy-primary mb-3">자격증</h4>
                <ul className="space-y-2">
                  {selectedMember.career.map((cert: string, index: number) => (
                    <li key={index} className="text-gray-primary flex items-start">
                      <span className="text-gold-accent mr-2">•</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 연락처 */}
              <div>
                <h4 className="text-lg font-serif font-bold text-navy-primary mb-3">연락처</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-primary">{selectedMember.email}</span>
                  </div>
                  
                  {selectedMember.phone && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-primary">{selectedMember.phone}</span>
                    </div>
                  )}
                  
                  {selectedMember.linkedin && (
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gold-accent" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <a 
                        href={`https://${selectedMember.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-primary hover:text-gold-accent transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamSection; 