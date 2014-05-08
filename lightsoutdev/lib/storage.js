function Storage() {
  this.key = function(shape, toggleSelf, neighborhood) {
    var unescapedKey = shape + '-' + toggleSelf.toString() + '-' + neighborhood.toString();
    return unescapedKey.replace(/[^a-zA-Z0-9_-]/g, '_');
  }

  this.set = function(key) {
    try {
      localStorage.setItem(key, 'true');
    } catch(err) {
      return;
    }
  }

  this.get = function(key) {
    try {
      return localStorage.getItem(key);
    } catch(err) {
      return 'false';
    }
  }
}