import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';
import configureStore from './store';
import {
  IG_USER_HEADER_CLASS_NAME,
  APP_CONTAINER_ID
} from '../../../lib/constants';

const getInstagramProfilePageHeader = () => document.getElementsByClassName(IG_USER_HEADER_CLASS_NAME)[0];

const createDocumentElement = dom => document.createElement(dom);

const insertAfter = (newNode, referenceNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);

/**
 * createContainer
 */
const createContainer = () => {
  // create container element
  let appContainer = createDocumentElement('div');

  appContainer.id = APP_CONTAINER_ID;

  // insert container into DOM if not exists
  if (!document.getElementById(APP_CONTAINER_ID)) {
    let InstagramProfilePageHeader = getInstagramProfilePageHeader();

    insertAfter(appContainer, InstagramProfilePageHeader);
  }
};

/**
 * Bootstrap 
 */
const bootstrap = () => {
  createContainer();

  proxyStore
    .ready()
    .then(() => {
      render(
        <Provider store={proxyStore}>
          <MuiThemeProvider>
            <App update={bootstrap}/>
          </MuiThemeProvider>
        </Provider>
        , document.getElementById(APP_CONTAINER_ID));
    });
};

// onTouchTap
injectTapEventPlugin();

// prepare store
const proxyStore = configureStore();

// main entry
bootstrap();