(function() {
  var el = document.getElementById('site-nav');
  if (!el) return;

  // Work out path prefix based on depth
  var depth = window.location.pathname.split('/').length - 2;
  var prefix = '';
  for (var i = 0; i < depth; i++) prefix += '../';

  el.innerHTML = '<nav>' +
    '<a href="' + prefix + 'index.html" class="logo">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="295 13 90 70" height="50" style="display:block;">' +
        '<defs><style>@import url(\'https://fonts.googleapis.com/css2?family=Bungee&display=swap\');</style></defs>' +
        '<rect x="301" y="18" width="78" height="30" rx="2" fill="#2C2019"/>' +
        '<text x="340" y="38" font-family="\'Bungee\', \'Arial Black\', sans-serif" font-size="15" fill="#F5EDD8" letter-spacing="0.04em" text-anchor="middle">YIMBY</text>' +
        '<rect x="286" y="47" width="108" height="30" rx="2" fill="#D85A30"/>' +
        '<text x="340" y="67" font-family="\'Bungee\', \'Arial Black\', sans-serif" font-size="15" fill="#F5EDD8" letter-spacing="0.04em" text-anchor="middle">GLASGOW</text>' +
      '</svg>' +
    '</a>' +
    '<ul class="nav-links" id="navLinks">' +
      '<li><a href="' + prefix + 'ideas/index.html">The ideas</a></li>' +
      '<li><a href="' + prefix + 'myths/myths-index.html">Myths</a></li>' +
      '<li><a href="' + prefix + 'evidence.html">Evidence</a></li>' +
      '<li><a href="' + prefix + 'get-involved.html" class="nav-cta">Get involved</a></li>' +
      '<li><a href="' + prefix + 'about/donate.html" class="nav-donate">Donate</a></li>' +
    '</ul>' +
    '<button class="nav-toggle" id="navToggle" onclick="toggleNav()">Menu</button>' +
  '</nav>';
})();

function toggleNav() {
  var links = document.getElementById('navLinks');
  var toggle = document.getElementById('navToggle');
  var open = links.classList.toggle('open');
  toggle.textContent = open ? 'Close' : 'Menu';
}
