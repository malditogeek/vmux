;(function (root, factory) {

  if (typeof define === "function" && define.amd) {
    define(factory)
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory()
  } else {
    root.CryptoJS = factory()
  }

}(this, function () {
