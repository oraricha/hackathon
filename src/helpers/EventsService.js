import ReactGA from 'react-ga';
import ApesterBI from '../utils/ApesterBI';

const providers = ['GA', 'ApesterBI'];

if (typeof window !== 'undefined') {
  ReactGA.initialize('UA-37159059-14');
}

const eventsEmitters = {
  GA: {
    send: (type, payload) => { ReactGA.ga('send', 'event', payload); },
  },
  ApesterBI: {
    send: ApesterBI.send,
  },
};

function dispatch(type, payload) {
  providers.forEach(provider => {
    eventsEmitters[provider].send(type, payload);
  });
}

export default {
  dispatchEvent: dispatch,
};
