// Yandex.Metrika — counter 108589533
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}
)(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
ym(108589533,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});

// Market-Place / MPSU ads for vw-portal.vercel.app
// Articles only: horizontal after 1st and 5th paragraphs, sidebar vertical, corner sticker
(function () {
  var MPSU_SCRIPT_SRC = 'https://statika.mpsuadv.ru/scripts/11310.js';

  function isArticlePage() {
    if (!document.body) return false;
    if (document.body.classList.contains('home')) return false;
    if (document.body.classList.contains('category')) return false;
    if (document.body.classList.contains('archive')) return false;

    return !!document.querySelector('article, .article-body');
  }

  function getArticleRoot() {
    return document.querySelector('article') || document.querySelector('.article-body');
  }

  function loadMpsuScript() {
    if (document.querySelector('script[src="' + MPSU_SCRIPT_SRC + '"]')) return;

    var script = document.createElement('script');
    script.async = true;
    script.src = MPSU_SCRIPT_SRC;
    document.head.appendChild(script);
  }

  function startWidget(widgetId) {
    window.mpsuStart = window.mpsuStart || [];
    window.mpsuStart.push(widgetId);
  }

  function createWidget(widgetId) {
    if (document.getElementById('mp_custom_' + widgetId)) return null;

    var block = document.createElement('div');
    block.id = 'mp_custom_' + widgetId;
    return block;
  }

  function insertAfterParagraph(widgetId, paragraphNumber) {
    var article = getArticleRoot();
    var paragraphs = article ? article.querySelectorAll('p') : [];

    if (paragraphs.length < paragraphNumber) return;

    var block = createWidget(widgetId);
    if (!block) return;

    paragraphs[paragraphNumber - 1].insertAdjacentElement('afterend', block);
    startWidget(widgetId);
  }

  function insertSidebarWidget(widgetId) {
    var sidebar = document.querySelector('aside, .sidebar, [class*="sidebar"], [id*="sidebar"]');
    if (!sidebar) return;

    var block = createWidget(widgetId);
    if (!block) return;

    sidebar.appendChild(block);
    startWidget(widgetId);
  }

  function insertFloatingWidget(widgetId) {
    var block = createWidget(widgetId);
    if (!block) return;

    document.body.appendChild(block);
    startWidget(widgetId);
  }

  function initAds() {
    if (!isArticlePage()) return;

    loadMpsuScript();

    insertAfterParagraph(38730, 1);
    insertAfterParagraph(38731, 5);
    insertSidebarWidget(38732);
    insertFloatingWidget(38733);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();

// ============================================================
//  HOTFIX: Fix search URL generation
//  Search results incorrectly include category slug in URL:
//    /voennaya-forma/kakie-berety.html
//  Correct format is hash_dirs:
//    /articles/k/ka/kakie-berety.html
//  This observer watches search dropdowns and fixes URLs.
// ============================================================
(function(){
    var dd = document.getElementById('globalSearchDropdown') || document.getElementById('searchDropdown');
    if (!dd) return;
    new MutationObserver(function(){
        var links = dd.querySelectorAll('a[href]');
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            if (a._urlFixed) continue;
            a._urlFixed = true;
            var href = a.getAttribute('href');
            if (!href) continue;
            if (href.indexOf('/articles/') !== -1) continue;
            var parts = href.split('/');
            var filename = parts[parts.length - 1];
            if (!filename.endsWith('.html')) continue;
            var slug = filename.replace('.html', '').toLowerCase();
            var c1 = slug[0] || '';
            var c2 = slug.substring(0, Math.min(2, slug.length));
            var newUrl = '/articles/' + c1 + '/' + c2 + '/' + filename;
            a.setAttribute('href', newUrl);
            var slugEl = a.querySelector('.sd-slug');
            if (slugEl) slugEl.textContent = newUrl;
        }
    }).observe(dd, {childList: true, subtree: true});
})();
