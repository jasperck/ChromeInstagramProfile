import {wrapStore} from 'react-chrome-redux';
import configureStore from './store';
import {
  INSTAGRAM_DOMAIN_URL,
  EXTENSION_PORT_NAME
} from '../../lib/constants';

const authCookies = [
  'ds_user_id',
  'sessionid',
  'csrftoken'
];
let instagramCookies = {};

// load Instagram cookies for auth
const loadCookies = () => {
  let getCookieTasks = authCookies.map(
    cookieName => new Promise(
      resolve => chrome.cookies.get(
        { url: INSTAGRAM_DOMAIN_URL, name: cookieName },
        cookie => resolve({ [cookieName]: cookie.value })
      )
    )
  );

  return Promise.all(getCookieTasks)
    .then(vals => vals.reduce((att, val) => Object.assign(att, val), {}))
    .then((cookies) => (instagramCookies = cookies));
}

// prepare store
const store = configureStore();

wrapStore(
  store,
  { portName: EXTENSION_PORT_NAME }
);

// prepare cookie
loadCookies();

// hook into web request and modify headers before sending the request
chrome.webRequest.onBeforeSendHeaders.addListener((info) => {
    let headers = info.requestHeaders;
    let shouldInjectHeaders = true;

    // don't inject headers if auth cookies are missing
    if (!(instagramCookies.ds_user_id && instagramCookies.sessionid)) {
      shouldInjectHeaders = false;
    }

    if (shouldInjectHeaders) {
      for (var i = 0; i < headers.length; i++) {
        let header = headers[i];

        // don't inject headers if it is an internal XMLHttpRequest (i.e. clicking the profile tab)
        if (header.name.toLowerCase() == 'x-requested-with') {
          shouldInjectHeaders = false;
        }
      }
    }

    if (shouldInjectHeaders) {
      for (var i = 0; i < headers.length; i++) {
        let header = headers[i];

        // 改 userAgent for i.instagram.com/api, mock as mobile
        if (header.name.toLowerCase() === 'user-agent' && shouldInjectHeaders) {
          header.value = 'Instagram 10.3.2 (iPhone7,2; iPhone OS 9_3_3; en_US; en-US; scale=2.00; 750x1334) AppleWebKit/420+';
        }

        // 注入 auth cookies
        if (header.name.toLowerCase() === 'cookie' && shouldInjectHeaders) {
          let cookies = header.value;

          cookies = `ds_user_id=${instagramCookies.ds_user_id}; sessionid=${instagramCookies.sessionid}; csrftoken=${instagramCookies.csrftoken}; ${cookies}`;

          header.value = cookies;
        }
      }
    }

    return { requestHeaders: headers };
  },
  {
    urls: [
      "*://*.instagram.com/*"
    ],
    types: ["xmlhttprequest"]
  },
  ["blocking", "requestHeaders"]
);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete" && tab.active) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, 'updated');
    });
  }
});