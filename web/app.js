class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('.theme-icon path');
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.setAttribute('d', 'M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z');
      } else {
        themeIcon.setAttribute('d', 'M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z');
      }
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
}

const themeManager = new ThemeManager();

document.addEventListener('DOMContentLoaded', function() {
  loadNavbar();
});

async function loadNavbar() {
  try {
    const currentPath = window.location.pathname;
    let navbarPath;
    
    if (currentPath.includes('/pages/')) {
      navbarPath = 'navbar.html';
    } else {
      navbarPath = 'pages/navbar.html';
    }
    
    const response = await fetch(navbarPath);
    const navbarHtml = await response.text();
    document.getElementById('navbar-container').innerHTML = navbarHtml;
    
    initializeNavbar();
  } catch (error) {
    console.error('Error loading navbar:', error);
  }
}

function initializeNavbar() {
  const toggleButton = document.getElementById('toggle-btn');
  const sidebar = document.getElementById('sidebar');
  
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => themeManager.toggleTheme());
    const currentTheme = themeManager.getCurrentTheme();
    const themeIconPath = themeToggleBtn.querySelector('.theme-icon path');
    if (themeIconPath) {
      if (currentTheme === 'dark') {
        themeIconPath.setAttribute('d', 'M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z');
      } else {
        themeIconPath.setAttribute('d', 'M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z');
      }
    }
  }
  
  const currentPath = window.location.pathname;
  const isInPagesFolder = currentPath.includes('/pages/');
  
  const navLinks = sidebar.querySelectorAll('a[href^="pages/"]');
  navLinks.forEach(link => {
    if (isInPagesFolder) {
      link.href = link.getAttribute('href').replace('pages/', '');
    }
  });
  
  setActiveNavigation();
  
  window.toggleSidebar = toggleSidebar;
  window.toggleSubMenu = toggleSubMenu;
}

const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('toggle-btn');
  
  if (window.innerWidth >= 1024) {
    sidebar.classList.toggle('w-16')
    sidebar.classList.toggle('w-64')
    sidebar.classList.toggle('px-1')
    sidebar.classList.toggle('px-4')
    toggleButton.classList.toggle('rotate-180')
  }

  closeAllSubMenus()
}

function toggleSubMenu(button){
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('toggle-btn');

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.nextElementSibling.classList.toggle('grid-rows-[1fr]')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('w-16') && window.innerWidth >= 1024){
    sidebar.classList.remove('w-16')
    sidebar.classList.add('w-64')
    sidebar.classList.remove('px-1')
    sidebar.classList.add('px-4')
    toggleButton.classList.toggle('rotate-180')
  }
}

function closeAllSubMenus(){
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
      ul.classList.remove('show')
      ul.classList.remove('grid-rows-[1fr]')
      ul.previousElementSibling.classList.remove('rotate')
    })
  }
}

function setActiveNavigation() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  const sidebar = document.getElementById('sidebar');
  
  if (!sidebar) return;
  
  const allNavItems = sidebar.querySelectorAll('li');
  allNavItems.forEach(item => item.classList.remove('active'));
  
  const navLinks = sidebar.querySelectorAll('a[href]');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const linkPage = href.split('/').pop();
    
    if (linkPage === currentPage || 
        (currentPage === 'index.html' && linkPage === 'index.html') ||
        (currentPath.includes('index') && linkPage === 'index.html')) {
      link.closest('li').classList.add('active');
    }
  });
  
  if (currentPath === '/' || currentPath.endsWith('/web/') || currentPage === '') {
    const homeLink = sidebar.querySelector('a[href*="index.html"]');
    if (homeLink) {
      homeLink.closest('li').classList.add('active');
    }
  }
}