# 公共组件系统使用说明

## 概述

为了解决公共组件（导航栏、页脚等）需要在所有HTML文件中重复修改的问题，我们创建了一个公共组件系统。

## 文件结构

```
Black_Image/
├── js/
│   ├── config.js          # 公共组件配置文件（所有配置都在这里）
│   └── components.js      # 公共组件生成器
├── css/
│   └── common.css         # 公共组件样式
└── index.html             # 示例页面
```

## 使用方法

### 1. 在HTML文件中引入公共样式和脚本

在 `<head>` 标签中引入公共样式：

```html
<link rel="stylesheet" href="./css/common.css" />
```

在 `</body>` 标签前引入配置和组件脚本：

```html
<!-- 公共组件系统 -->
<script src="./js/config.js"></script>
<script src="./js/components.js"></script>
<script>
  // 初始化公共组件
  document.addEventListener('DOMContentLoaded', function() {
    initComponents({
      currentPage: 'index', // 当前页面标识，用于高亮导航项
      renderHeader: true,  // 是否渲染导航栏
      renderFooter: true   // 是否渲染页脚
    });
  });
</script>
```

### 2. 在HTML中添加占位符

将原来的 `<header>` 和 `<footer>` 标签替换为占位符：

```html
<body>
  <!-- 导航栏占位符，将由 components.js 动态生成 -->
  <div id="header-placeholder"></div>
  
  <main>
    <!-- 页面内容 -->
  </main>
  
  <!-- 页脚占位符，将由 components.js 动态生成 -->
  <div id="footer-placeholder"></div>
</body>
```

### 3. 配置当前页面标识

在 `initComponents()` 中设置 `currentPage` 参数，用于高亮当前页面的导航项：

```javascript
initComponents({
  currentPage: 'black-screen',  // 对应 config.js 中 navLinks 的 key
  renderHeader: true,
  renderFooter: true
});
```

## 修改公共组件

### 修改导航链接

编辑 `js/config.js` 文件中的 `navLinks` 数组：

```javascript
navLinks: [
  {
    text: 'Black Screen',
    href: './black-screen.html',
    key: 'black-screen'  // 用于标识当前页面
  },
  // 添加新链接...
]
```

### 修改页脚链接

编辑 `js/config.js` 文件中的 `footerLinks` 数组：

```javascript
footerLinks: [
  {
    text: 'Privacy Policy',
    href: './privacy-policy.html',
    i18n: 'footer.privacy'
  },
  // 添加新链接...
]
```

### 修改语言选项

编辑 `js/config.js` 文件中的 `languages` 数组：

```javascript
languages: [
  { value: 'en', flag: '🇺🇸', name: 'English' },
  // 添加新语言...
]
```

### 显示/隐藏语言切换组件

在 `js/config.js` 中修改：

```javascript
showLanguageSwitch: true  // 改为 false 可隐藏
```

## 优势

1. **集中管理**：所有公共组件配置都在 `js/config.js` 中，修改一处即可更新所有页面
2. **易于维护**：添加新页面只需在HTML中引入组件系统，无需复制粘贴代码
3. **支持多语言**：语言配置集中管理，便于后续多语言页面扩展
4. **样式统一**：公共样式集中在 `css/common.css`，确保所有页面样式一致

## 迁移现有页面

要将现有页面迁移到新系统：

1. 在 `<head>` 中添加 `<link rel="stylesheet" href="./css/common.css" />`
2. 将 `<header>...</header>` 替换为 `<div id="header-placeholder"></div>`
3. 将 `<footer>...</footer>` 替换为 `<div id="footer-placeholder"></div>`
4. 在页面底部添加组件初始化代码
5. 从 `<style>` 标签中移除已移至 `common.css` 的公共样式

## 注意事项

- 确保 `config.js` 在 `components.js` 之前加载
- `currentPage` 的值必须与 `config.js` 中 `navLinks` 的 `key` 匹配，才能正确高亮当前页面
- 如果某个页面不需要导航栏或页脚，可以设置 `renderHeader: false` 或 `renderFooter: false`

