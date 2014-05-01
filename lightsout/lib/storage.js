function Storage() {
  this.useLocalStorage = (typeof(localStorage) !== "undefined");
  this.fakeStorage = {}

  this.key = function(shape, toggleSelf, neighborhood) {
    return shape.replace(/ /g,"_") + '-' + toggleSelf.toString() + '-' + neighborhood.toString();
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