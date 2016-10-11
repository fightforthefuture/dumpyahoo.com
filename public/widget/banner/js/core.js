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

window.addEventListener('message', function(e) {
    if (!e.data || !e.data.CD_WIDGET_MSG)
        return;

    delete e.data.CD_WIDGET_MSG;

    if (e.data.HOST_NAME)
    {
        host = e.data.HOST_NAME;
        delete e.data.HOST_NAME;
    }

    switch (e.data.requestType) {
        case 'putAnimation':
            trackLeaderboardStat({
                stat: 'display_widget',
                data: e.data.modalAnimation
            });
            animations[e.data.modalAnimation].init(e.data).start();
            break;
    }
});

var sanitize = function(str)
{
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/javascript\:/gi, 'lolscript -');
    return str;
}

var sendMessage = function(requestType, data)
{
    data || (data = {});
    data.requestType = requestType;
    data.CD_IFRAME_MSG = true;
    parent.postMessage(data, '*');
    // console.log('sending message:', requestType, data);
}

var trackLeaderboardStat = function(options)
{
    options || (options = {});
    options.stat || (options.stat = 'unknown');
    options.data || (options.data = null);
    options.callback || (options.callback = function() {});

    if (!host)
        return;

    var data = {
        campaign: 'eunetneutrality',
        stat: options.stat,
        data: options.data,
        host: host,
        session: session
    };

    // Serialize data
    var params = '';
    for (var key in data) {
        if (params.length !== 0) {
            params += '&';
        }

        params += key + '=' + data[key];
    }

    var http = new XMLHttpRequest();
    var url = 'https://fftf-host-counter.herokuapp.com/log';
    http.open('POST', url, true);

    // Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

     // Call a function when the state changes.
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            var res = JSON.parse(http.responseText);
            options.callback(res);
        }
    };

    http.send(params);
}

/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
var guid = function() {
    var _p8 = function(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

function onDOMReady() {
  if (window.location.href.indexOf('demo') === -1) {
    sendMessage('getAnimation');
  }
}

var readyState = document.readyState;
if (readyState === 'interactive' || readyState === "complete") {
    onDOMReady();
} else {
    document.addEventListener('DOMContentLoaded', onDOMReady);
}

var host = null;  // this will get populated with the domain of the widget install
var session = guid();

if (window.location.href.indexOf('demo') !== -1) {
  document.getElementById('close').style.display = 'none';
  document.getElementById('main').style.top = '0px';
}
if (window.location.href.indexOf('dark') !== -1) {
  document.body.className = 'dark';
}

var animations = {
  banner: {
    options: {},

    init: function(options) {
      this.options = options;
      return this;
    },

    start: function() {

      if (this.options.theme == 'dark')
        document.body.className = 'dark';

      if (this.options.widgetText)
        document.querySelector('h1').textContent = this.options.widgetText;

      if (this.options.buttonText)
        document.getElementById('button').textContent = this.options.buttonText;

      document.getElementById('main').addEventListener('click', this.doClick.bind(this), false);
    },

    getUrl: function() {
      return sanitize(this.options.url)+'?from=banner'+(this.options.defaultOptout ? '&optout=true' : '');
    },

    doClick: function(e) {
      e.preventDefault();

      if (e.target == document.getElementById('close'))
        return sendMessage('stop');

      window.open(animations.banner.getUrl());
      trackLeaderboardStat({
        stat: 'click',
        data: animations.banner.getUrl(),
          callback: function() {}
      });
    }
  }
}
