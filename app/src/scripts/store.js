import {Store} from 'react-chrome-redux';
import {EXTENSION_PORT_NAME} from '../../../lib/constants';

export default function configureStore() {
  return new Store({
    portName: EXTENSION_PORT_NAME
  });
};
