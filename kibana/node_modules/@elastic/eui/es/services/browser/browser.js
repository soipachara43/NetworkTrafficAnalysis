// We don't normally use 'I' prefixes, this file is an exception
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
var BrowserImpl = {
  isEventSupported: function isEventSupported(name, element) {
    return "on".concat(name) in element;
  }
};
export var Browser = Object.freeze(BrowserImpl);