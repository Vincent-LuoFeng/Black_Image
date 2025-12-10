# 页面迁移指南

由于页面较多，这里提供一个通用的迁移模式。所有 `*-image.html` 和 `*-screen.html` 页面都可以按照相同的模式迁移。

## 迁移步骤（适用于所有页面）

### 1. 在 `<head>` 中添加公共样式链接

在字体链接后添加：
```html
<!-- 公共组件样式 -->
<link rel="stylesheet" href="./css/common.css" />
```

### 2. 从 `<style>` 标签中移除公共样式

删除以下样式（它们已移至 `css/common.css`）：
- `header { ... }`
- `.nav { ... }`
- `.brand { ... }`
- `.nav-links { ... }`
- `.nav-link { ... }` 及其所有变体
- `.brand-logo { ... }`
- `footer { ... }`
- `.footer-inner { ... }`
- `.footer-links { ... }`
- `.language-switch { ... }`
- `.language-select { ... }`

替换为注释：
```css
/* 公共组件样式已移至 css/common.css */
```

### 3. 替换 `<header>` 标签

将整个 `<header>...</header>` 替换为：
```html
<!-- 导航栏占位符，将由 components.js 动态生成 -->
<div id="header-placeholder"></div>
```

### 4. 替换 `<footer>` 标签

将整个 `<footer>...</footer>` 替换为：
```html
<!-- 页脚占位符，将由 components.js 动态生成 -->
<div id="footer-placeholder"></div>
```

### 5. 移除年份更新代码

删除或注释掉：
```javascript
const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();
```

### 6. 在 `</body>` 前添加组件初始化代码

在最后一个 `</script>` 标签后、`</body>` 前添加：
```html
<!-- 公共组件系统 -->
<script src="./js/config.js"></script>
<script src="./js/components.js"></script>
<script>
  // 初始化公共组件（页面加载完成后）
  document.addEventListener('DOMContentLoaded', function() {
    initComponents({
      currentPage: '', // 根据页面设置，见下方说明
      renderHeader: true,
      renderFooter: true
    });
  });
</script>
```

### 7. 设置 currentPage 参数

根据页面类型设置 `currentPage`：

- **首页**: `'index'` (但首页通常不在导航中)
- **Black Screen**: `'black-screen'`
- **Fake Screen**: `'fake-screen'`
- **其他页面**: 如果不在导航中，可以设置为空字符串 `''`

## 已迁移的页面

✅ `index.html` - currentPage: `'index'`
✅ `fake-windows-10-update-screen.html` - currentPage: `'fake-screen'`
✅ `black-screen.html` - currentPage: `'black-screen'`

## 待迁移的页面

以下页面需要按照上述步骤迁移：

### *-image.html 页面（8个）
- `white-image.html`
- `red-image.html`
- `green-image.html`
- `blue-image.html`
- `yellow-image.html`
- `orange-image.html`
- `pink-image.html`
- `purple-image.html`

### *-screen.html 页面（9个，已迁移2个）
- `white-screen.html`
- `red-screen.html`
- `green-screen.html`
- `blue-screen.html`
- `yellow-screen.html`
- `orange-screen.html`
- `pink-screen.html`
- `purple-screen.html`

### 其他页面
- `privacy-policy.html`
- `user-agreement.html`

## 注意事项

1. 所有 `*-image.html` 和 `*-screen.html` 页面结构相似，可以批量处理
2. 这些页面通常不在导航栏中，所以 `currentPage` 可以设置为空字符串
3. 迁移后测试每个页面，确保导航栏和页脚正常显示
4. 如果页面有特殊的语言切换逻辑，可能需要调整

## 快速检查清单

迁移完成后，检查：
- [ ] 公共样式链接已添加
- [ ] 公共样式已从 `<style>` 中移除
- [ ] `<header>` 已替换为占位符
- [ ] `<footer>` 已替换为占位符
- [ ] 年份更新代码已移除
- [ ] 组件初始化代码已添加
- [ ] `currentPage` 参数已正确设置
- [ ] 页面在浏览器中正常显示

