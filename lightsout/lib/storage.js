function Storage() {
  this.useLocalStorage = (typeof(localStorage) !== "undefined");
  this.fakeStorage = {}

  this.key = function(shape, toggleSelf, neighborhood) {
    var unescapedKey = shape + '-' + toggleSelf.toString() + '-' + neighborhood.toString();
    return unescapedKey.replace(/[^a-zA-Z0-9_-]/g, '_');
  }

  this.set = function(key) {
    if (this.useLocalStorage) {
      localStorage.setItem(key, 'true');
    }
  }

  this.get = function(key) {
    if (this.useLocalStorage) {
      return localStorage.getItem(key);
    }
  }
}