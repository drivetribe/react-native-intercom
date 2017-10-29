'use strict';

import {
  NativeModules,
} from 'react-native';

const { IntercomWrapper } = NativeModules;

/**
 * @class IntercomClient
 */

class IntercomClient {
	static Visibility = {
		VISIBLE: 'VISIBLE',
		GONE: 'GONE',
	};

  _promiseChain;

	constructor() {
    //the first item in the chain needs to be a succesfull promise
    //so once new promises are added, they are automatically called
    this._promiseChain = Promise.resolve();
	}

	registerIdentifiedUser = (options) => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.registerIdentifiedUser(options, function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	sendTokenToIntercom = (token) => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.sendTokenToIntercom(token, function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	updateUser = (options) => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.updateUser(options, function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	registerUnidentifiedUser = () => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.registerUnidentifiedUser(function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	reset = () => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.reset(function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	logEvent = (eventName, metaData) => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.logEvent(eventName, metaData, function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	handlePushMessage = () => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.handlePushMessage(function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	displayMessenger = () => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.displayMessenger(function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	hideMessenger = () => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.hideMessenger(function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	displayMessageComposer = () => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.displayMessageComposer(function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	displayMessageComposerWithInitialMessage = (message) => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.displayMessageComposerWithInitialMessage(message, function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	displayConversationsList = () => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.displayConversationsList(function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	getUnreadConversationCount = () => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.getUnreadConversationCount(function(error, count) {
				if (error) {
					reject(error);
				} else {
					resolve(count);
				}
			});
		}));
	}

	setLauncherVisibility = (visibility: String) => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.setLauncherVisibility(visibility, function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	setInAppMessageVisibility = (visibility: String) => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.setInAppMessageVisibility(visibility, function(error) {
				if (error) {
					reject(error);
				} else {
					resolve()
				}
			});
		}));
	}

	setupAPN = (deviceToken) => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.setupAPN(deviceToken, function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

	registerForPush = () => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.registerForPush(function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

  setUserHash = (userHash) => {
    return this._pushIntercomChain(() => new Promise((resolve, reject) => {
      IntercomWrapper.setUserHash(userHash, function(error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    }));
  }

	setBottomPadding = (padding) => {
		return this._pushIntercomChain(() => new Promise((resolve, reject) => {
			IntercomWrapper.setBottomPadding(padding, function(error) {
				if (error) {
					reject(error);
				} else {
					resolve();
				}
			});
		}));
	}

  // since Intercom calls send data to the server each time, we need to make sure they are properly chained
  // as it was intended when calling the functions. It solves the following error found in logs
  // E/Intercom: You cannot update the email of an anonymous user. Please call registerIdentified user instead. The email: _____ was NOT applied
  // even though registerIdentifiedUser was called before
  _pushIntercomChain = (call) => {

    //add to the promise chain
    return this._promiseChain
      .then(call)
      .catch((err) => {
          //log the error
          console.log('Intercom React Native Error', err);
          //but do not block the rest of the chain
          Promise.resolve()
      });
  }
}

module.exports = new IntercomClient();
