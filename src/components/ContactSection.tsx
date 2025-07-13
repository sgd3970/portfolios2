'use client';

import React, { useState, useEffect } from 'react';
import { contactData } from '@/data/mockData';
import { initScrollAnimations } from '@/utils/animations';
import { validateEmail, validatePhone, apiRequest } from '@/utils';
import { ContactForm, ContactInfo, FormState } from '@/types';

/**
 * ContactSection 컴포넌트
 * 문의 폼과 연락처 정보를 표시하는 섹션
 * 
 * 주요 기능:
 * - 상세 문의 폼 (이름, 이메일, 연락처, 회사명, 직책, 문의 내용)
 * - 폼 유효성 검사
 * - API 요청 처리
 * - 연락처 정보 표시
 * - 지도 연동 (선택사항)
 * - 반응형 레이아웃
 * - 스크롤 애니메이션 효과
 */

interface ContactSectionProps {
  /** 연락처 데이터 (선택사항, 기본값은 mockData 사용) */
  contactInfo?: ContactInfo;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 섹션 제목 */
  title?: string;
  /** 섹션 부제목 */
  subtitle?: string;
  /** 지도 표시 여부 */
  showMap?: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo = contactData,
  className = '',
  title = '문의하기',
  subtitle = '전문가 상담을 통해 최적의 솔루션을 제공해드립니다',
  showMap = true,
}) => {
  // 상태 관리
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: undefined,
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    message: '',
    serviceType: '',
    preferredContact: 'email',
  });

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
          }
        });
      },
      { threshold: 0.2 }
    );

    const sectionElement = document.getElementById('contact');
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  /**
   * 폼 데이터 변경 핸들러
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 에러 메시지 초기화
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * 폼 유효성 검사
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    // 필수 필드 검증
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = '올바른 연락처 형식을 입력해주세요.';
    }

    if (!formData.company.trim()) {
      newErrors.company = '회사명을 입력해주세요.';
    }

    if (!formData.position.trim()) {
      newErrors.position = '직책을 입력해주세요.';
    }

    if (!formData.message.trim()) {
      newErrors.message = '문의 내용을 입력해주세요.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '문의 내용을 최소 10자 이상 입력해주세요.';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = '서비스 유형을 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!validateForm()) {
      return;
    }

    // 제출 상태 설정
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      error: undefined,
    });

    try {
      // API 요청 (더미 로직)
      const response = await apiRequest('/api/inquiries', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (response.success) {
        // 성공 처리
        setFormState({
          isSubmitting: false,
          isSuccess: true,
          error: undefined,
        });

        // 폼 초기화
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          position: '',
          message: '',
          serviceType: '',
          preferredContact: 'email',
        });

        // 3초 후 성공 메시지 숨기기
        setTimeout(() => {
          setFormState(prev => ({
            ...prev,
            isSuccess: false,
          }));
        }, 3000);
      } else {
        throw new Error(response.error || '문의 전송에 실패했습니다.');
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : '문의 전송에 실패했습니다.',
      });
    }
  };

  /**
   * 서비스 유형 옵션
   */
  const serviceTypeOptions = [
    { value: '', label: '서비스 유형 선택' },
    { value: 'legal', label: '법률 자문' },
    { value: 'consulting', label: '경영 컨설팅' },
    { value: 'finance', label: '금융 자문' },
    { value: 'tax', label: '세무 컨설팅' },
    { value: 'compliance', label: '컴플라이언스' },
    { value: 'other', label: '기타' },
  ];

  return (
    <section
      id="contact"
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

        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 문의 폼 */}
          <div
            className={`
              transition-all duration-800 ease-out delay-600
              ${isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-8'
              }
            `}
          >
            <div className="card">
              <div className="card-header">
                <h3 className="text-2xl font-serif font-bold text-navy-primary mb-2">
                  문의 양식
                </h3>
                <p className="text-gray-primary">
                  아래 양식을 작성해 주시면 빠른 시일 내에 답변드리겠습니다.
                </p>
              </div>

              <div className="card-body">
                {/* 성공 메시지 */}
                {formState.isSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-800 font-medium">문의가 성공적으로 전송되었습니다!</span>
                    </div>
                  </div>
                )}

                {/* 에러 메시지 */}
                {formState.error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-red-800 font-medium">{formState.error}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 이름 */}
                  <div>
                    <label htmlFor="name" className="form-label">
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="성함을 입력해주세요"
                      disabled={formState.isSubmitting}
                    />
                    {errors.name && (
                      <p className="form-error">{errors.name}</p>
                    )}
                  </div>

                  {/* 이메일 */}
                  <div>
                    <label htmlFor="email" className="form-label">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="이메일 주소를 입력해주세요"
                      disabled={formState.isSubmitting}
                    />
                    {errors.email && (
                      <p className="form-error">{errors.email}</p>
                    )}
                  </div>

                  {/* 연락처 */}
                  <div>
                    <label htmlFor="phone" className="form-label">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="연락처를 입력해주세요 (예: 010-1234-5678)"
                      disabled={formState.isSubmitting}
                    />
                    {errors.phone && (
                      <p className="form-error">{errors.phone}</p>
                    )}
                  </div>

                  {/* 회사명 & 직책 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="form-label">
                        회사명 *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`form-input ${errors.company ? 'border-red-500' : ''}`}
                        placeholder="회사명을 입력해주세요"
                        disabled={formState.isSubmitting}
                      />
                      {errors.company && (
                        <p className="form-error">{errors.company}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="position" className="form-label">
                        직책 *
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className={`form-input ${errors.position ? 'border-red-500' : ''}`}
                        placeholder="직책을 입력해주세요"
                        disabled={formState.isSubmitting}
                      />
                      {errors.position && (
                        <p className="form-error">{errors.position}</p>
                      )}
                    </div>
                  </div>

                  {/* 서비스 유형 */}
                  <div>
                    <label htmlFor="serviceType" className="form-label">
                      서비스 유형 *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className={`form-input ${errors.serviceType ? 'border-red-500' : ''}`}
                      disabled={formState.isSubmitting}
                    >
                      {serviceTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p className="form-error">{errors.serviceType}</p>
                    )}
                  </div>

                  {/* 선호 연락 방법 */}
                  <div>
                    <label className="form-label">
                      선호 연락 방법 *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={handleInputChange}
                          className="mr-2"
                          disabled={formState.isSubmitting}
                        />
                        <span className="text-gray-primary">이메일</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={handleInputChange}
                          className="mr-2"
                          disabled={formState.isSubmitting}
                        />
                        <span className="text-gray-primary">전화</span>
                      </label>
                    </div>
                  </div>

                  {/* 문의 내용 */}
                  <div>
                    <label htmlFor="message" className="form-label">
                      문의 내용 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`form-textarea ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="문의 내용을 자세히 입력해주세요"
                      disabled={formState.isSubmitting}
                    />
                    {errors.message && (
                      <p className="form-error">{errors.message}</p>
                    )}
                  </div>

                  {/* 제출 버튼 */}
                  <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className={`
                      btn btn-primary w-full
                      ${formState.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {formState.isSubmitting ? (
                      <>
                        <div className="spinner mr-2" />
                        전송 중...
                      </>
                    ) : (
                      '문의 보내기'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* 연락처 정보 */}
          <div
            className={`
              space-y-8
              transition-all duration-800 ease-out delay-800
              ${isVisible 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform -translate-x-8'
              }
            `}
          >
            {/* 연락처 정보 카드 */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-2xl font-serif font-bold text-navy-primary mb-2">
                  연락처 정보
                </h3>
                <p className="text-gray-primary">
                  아래 정보를 통해 직접 연락하실 수 있습니다.
                </p>
              </div>

              <div className="card-body space-y-6">
                {/* 주소 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gold-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-primary mb-1">주소</h4>
                    <p className="text-gray-primary">{contactInfo.address}</p>
                  </div>
                </div>

                {/* 전화 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gold-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-primary mb-1">전화</h4>
                    <p className="text-gray-primary">{contactInfo.phone}</p>
                  </div>
                </div>

                {/* 이메일 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gold-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-primary mb-1">이메일</h4>
                    <p className="text-gray-primary">{contactInfo.email}</p>
                  </div>
                </div>

                {/* 운영시간 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gold-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-primary mb-1">운영시간</h4>
                    <p className="text-gray-primary">{contactInfo.businessHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 지도 (선택사항) */}
            {showMap && contactInfo.mapUrl && (
              <div className="card">
                <div className="card-header">
                  <h3 className="text-xl font-serif font-bold text-navy-primary">
                    찾아오시는 길
                  </h3>
                </div>
                <div className="card-body p-0">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={contactInfo.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="회사 위치"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 