// access to local storage
function Storage() {
  this.useLocalStorage = (typeof(localStorage) !== 'undefined');

  this.key = function(shape, neighborhood, toggleSelf) {
    return shape + ';' + neighborhood.toString() + ';' + toggleSelf.toString();
  }

  this.set = function(shape, neighborhood, toggleSelf) {
    if (this.useLocalStorage) {
      localStorage.setItem(key(shape, neighborhood, toggleSelf), 'true');
    }
  }

  this.get = function(shape, neighborhood, toggleSelf) {
    if (this.useLocalStorage) {
      return localStorage.getItem(key(shape, neighborhood, toggleSelf));
    }
  }
}