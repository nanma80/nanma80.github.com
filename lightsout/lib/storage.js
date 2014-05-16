function Storage() {
  this.saveKey = 'saveGame';

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

  this.save = function(object) {
    try {
      localStorage.setItem(this.saveKey, JSON.stringify(object));
    } catch(err) {
      return;
    }
  }

  this.load = function() {
    try {
      return JSON.parse(localStorage.getItem(this.saveKey));
    } catch(err) {
      return false;
    }
  }

  this.clearRecords = function() {
    var saveGame = this.load();
    localStorage.clear();
    this.save(saveGame);
  }
}
