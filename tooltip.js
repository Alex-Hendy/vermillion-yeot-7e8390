/**
 * Glasgow YIMBY — Glossary Tooltip System
 *
 * Usage: Add class="glossary-term" and data-term="term-id" to any span.
 * Example: <span class="glossary-term" data-term="windfall">windfall development</span>
 *
 * The tooltip will show the short definition and link to the glossary page.
 * The glossary page path is set by GLOSSARY_PATH below — set per page if needed
 * by adding data-glossary-path="/path/to/glossary.html" on the body element.
 */

(function() {
  'use strict';

  // Short tooltip definitions (1-2 sentences max)
  var TERMS = {
    'ahsp': {
      short: 'The Scottish Government\'s main grant programme for funding affordable homes, channelled through housing associations and councils.',
      anchor: 'ahsp'
    },
    'cdp2': {
      short: 'Glasgow City Council\'s replacement Local Development Plan, currently in preparation. Expected to be adopted in 2027.',
      anchor: 'cdp2'
    },
    'cil': {
      short: 'A fixed, non-negotiable charge per square metre of new development used in England to fund local infrastructure. Scotland does not have an equivalent.',
      anchor: 'cil'
    },
    'demand': {
      short: 'In housing economics, demand refers to the number of people seeking homes at a given price. When demand exceeds supply, prices rise.',
      anchor: 'demand'
    },
    'filtering': {
      short: 'The process by which new homes at any price point free up older, cheaper homes through a chain of moves, benefiting renters across the income spectrum.',
      anchor: 'filtering'
    },
    'ldp': {
      short: 'The document each Scottish council produces setting out where and what can be built in its area. Planning applications are assessed against the LDP.',
      anchor: 'ldp'
    },
    'mathlr': {
      short: 'The minimum number of homes each Scottish council must allocate land for in its Local Development Plan, calculated by the Scottish Government.',
      anchor: 'mathlr'
    },
    'nbhs': {
      short: 'A Scottish regulation in force from April 2024 banning gas boilers in new homes, requiring low-carbon alternatives such as heat pumps.',
      anchor: 'nbhs'
    },
    'nimby': {
      short: 'Not In My Back Yard. A term for people who oppose new development near them, regardless of the broader case for building more homes.',
      anchor: null
    },
    'npf4': {
      short: 'Scotland\'s national planning policy document, adopted in February 2023. Sets the framework within which all Scottish planning decisions are made.',
      anchor: 'npf4'
    },
    'npf4-policy-16': {
      short: 'A provision of NPF4 restricting new housing to sites allocated in the Local Development Plan, limiting development on non-allocated sites.',
      anchor: 'npf4-policy-16'
    },
    'passivhaus': {
      short: 'A German building standard requiring very high levels of insulation, airtightness, and ventilation. Scotland is introducing an equivalent for new homes.',
      anchor: 'passivhaus'
    },
    'presumption': {
      short: 'A mechanism in Scottish planning policy (2014–2023) that tilted decisions in favour of housing when a council could not demonstrate a five-year land supply.',
      anchor: 'presumption'
    },
    'build-out': {
      short: 'The rate at which a developer constructs homes on a site that already has planning permission. Slow build-out is sometimes cited as evidence of landbanking, but is usually explained by planning conditions, infrastructure delays, and market absorption rates.',
      anchor: null
    },
    'probate': {
      short: 'The legal process of administering a deceased person\'s estate, including transferring ownership of property. Homes can sit empty for months or years while probate is resolved.',
      anchor: 'probate'
    },
    'oecd': {
      short: 'The Organisation for Economic Co-operation and Development — a group of 38 mostly high-income countries that publish comparative data on housing, economics, and public policy.',
      anchor: 'oecd'
    },
    'tenure': {
      short: 'The legal basis on which someone occupies a home — owner-occupied, private rented, social rented, or other. Different tenures have different rights and obligations.',
      anchor: 'tenure'
    },
    'vacancy-rate': {
      short: 'The percentage of homes in an area that are empty at a given time. A low vacancy rate indicates high demand relative to supply; a high rate indicates the opposite.',
      anchor: 'vacancy-rate'
    },
    'incumbent-tenants': {
      short: 'Tenants already renting a property when rent controls are introduced. They benefit from below-market rents as long as they stay, but lose the protection if they move.',
      anchor: 'incumbent-tenants'
    },
    'planning-permission': {
      short: 'Formal approval from a planning authority allowing a development to proceed. In Scotland, every new home requires individual planning permission assessed against national and local planning policy.',
      anchor: 'planning-system'
    },
    'gentrification': {
      short: 'The process by which an area becomes more affluent, often accompanied by rising rents and the displacement of lower-income residents. The relationship between new housing and gentrification is widely debated.',
      anchor: null
    },
    'rent-controls': {
      short: 'Policies that cap or limit the rents landlords can charge, designed to protect tenants from rapid rent increases.',
      anchor: 'rent-controls'
    },
    'section-75': {
      short: 'A legal agreement between a developer and a planning authority setting out the developer\'s obligations — affordable housing, infrastructure, education, transport — as a condition of planning permission.',
      anchor: 'section-75'
    },
    'ship': {
      short: 'A five-year plan produced by each council setting out how it intends to deliver affordable housing and what Scottish Government funding it needs.',
      anchor: 'ship'
    },
    'supply': {
      short: 'In housing economics, supply refers to the number of homes available. When supply falls short of demand, prices and rents rise.',
      anchor: null
    },
    'windfall': {
      short: 'Housing built on sites not allocated in the Local Development Plan — such as disused car parks, gap sites, or former office buildings.',
      anchor: 'windfall'
    },
    'yimby': {
      short: 'Yes In My Back Yard. A term for people who support building more homes in their local area, in contrast to NIMBYism.',
      anchor: 'yimby'
    },
    'social-housing': {
      short: 'Homes let at below-market rents by councils or housing associations to people who cannot afford private rents. Also called council housing or affordable housing.',
      anchor: 'social-housing'
    },
    'waiting-list': {
      short: 'A register of households who have applied for social housing. The length of the waiting list reflects both the demand for social homes and the shortage of housing overall.',
      anchor: 'waiting-list'
    },
    'housing-association': {
      short: 'A not-for-profit organisation that builds and manages affordable and social housing. Housing associations are the main providers of new social housing in Scotland.',
      anchor: 'housing-association'
    },
    'planning-system': {
      short: 'The legal framework governing what can be built, where, and under what conditions. In Scotland, every new home requires individual planning permission assessed against national and local planning policy.',
      anchor: 'planning-system'
    },
    'sme-builders': {
      short: 'Small and medium-sized housebuilders, typically building fewer than 100 homes per year. SME builders historically delivered a significant share of new homes in Scotland.',
      anchor: null
    },
    'backlogs': {
      short: 'In planning, a backlog refers to the accumulation of unprocessed planning applications or stalled housing sites waiting for agreements to be finalised.',
      anchor: null
    },
    'stamp-duty': {
      short: 'A tax paid when buying property. In Scotland it is called Land and Buildings Transaction Tax (LBTT). It is one of several tax revenues generated by new housing development.',
      anchor: null
    },
    'upzoning': {
      short: 'Changing planning or zoning rules to allow more homes to be built in an area — for example, permitting taller buildings or more units per plot.',
      anchor: 'upzoning'
    },
    'supply': {
      short: 'In housing economics, supply refers to the number of homes available. When supply falls short of demand, prices and rents rise.',
      anchor: 'supply'
    },
    'housing-stock': {
      short: 'The total number of homes in an area, including all tenures — owner-occupied, private rented, social rented, and empty properties.',
      anchor: 'housing-stock'
    }
  };

  // Work out the path to the glossary from this page
  function getGlossaryPath() {
    var bodyPath = document.body.getAttribute('data-glossary-path');
    if (bodyPath) return bodyPath;
    // Default: try to work out from current path depth
    var depth = window.location.pathname.split('/').length - 2;
    var prefix = '';
    for (var i = 0; i < depth; i++) prefix += '../';
    return prefix + 'about/glossary.html';
  }

  // Create the tooltip element
  var tooltip = document.createElement('div');
  tooltip.id = 'glossary-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.style.cssText = [
    'position: fixed',
    'z-index: 9999',
    'max-width: 280px',
    'background: #1A1208',
    'color: #F5EDD8',
    'border-radius: 8px',
    'padding: 0.75rem 1rem',
    'font-family: Outfit, sans-serif',
    'font-size: 0.82rem',
    'line-height: 1.6',
    'box-shadow: 0 4px 16px rgba(0,0,0,0.25)',
    'pointer-events: none',
    'opacity: 0',
    'transition: opacity 0.15s ease',
    'border: 2px solid #E8A020'
  ].join(';');

  var tooltipArrow = document.createElement('div');
  tooltipArrow.style.cssText = [
    'position: absolute',
    'bottom: -6px',
    'left: 50%',
    'transform: translateX(-50%)',
    'width: 0',
    'height: 0',
    'border-left: 6px solid transparent',
    'border-right: 6px solid transparent',
    'border-top: 6px solid #1A1208'
  ].join(';');
  tooltip.appendChild(tooltipArrow);

  var tooltipText = document.createElement('p');
  tooltipText.style.cssText = 'margin: 0 0 0.4rem; color: rgba(245,237,216,0.85);';
  tooltip.appendChild(tooltipText);

  var tooltipLink = document.createElement('a');
  tooltipLink.style.cssText = 'color: #E8A020; font-weight: 600; font-size: 0.78rem; text-decoration: none; pointer-events: auto;';
  tooltipLink.textContent = 'See glossary →';
  tooltip.appendChild(tooltipLink);

  document.body.appendChild(tooltip);

  var activeTarget = null;
  var hideTimer = null;

  function showTooltip(el, termData) {
    clearTimeout(hideTimer);
    activeTarget = el;
    tooltipText.textContent = termData.short;

    if (termData.anchor) {
      tooltipLink.href = getGlossaryPath() + '#' + termData.anchor;
      tooltipLink.style.display = 'inline';
    } else {
      tooltipLink.style.display = 'none';
    }

    // Position above the element
    var rect = el.getBoundingClientRect();
    var tipWidth = 280;
    var left = rect.left + rect.width / 2 - tipWidth / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tipWidth - 8));
    var top = rect.top - 8; // will adjust after render

    tooltip.style.width = tipWidth + 'px';
    tooltip.style.left = left + 'px';
    tooltip.style.top = '0px';
    tooltip.style.opacity = '1';
    tooltip.style.pointerEvents = 'auto';

    // Adjust vertically after we know the height
    requestAnimationFrame(function() {
      var tipHeight = tooltip.offsetHeight;
      var finalTop = rect.top - tipHeight - 10 + window.scrollY;
      // If tooltip would go off screen top, show below instead
      if (rect.top - tipHeight - 10 < 0) {
        finalTop = rect.bottom + 10 + window.scrollY;
        tooltipArrow.style.bottom = 'auto';
        tooltipArrow.style.top = '-6px';
        tooltipArrow.style.borderTop = 'none';
        tooltipArrow.style.borderBottom = '6px solid #1A1208';
      } else {
        tooltipArrow.style.top = 'auto';
        tooltipArrow.style.bottom = '-6px';
        tooltipArrow.style.borderBottom = 'none';
        tooltipArrow.style.borderTop = '6px solid #1A1208';
      }
      // Reposition arrow horizontally
      var arrowLeft = rect.left + rect.width / 2 - left;
      tooltipArrow.style.left = Math.max(12, Math.min(arrowLeft, tipWidth - 12)) + 'px';
      tooltipArrow.style.transform = 'none';

      tooltip.style.position = 'absolute';
      tooltip.style.top = finalTop + 'px';
    });
  }

  function hideTooltip() {
    hideTimer = setTimeout(function() {
      tooltip.style.opacity = '0';
      tooltip.style.pointerEvents = 'none';
      activeTarget = null;
    }, 150);
  }

  // Initialise terms on the page
  function init() {
    var terms = document.querySelectorAll('.glossary-term[data-term]');
    terms.forEach(function(el) {
      var termId = el.getAttribute('data-term');
      var termData = TERMS[termId];
      if (!termData) return;

      // Style the term
      el.style.cssText = [
        'cursor: help',
        'text-decoration: underline',
        'text-decoration-style: dotted',
        'text-decoration-color: #D45A1A',
        'text-underline-offset: 3px'
      ].join(';');

      var isTouching = false;

      // Desktop: hover
      el.addEventListener('mouseenter', function() {
        if (!isTouching) showTooltip(el, termData);
      });
      el.addEventListener('mouseleave', function() {
        if (!isTouching) hideTooltip();
      });

      // Mobile: tap to toggle
      el.addEventListener('touchstart', function(e) {
        isTouching = true;
        if (activeTarget === el) {
          hideTooltip();
        } else {
          e.preventDefault();
          showTooltip(el, termData);
        }
      }, { passive: false });
    });

    // Tap outside to close on mobile
    document.addEventListener('touchstart', function(e) {
      if (activeTarget && !activeTarget.contains(e.target) && !tooltip.contains(e.target)) {
        hideTooltip();
      }
    });

    // Keep tooltip open when hovering over it (desktop)
    tooltip.addEventListener('mouseenter', function() {
      clearTimeout(hideTimer);
    });
    tooltip.addEventListener('mouseleave', function() {
      hideTooltip();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
