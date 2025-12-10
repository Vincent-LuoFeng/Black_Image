# 多语言支持方案

## 目标
- 英语页面保留在根目录（当前状态）
- 西班牙语页面放在 `es/` 文件夹
- 未来可以轻松扩展其他语言（如 `de/`, `fr/` 等）
- 保持URL结构清晰：`/` 为英语，`/es/` 为西班牙语

## 文件结构设计

### 方案A：按语言分文件夹（推荐）

```
Black_Image/
├── index.html                    # 英语首页
├── black-screen.html             # 英语页面
├── fake-windows-10-update-screen.html
├── ... (所有英语页面)
│
├── es/                           # 西班牙语文件夹
│   ├── index.html                # 西班牙语首页
│   ├── black-screen.html
│   ├── fake-windows-10-update-screen.html
│   └── ... (所有西班牙语页面)
│
├── js/                           # 共享的JS文件
│   ├── config.js
│   └── components.js
│
├── css/                          # 共享的CSS文件
│   └── common.css
│
└── pic/                          # 共享的图片资源
    └── ...
```

### 方案B：所有语言都在各自文件夹（更统一）

```
Black_Image/
├── en/                           # 英语文件夹
│   ├── index.html
│   ├── black-screen.html
│   └── ...
│
├── es/                           # 西班牙语文件夹
│   ├── index.html
│   ├── black-screen.html
│   └── ...
│
├── js/
├── css/
└── pic/
```

**推荐使用方案A**，因为：
- 英语作为默认语言，保持根目录简洁
- 符合SEO最佳实践（根目录权重更高）
- 迁移成本更低（只需创建新语言文件夹）

## 路径处理方案

### 1. 资源路径处理

所有页面中的资源路径需要根据当前语言目录调整：

**当前（根目录）：**
```html
<link rel="stylesheet" href="./css/common.css" />
<script src="./js/config.js"></script>
```

**在 es/ 文件夹中：**
```html
<link rel="stylesheet" href="../css/common.css" />
<script src="../js/config.js"></script>
```

### 2. 页面间链接处理

**当前（根目录）：**
```html
<a href="./black-screen.html">Black Screen</a>
```

**在 es/ 文件夹中：**
```html
<a href="./black-screen.html">Pantalla Negra</a>
```

### 3. 语言切换逻辑改进

需要修改 `js/components.js` 中的 `initLanguageSwitch()` 函数：

```javascript
function initLanguageSwitch() {
  const languageSelect = document.getElementById('languageSelect');
  if (!languageSelect) return;

  languageSelect.addEventListener('change', function() {
    const selectedLang = this.value;
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(p => p);
    
    // 检测当前语言
    const currentLang = detectCurrentLanguage(pathParts);
    const currentPage = getCurrentPageName(pathParts, currentLang);
    
    // 构建新路径
    let newPath;
    if (selectedLang === 'en') {
      // 英语：根目录
      newPath = '/' + currentPage;
    } else {
      // 其他语言：语言文件夹
      newPath = '/' + selectedLang + '/' + currentPage;
    }
    
    // 保留查询参数
    const queryString = window.location.search;
    window.location.href = newPath + queryString;
  });
}

// 检测当前语言
function detectCurrentLanguage(pathParts) {
  // 如果第一个路径段是语言代码，返回该语言
  if (pathParts.length > 0 && isLanguageCode(pathParts[0])) {
    return pathParts[0];
  }
  // 否则默认为英语
  return 'en';
}

// 获取当前页面文件名
function getCurrentPageName(pathParts, currentLang) {
  if (currentLang === 'en') {
    // 英语：最后一个路径段或 index.html
    return pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'index.html';
  } else {
    // 其他语言：跳过语言代码，取最后一个路径段
    return pathParts.length > 1 ? pathParts[pathParts.length - 1] : 'index.html';
  }
}

// 检查是否为语言代码
function isLanguageCode(code) {
  const validLanguages = ['es', 'de', 'fr', 'uk', 'pl', 'it', 'tr', 'pt', 'sv', 'ja', 'ms', 'ko'];
  return validLanguages.includes(code);
}
```

## 实施步骤

### 第一步：创建 es/ 文件夹结构
```
mkdir es
```

### 第二步：复制所有HTML文件到 es/ 文件夹
```
cp *.html es/
# 但排除 googlebe9f157da23b76c5.html 等特殊文件
```

### 第三步：修改 es/ 文件夹中的文件

1. **更新资源路径**（相对路径改为上一级）
   - `./css/common.css` → `../css/common.css`
   - `./js/config.js` → `../js/config.js`
   - `./pic/logo.ico` → `../pic/logo.ico`

2. **更新页面内容为西班牙语**
   - 翻译所有文本内容
   - 更新 meta 标签中的语言标识：`<html lang="es">`
   - 更新页面标题和描述

3. **更新导航链接**
   - 确保链接指向同一语言文件夹内的页面
   - 例如：`<a href="./black-screen.html">`（在 es/ 中指向 es/black-screen.html）

### 第四步：更新语言切换逻辑

修改 `js/components.js` 中的 `initLanguageSwitch()` 函数，支持：
- 检测当前语言（通过URL路径）
- 正确切换语言（保持当前页面）
- 设置语言选择器的默认值

### 第五步：更新 config.js（可选）

如果需要语言特定的配置，可以创建：
- `js/config-en.js`（英语配置）
- `js/config-es.js`（西班牙语配置）

或者使用一个配置文件，根据当前语言动态加载内容。

## 路径映射示例

### URL 映射规则

| 英语URL | 西班牙语URL | 说明 |
|---------|------------|------|
| `/` | `/es/` | 首页 |
| `/index.html` | `/es/index.html` | 首页 |
| `/black-screen.html` | `/es/black-screen.html` | 黑色屏幕页 |
| `/fake-windows-10-update-screen.html` | `/es/fake-windows-10-update-screen.html` | 假更新页面 |

## 优势

1. **清晰的URL结构**：`/` 是英语，`/es/` 是西班牙语
2. **SEO友好**：每种语言有独立的URL
3. **易于扩展**：添加新语言只需创建新文件夹
4. **维护简单**：每种语言的文件独立，便于翻译管理

## 注意事项

1. **资源路径**：es/ 文件夹中的页面需要使用 `../` 访问共享资源
2. **链接一致性**：确保同一语言文件夹内的链接使用相对路径
3. **默认语言**：根目录的英语页面作为默认，需要处理 `/` 的情况
4. **404处理**：如果某个语言版本不存在，可以重定向到英语版本
5. **语言检测**：可以根据浏览器语言自动重定向到对应语言版本

## 扩展性

未来添加更多语言时：
- 创建新文件夹：`de/`, `fr/`, `ja/` 等
- 复制并翻译所有HTML文件
- 更新 `isLanguageCode()` 函数添加新语言代码
- 语言切换逻辑自动支持新语言

## 可选优化

1. **自动语言检测**：在首页根据浏览器语言自动重定向
2. **语言持久化**：使用 localStorage 记住用户选择的语言
3. **语言特定的配置**：不同语言可能有不同的导航链接或内容
4. **翻译管理系统**：使用 i18n 库统一管理翻译内容

