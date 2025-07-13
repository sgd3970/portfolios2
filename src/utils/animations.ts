/**
 * 애니메이션 및 스크롤 관련 유틸리티 함수들
 * 클래식 & 신뢰성 컨셉의 부드러운 애니메이션 효과를 위한 함수들
 */

/**
 * 스크롤 시 요소가 뷰포트에 들어왔을 때 애니메이션을 적용하는 함수
 * Intersection Observer를 사용하여 성능 최적화
 */
export const initScrollAnimations = (): void => {
  // 서버사이드 렌더링 체크
  if (typeof window === 'undefined') return;

  // 관찰할 요소들 선택
  const elementsToAnimate = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right, .scale-in'
  );

  // Intersection Observer 설정
  const observerOptions = {
    root: null, // 뷰포트를 기준으로 관찰
    rootMargin: '0px 0px -100px 0px', // 하단 100px 여백
    threshold: 0.1, // 요소의 10%가 보일 때 트리거
  };

  // 관찰자 콜백 함수
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 요소가 뷰포트에 들어왔을 때 애니메이션 클래스 추가
        entry.target.classList.add('in-view');
        
        // 한 번 실행된 후 관찰 중지 (성능 최적화)
        observer.unobserve(entry.target);
      }
    });
  };

  // Observer 인스턴스 생성
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // 모든 요소 관찰 시작
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
};

/**
 * 부드러운 스크롤 함수
 * 지정된 요소로 부드럽게 스크롤 이동
 */
export const smoothScrollTo = (
  targetId: string,
  offset: number = 80,
  duration: number = 800
): void => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const startPosition = window.pageYOffset;
  const targetPosition = targetElement.offsetTop - offset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  // 이징 함수 (부드러운 감속)
  const easeInOutQuart = (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  };

  // 애니메이션 함수
  const animation = (currentTime: number): void => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // 이징 적용
    const ease = easeInOutQuart(progress);
    window.scrollTo(0, startPosition + distance * ease);

    // 애니메이션 계속 실행
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  // 애니메이션 시작
  requestAnimationFrame(animation);
};

/**
 * 스크롤 방향 감지 함수
 * 스크롤 방향에 따라 헤더 표시/숨김 효과에 사용
 */
export const initScrollDirectionDetection = (
  onScrollUp: () => void,
  onScrollDown: () => void,
  threshold: number = 10
): (() => void) => {
  let lastScrollY = window.pageYOffset;
  let ticking = false;

  const updateScrollDirection = (): void => {
    const scrollY = window.pageYOffset;
    const direction = scrollY > lastScrollY ? 'down' : 'up';
    
    // 임계값 확인
    if (Math.abs(scrollY - lastScrollY) < threshold) {
      ticking = false;
      return;
    }

    // 방향에 따른 콜백 실행
    if (direction === 'down') {
      onScrollDown();
    } else {
      onScrollUp();
    }

    lastScrollY = scrollY > 0 ? scrollY : 0;
    ticking = false;
  };

  const onScroll = (): void => {
    if (!ticking) {
      requestAnimationFrame(updateScrollDirection);
      ticking = true;
    }
  };

  // 스크롤 이벤트 리스너 추가
  window.addEventListener('scroll', onScroll);

  // 클린업 함수 반환
  return () => {
    window.removeEventListener('scroll', onScroll);
  };
};

/**
 * 패럴랙스 스크롤 효과 함수
 * 배경 이미지나 요소에 깊이감을 주는 효과
 */
export const initParallaxEffect = (
  selector: string,
  speed: number = 0.5
): (() => void) => {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return () => {};

  let ticking = false;

  const updateParallax = (): void => {
    const scrollY = window.pageYOffset;

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // 요소가 화면에 보일 때만 효과 적용
      if (elementTop < scrollY + windowHeight && elementTop + elementHeight > scrollY) {
        const yPos = -(scrollY - elementTop) * speed;
        (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    });

    ticking = false;
  };

  const onScroll = (): void => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  // 스크롤 이벤트 리스너 추가
  window.addEventListener('scroll', onScroll);

  // 클린업 함수 반환
  return () => {
    window.removeEventListener('scroll', onScroll);
  };
};

/**
 * 타이핑 애니메이션 효과 함수
 * 텍스트가 타이핑되는 것처럼 보이는 효과
 */
export const createTypingAnimation = (
  element: HTMLElement,
  text: string,
  speed: number = 50,
  delay: number = 0
): Promise<void> => {
  return new Promise((resolve) => {
    let index = 0;
    element.textContent = '';

    const typeNextCharacter = (): void => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeNextCharacter, speed);
      } else {
        resolve();
      }
    };

    // 지연 시간 후 시작
    setTimeout(typeNextCharacter, delay);
  });
};

/**
 * 카운터 애니메이션 함수
 * 숫자가 증가하는 애니메이션 효과
 */
export const createCounterAnimation = (
  element: HTMLElement,
  endValue: number,
  duration: number = 2000,
  startValue: number = 0
): void => {
  let startTime: number | null = null;
  const difference = endValue - startValue;

  const animate = (currentTime: number): void => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // 이징 함수 적용
    const easeOutQuart = (t: number): number => {
      return 1 - (--t) * t * t * t;
    };

    const currentValue = Math.floor(startValue + difference * easeOutQuart(progress));
    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

/**
 * 스태거 애니메이션 함수
 * 여러 요소들이 순차적으로 나타나는 효과
 */
export const createStaggerAnimation = (
  elements: NodeListOf<Element> | Element[],
  animationClass: string = 'fade-in',
  delay: number = 100
): void => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(animationClass);
      element.classList.add('in-view');
    }, index * delay);
  });
};

/**
 * 호버 애니메이션 효과 초기화 함수
 * 카드나 버튼 등에 마우스 호버 효과 적용
 */
export const initHoverAnimations = (): void => {
  // 카드 호버 효과
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('shadow-strong');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('shadow-strong');
    });
  });

  // 버튼 호버 효과
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      button.classList.add('animate-pulse');
    });

    button.addEventListener('mouseleave', () => {
      button.classList.remove('animate-pulse');
    });
  });
};

/**
 * 모바일 터치 애니메이션 함수
 * 모바일 기기에서 터치 피드백 효과
 */
export const initTouchAnimations = (): void => {
  const touchElements = document.querySelectorAll('.btn, .card, [data-touchable]');

  touchElements.forEach((element) => {
    element.addEventListener('touchstart', () => {
      element.classList.add('scale-95');
    });

    element.addEventListener('touchend', () => {
      element.classList.remove('scale-95');
    });

    element.addEventListener('touchcancel', () => {
      element.classList.remove('scale-95');
    });
  });
};

/**
 * 로딩 애니메이션 함수
 * 페이지 로딩 시 스켈레톤 효과
 */
export const createSkeletonAnimation = (
  container: HTMLElement,
  count: number = 3
): void => {
  container.innerHTML = '';
  
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'animate-pulse bg-gray-200 h-4 rounded mb-2';
    skeleton.style.width = `${Math.random() * 40 + 60}%`;
    container.appendChild(skeleton);
  }
};

/**
 * 페이지 전환 애니메이션 함수
 * 페이지 간 부드러운 전환 효과
 */
export const createPageTransition = (
  exitCallback: () => void,
  duration: number = 300
): void => {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-navy-primary z-50 transition-opacity duration-300';
  overlay.style.opacity = '0';
  
  document.body.appendChild(overlay);
  
  // 페이드 인
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });
  
  // 페이지 전환
  setTimeout(() => {
    exitCallback();
    
    // 페이드 아웃
    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, duration);
    }, 100);
  }, duration);
}; 