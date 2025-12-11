// 公共组件生成器
// 使用 AppConfig 配置生成公共组件

/**
 * 检查并应用保存的语言偏好
 * 如果用户之前选择了语言，但当前页面不是该语言，则自动跳转
 */
function checkAndApplyLanguagePreference() {
  const savedLang = getLanguagePreference();
  if (!savedLang) {
    return; // 没有保存的语言偏好，不处理
  }

  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/').filter(p => p);
  const currentLang = detectCurrentLanguage(pathParts);

  // 如果保存的语言与当前页面语言一致，不需要跳转
  if (savedLang === currentLang) {
    return;
  }

  // 获取当前页面名称
  const currentPage = getCurrentPageName(pathParts, currentLang);

  // 构建新路径
  let newPath;
  if (savedLang === 'en') {
    // 英语：根目录
    if (currentPage === 'index.html' || currentPage === '') {
      newPath = '/';
    } else {
      newPath = '/' + currentPage;
    }
  } else {
    // 其他语言：语言文件夹
    if (currentPage === 'index.html' || currentPage === '') {
      newPath = '/' + savedLang + '/';
    } else {
      newPath = '/' + savedLang + '/' + currentPage;
    }
  }

  // 保留查询参数
  const queryString = window.location.search;
  window.location.href = newPath + queryString;
}

/**
 * 生成导航栏
 * @param {string} currentPage - 当前页面标识（用于高亮当前导航项）
 */
function renderHeader(currentPage = '') {
  // 检查 AppConfig 是否已加载
  if (typeof AppConfig === 'undefined') {
    console.error('AppConfig is not defined! Make sure config.js is loaded before components.js');
    return;
  }
  
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (!headerPlaceholder) {
    console.warn('Header placeholder not found');
    return;
  }

  // 检测当前语言
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/').filter(p => p);
  const currentLang = detectCurrentLanguage(pathParts);
  
  // 根据当前语言生成品牌链接（品牌链接应该指向当前语言的首页）
  const brandHref = currentLang === 'en' ? './index.html' : './index.html';
  const brandLogoPath = currentLang === 'en' ? AppConfig.brand.logo : AppConfig.brand.logo.replace('./', '../');
  
  const navLinksHtml = AppConfig.navLinks.map(link => {
    const isActive = link.key === currentPage ? 'active' : '';
    const externalAttrs = link.external 
      ? 'target="_blank" rel="noopener noreferrer"' 
      : '';
    
    // 根据当前语言调整链接路径
    let linkHref = link.href;
    if (!link.external) {
      if (currentLang === 'en') {
        // 英语：保持原路径
        linkHref = link.href;
      } else {
        // 其他语言：调整路径
        linkHref = link.href.replace('./', '../');
      }
    }
    
    return `
      <a href="${linkHref}" class="nav-link ${isActive}" ${externalAttrs}>
        ${link.text}
      </a>
    `;
  }).join('');

  const languageSwitchHtml = AppConfig.showLanguageSwitch ? `
    <div class="language-switch">
      <label for="languageSelect" data-i18n="ui.languageLabel">Language</label>
      <select id="languageSelect" class="language-select" aria-label="Language selector">
        ${AppConfig.languages.map(lang => `
          <option value="${lang.value}" ${lang.value === currentLang ? 'selected' : ''}>${lang.flag} ${lang.name}</option>
        `).join('')}
      </select>
    </div>
  ` : '';

  headerPlaceholder.innerHTML = `
    <header>
      <div class="nav">
        <div class="nav-links">
          <a href="${brandHref}" class="brand" style="text-decoration: none; color: inherit;">
            <img src="${brandLogoPath}" alt="${AppConfig.brand.name} Logo" class="brand-logo" />
            <span data-i18n="brand.name">${AppConfig.brand.name}</span>
          </a>
          ${navLinksHtml}
        </div>
        ${languageSwitchHtml}
      </div>
    </header>
  `;

  // 初始化语言切换功能
  if (AppConfig.showLanguageSwitch) {
    initLanguageSwitch();
  }
}

/**
 * 生成页脚
 */
function renderFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) {
    console.warn('Footer placeholder not found');
    return;
  }

  // 检测当前语言
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/').filter(p => p);
  const currentLang = detectCurrentLanguage(pathParts);

  const footerLinksHtml = AppConfig.footerLinks.map(link => {
    const i18nAttr = link.i18n ? `data-i18n="${link.i18n}"` : '';
    
    // 根据当前语言调整链接路径
    let linkHref = link.href;
    if (currentLang !== 'en') {
      // 其他语言：调整路径
      linkHref = link.href.replace('./', '../');
    }
    
    return `
      <a href="${linkHref}" ${i18nAttr}>${link.text}</a>
    `;
  }).join('');

  const partnersHtml = AppConfig.footerPartners.map(partner => {
    if (partner.type === 'image') {
      const style = partner.width === 'auto' 
        ? `style="height: ${partner.height}px; width: auto;"`
        : `style="width: ${partner.width}px; height: ${partner.height}px;"`;
      return `
        <a href="${partner.href}" target="_blank" ${partner.rel ? `rel="${partner.rel}"` : ''}>
          <img src="${partner.src}" alt="${partner.alt}" ${style} width="${partner.width}" height="${partner.height}" />
        </a>
      `;
    } else {
      const titleAttr = partner.title ? `title="${partner.title}"` : '';
      return `
        <a href="${partner.href}" ${partner.target ? `target="${partner.target}"` : ''} ${titleAttr} class="footer-partner-text">${partner.text}</a>
      `;
    }
  }).join('');

  footerPlaceholder.innerHTML = `
    <footer>
      <div class="footer-inner">
        <span>${AppConfig.brand.name}</span>
        <div class="footer-links">
          ${footerLinksHtml}
        </div>
        <small>&copy; <span id="year"></span> ${AppConfig.brand.name}</small>
      </div>
      <div class="footer-partner">
        ${partnersHtml}
      </div>
    </footer>
  `;

  // 更新年份
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * 保存语言选择到 localStorage
 */
