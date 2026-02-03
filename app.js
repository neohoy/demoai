const titleInput = document.getElementById('title');
const summaryInput = document.getElementById('summary');
const generateButton = document.getElementById('generate');
const resetButton = document.getElementById('reset');
const article = document.getElementById('article');
const coverImage = document.getElementById('cover');
const imageTip = document.getElementById('image-tip');
const layoutTips = document.getElementById('layout-tips');
const revisionInput = document.getElementById('revision');
const applyRevisionButton = document.getElementById('apply-revision');

const defaultTips = [
  '小标题使用「加粗 + 色块」突出段落。',
  '每段 2-3 行，便于移动端阅读。',
  '关键数据用列表或引用块呈现。',
];

const revisionTipPool = [
  '开篇加入情绪化钩子，引导读者继续阅读。',
  '中段加入案例或数据，让观点更可信。',
  '结尾加上行动号召和关注提示。',
  '用 1-2 个金句强化传播性。',
];

const sampleSections = [
  '场景洞察：趋势正在重塑内容生产。',
  '方法拆解：三步输出高质量文章。',
  '实操清单：工具 + 模板 + 迭代机制。',
];

const generateCover = (title) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="400">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#6d73ff" />
          <stop offset="100%" stop-color="#f48a42" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" rx="24" fill="url(#grad)" />
      <rect x="40" y="60" width="560" height="280" rx="20" fill="rgba(255,255,255,0.18)" />
      <text x="320" y="180" text-anchor="middle" font-size="30" font-family="'PingFang SC','Microsoft Yahei',sans-serif" fill="#fff">公众号封面建议</text>
      <text x="320" y="235" text-anchor="middle" font-size="20" font-family="'PingFang SC','Microsoft Yahei',sans-serif" fill="#fff">${title || '输入标题生成专属封面'}</text>
      <text x="320" y="280" text-anchor="middle" font-size="14" font-family="'PingFang SC','Microsoft Yahei',sans-serif" fill="#fff">AI 视觉基调 · 温暖科技感</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const renderArticle = (title, summary) => {
  const summaryLines = summary
    .split(/\n|。|；|;|\./)
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletItems = summaryLines.length
    ? summaryLines.slice(0, 3)
    : ['明确痛点', '给出解决方案', '引导互动与关注'];

  const sectionHtml = sampleSections
    .map(
      (section, index) => `
      <h2>${section}</h2>
      <p>${summaryLines[index] || summary || '结合你的内容要点，展开详细阐述。'}</p>
    `
    )
    .join('');

  return `
    <h1>${title || '文章标题待补充'}</h1>
    <p>导语：${summary || '用一句话概括文章价值，吸引读者深入阅读。'}</p>
    <blockquote>本篇将为你输出公众号文章结构、封面建议与排版要点。</blockquote>
    <h2>核心亮点速览</h2>
    <ul>
      ${bulletItems.map((item) => `<li>${item}</li>`).join('')}
    </ul>
    ${sectionHtml}
    <h2>结尾行动</h2>
    <p>总结关键观点，并邀请读者留言互动、关注公众号获取更多内容。</p>
  `;
};

const renderTips = (revisionText) => {
  const tips = revisionText
    ? revisionTipPool.map((tip) => `${tip}（基于修订需求优化）`)
    : defaultTips;

  layoutTips.innerHTML = tips.map((tip) => `<li>${tip}</li>`).join('');
};

const handleGenerate = () => {
  const title = titleInput.value.trim();
  const summary = summaryInput.value.trim();

  article.innerHTML = renderArticle(title, summary);
  coverImage.src = generateCover(title);
  imageTip.textContent = title
    ? '已生成与标题匹配的视觉基调，可进一步替换实拍或插画。'
    : '已生成基础封面配图，建议补充标题后更新。';
  renderTips();
};

const handleReset = () => {
  titleInput.value = '';
  summaryInput.value = '';
  revisionInput.value = '';
  article.innerHTML = '<p class="placeholder">生成内容将显示在这里...</p>';
  coverImage.removeAttribute('src');
  imageTip.textContent = '等待生成封面配图。';
  renderTips();
};

const handleRevision = () => {
  const revisionText = revisionInput.value.trim();
  if (!revisionText) {
    renderTips();
    return;
  }

  article.insertAdjacentHTML(
    'beforeend',
    `
      <blockquote>修订指令：${revisionText}</blockquote>
      <p>已根据修订指令强化语气与案例安排，请检查并进一步微调。</p>
    `
  );

  renderTips(revisionText);
};

renderTips();

generateButton.addEventListener('click', handleGenerate);
resetButton.addEventListener('click', handleReset);
applyRevisionButton.addEventListener('click', handleRevision);
