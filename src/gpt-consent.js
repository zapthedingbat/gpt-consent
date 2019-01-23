(function (win, doc) {
  var consent = 'consent',
    docCookie = doc.cookie,
    refresh = 'refresh',
    consentCookieName = 'gpt-'+consent+'=',
    dataConsentAction = '[data-'+consent+'-action=',
    consentOverlay = consent+'Overlay',
    setRequestNonPersonalizedAds = 'setRequestNonPersonalizedAds',
    a = 'googletag',
    b = 'cmd',
    c = win[a] = win[a] || {},
    d = c[b] = c[b] || [];
  var promptElement;

  function partialConsent(x) {
    return (docCookie.indexOf(consentCookieName + x) != -1);
  }

  function setConsentHandler(isConsent) {
    return function setConsent() {
      var d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      doc.cookie = consentCookieName + (isConsent ? 1 : 0) + ';path=/;expires=' + d.toUTCString();
      var gtPubAds = c.pubads();
      gtPubAds[setRequestNonPersonalizedAds](isConsent?0:1);
      gtPubAds[refresh]();
      promptElement.style.display = 'none';
    }
  }

  function bindElementsClick(parent, selector, handler) {
    [].slice.call(parent.querySelectorAll(selector))
      .forEach(function (element) {
        element.addEventListener('click', handler);
      });
  }

  function showConsentPrompt() {
    if (!promptElement) {
      promptElement = doc.getElementById(consentOverlay);
      if (!promptElement) {
        console.error('Element with id '+consentOverlay+' was not found.');
        return;
      }
      bindElementsClick(promptElement, dataConsentAction+'opt-in]', setConsentHandler(true));
      bindElementsClick(promptElement, dataConsentAction+'opt-out]', setConsentHandler(false));
    }
    promptElement.style.display = 'block';
  }

  bindElementsClick(doc, dataConsentAction+'choose]', showConsentPrompt);

  d.push(function () {
    var gtPubAds = c.pubads();
    gtPubAds.disableInitialLoad();
    if (!partialConsent('')) {
      showConsentPrompt();
      return;
    };
    if (!partialConsent('1')) {
      gtPubAds[setRequestNonPersonalizedAds](1);
    }
    gtPubAds[refresh]();
  });
}(window, document))