function saveLanguagePreference(lang) {
  try {
    localStorage.setItem('preferredLanguage', lang);
  } catch (e) {
    console.warn('Failed to save language preference:', e);
  }
}

/**
 * 从 localStorage 读取语言选择
 */
function getLanguagePreference() {
  try {
    return localStorage.getItem('preferredLanguage');
  } catch (e) {
    console.warn('Failed to read language preference:', e);
    return null;
  }
}

/**
 * 检测当前语言
 */
function detectCurrentLanguage(pathParts) {
  // 如果第一个路径段是语言代码，返回该语言
  if (pathParts.length > 0 && isLanguageCode(pathParts[0])) {
    return pathParts[0];
  }
  // 否则默认为英语
  return 'en';
}

/**
 * 获取当前页面文件名
 */
function getCurrentPageName(pathParts, currentLang) {
  if (currentLang === 'en') {
    // 英语：最后一个路径段或 index.html
    if (pathParts.length === 0 || pathParts[0] === '') {
      return 'index.html';
    }
    return pathParts[pathParts.length - 1] || 'index.html';
  } else {
    // 其他语言：跳过语言代码，取最后一个路径段
    if (pathParts.length <= 1) {
      return 'index.html';
    }
    return pathParts[pathParts.length - 1] || 'index.html';
  }
}

/**
 * 检查是否为语言代码
 */
function isLanguageCode(code) {
  const validLanguages = ['es', 'de', 'fr', 'uk', 'pl', 'it', 'tr', 'pt', 'sv', 'ja', 'ms', 'ko'];
  return validLanguages.includes(code);
}

/**
 * 初始化语言切换功能
 */
function initLanguageSwitch() {
  const languageSelect = document.getElementById('languageSelect');
  if (!languageSelect) {
    console.warn('Language select element not found');
    return;
  }

  // 调试：检查当前语言
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/').filter(p => p);
  const currentLang = detectCurrentLanguage(pathParts);
  console.log('Language switch initialized:', {
    currentPath,
    pathParts,
    currentLang,
    selectedValue: languageSelect.value
  });

  languageSelect.addEventListener('change', function() {
    const selectedLang = this.value;
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(p => p);
    
    // 检测当前语言和页面
    const currentLang = detectCurrentLanguage(pathParts);
    const currentPage = getCurrentPageName(pathParts, currentLang);
    
    // 保存语言选择到 localStorage
    saveLanguagePreference(selectedLang);
    
    console.log('Language switch triggered:', {
      selectedLang,
      currentLang,
      currentPage,
      pathParts
    });
    
    // 构建新路径
    let newPath;
    if (selectedLang === 'en') {
      // 英语：根目录
      if (currentPage === 'index.html' || currentPage === '') {
        newPath = '/';
      } else {
        newPath = '/' + currentPage;
      }
    } else {
      // 其他语言：语言文件夹
      if (currentPage === 'index.html' || currentPage === '') {
        newPath = '/' + selectedLang + '/';
      } else {
        newPath = '/' + selectedLang + '/' + currentPage;
      }
    }
    
    console.log('Navigating to:', newPath);
    
    // 保留查询参数
    const queryString = window.location.search;
    window.location.href = newPath + queryString;
  });
}

// 标记是否已检查过语言偏好，避免重复检查
let languagePreferenceChecked = false;

/**
 * 初始化公共组件
 * @param {Object} options - 配置选项
 * @param {string} options.currentPage - 当前页面标识
 * @param {boolean} options.renderHeader - 是否渲染导航栏（默认true）
 * @param {boolean} options.renderFooter - 是否渲染页脚（默认true）
 */
function initComponents(options = {}) {
  const {
    currentPage = '',
    renderHeader: shouldRenderHeader = true,
    renderFooter: shouldRenderFooter = true
  } = options;

  // 在首次初始化时检查语言偏好（只检查一次）
  if (!languagePreferenceChecked) {
    languagePreferenceChecked = true;
    // 延迟检查，确保在页面加载完成后执行
    setTimeout(() => {
      checkAndApplyLanguagePreference();
    }, 0);
  }

  if (shouldRenderHeader) {
    renderHeader(currentPage);
  }
  
  if (shouldRenderFooter) {
    renderFooter();
  }
}

// 导出函数（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initComponents, renderHeader, renderFooter };
}

