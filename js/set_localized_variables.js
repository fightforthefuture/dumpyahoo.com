/**
 *
 * @source: https://github.com/fightforthefuture/eunetneutrality
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) Fight for the Future
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

var language  = (window.navigator.userLanguage || window.navigator.language).toLowerCase(),
    iso       = language.substr(0, 2);

window.l10n || (window.l10n = {});

// var fullPageTranslations = [
//   'es','de','hu','sv',
// ];

var overrideLocaleIndex = fullPageTranslations.indexOf(window.location.pathname.replace(/\//g, ''));
if (overrideLocaleIndex !== -1)
    iso = fullPageTranslations[overrideLocaleIndex];

switch (iso) {

    default:
      window.l10n['CODE'] = 'en';
      window.l10n['LANG'] = 'English';
      window.l10n['NEW_HEADER'] = 'Regulators are deciding the future of Europe’s Internet right now.';
      window.l10n['WIDGET_BEGINNING'] = 'We have';
      window.l10n['DAY_SINGULAR'] = 'day';
      window.l10n['DAY_PLURAL'] = 'days';
      window.l10n['HOUR_SINGULAR'] = 'hour';
      window.l10n['HOUR_PLURAL'] = 'hours';
      window.l10n['AND'] = 'and';
      window.l10n['MINUTE_SINGULAR'] = 'minute';
      window.l10n['MINUTE_PLURAL'] = 'minutes';
      window.l10n['WIDGET_ENDING'] = 'to save Europe’s Internet.';
      window.l10n['WIDGET_LINK_TEXT'] = 'Save Net Neutrality';
      
}

// if (fullPageTranslations.indexOf(iso) !== -1 && iso != 'en' && window.location.pathname == '/')
//   window.location.replace('/' + iso + window.location.search);

