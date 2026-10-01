/**
 * 다크모드 토글: 사용자가 선택한 테마를 localStorage(key: "theme")에 저장하고,
 * 재방문 시에도 유지한다. 저장된 값이 없는 첫 방문에는 OS의 prefers-color-scheme을 따른다.
 */
function initDarkMode() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('darkModeToggle');
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');

  const applyTheme = (isDark) => {
    root.classList.toggle('dark', isDark);
    iconSun.classList.toggle('hidden', !isDark);
    iconMoon.classList.toggle('hidden', isDark);
  };

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

  toggleBtn.addEventListener('click', () => {
    const isDark = !root.classList.contains('dark');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

/**
 * 스크롤 진입 시 페이드인: 뷰포트에 들어온 .fade-in 요소에 .visible 클래스를 추가한다.
 * 한 번 보인 요소는 다시 숨기지 않으므로 위로 스크롤해도 깜빡이지 않는다.
 */
function initFadeInOnScroll() {
  const targets = document.querySelectorAll('.fade-in');

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

/**
 * 모바일 메뉴 토글: 햄버거 버튼 클릭 시 nav 패널을 열고 닫는다.
 * 메뉴 안의 링크를 클릭하면 자동으로 닫히도록 처리한다.
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');

  menuBtn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden', isOpen);
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initFadeInOnScroll();
  initMobileMenu();
});
