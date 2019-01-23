# GPT Consent Collection
Minimal consent collection script to meet Google Ad network consent collection requirements.

## Consent collection flow
https://support.google.com/admanager/answer/9031024?hl=en&ref_topic=9007190

- Defer Ad Loading - disableInitialLoad
- Check the cookie for existing consent.
  - If consent is granted
    - enable personalisation
    - load ads
- If consent is explicitly denied
  - disable personalization
  - load ads
- If no consent signal is set
  - prompt for consent.
- When prompt is completed
  - Drop consent signal cookie
  - If consent is granted
    - enable personalisation
    - load ads
- If consent is explicitly denied
  - disable personalization
  - load ads

## Usage
Include the script tag somewhere within the page.

```html
<script src="/gpt-consent.v0.0.1.js"></script>
```

Include an overlay element with the id `consentOverlay` somewhere within the page that will be displayed to users that have not provided consent. This must include elements with the `data-consent-action="opt-in"` and `data-consent-action="opt-out"` attributes that are used to handle the users choice and close the prompt.

```html
<div id="consentOverlay" style="display:none">
  <div class="prompt">
    <h1>Can we use your data to tailor ads for you?</h1>
    <p>
      Our partners will collect data and use cookies for ad personalization and measurement. <a href="/privacy" target="_blank">Learn how</a> we and our partners collect and use data
    </p>
    <button data-consent-action="opt-in">Yes<button>
    <button data-consent-action="opt-out">No<button>
    You can change your choice at any time.
  </div>
</div>
```

Include a button (or any clickable element) to re-display the prompt somewhere on the site. Any element with the 'data-consent-action="choose"' attribute set will have the click handler attached.

```html
<div class="footer">
  <span data-consent-action="choose">Change your ad personalization choice.</span>
</div>
```
