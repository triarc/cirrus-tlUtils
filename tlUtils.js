var Triarc;
(function (Triarc) {
    var Utils;
    (function (Utils) {
        var mod = angular.module("tlUtils", []);
        mod.directive('tlBackButton', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.addClass("back-button");
                    element.bind('click', function () {
                        window.history.back();
                    });
                }
            };
        });
        mod.directive('tlWhenScrolled', function () { return function (scope, elm, attr) {
            var raw = elm[0];
            var scrollLimitFactor = Triarc.hasValue(attr.tlScrollLimit) ? attr.tlScrollLimit : 10;
            var maybePromise = null;
            elm.bind('scroll', function () {
                if ((raw.scrollTop + raw.offsetHeight + scrollLimitFactor) >= raw.scrollHeight) {
                    if (maybePromise == null) {
                        // if the scroll is bound to a promise then wait for the promise before trying to 
                        // fire it off again
                        // console.log("1. blocking promise");
                        maybePromise = scope.$apply(attr.tlWhenScrolled);
                        if (maybePromise != null) {
                            // console.log("2. promise is undefined");
                            maybePromise.then(function () {
                                maybePromise = null;
                                // console.log("3. promise has returned");
                            });
                        }
                    }
                }
            });
        }; });
        mod.directive('tlWhenScrolledTop', function () { return function (scope, elm, attr) {
            var raw = elm[0];
            var scrollLimitFactor = Triarc.hasValue(attr.tlScrollTopLimit) ? attr.tlScrollTopLimit : 10;
            var previousScrollTop = raw.scrollTop;
            var maybePromise = null;
            elm.bind('scroll', function () {
                if (raw.scrollTop <= scrollLimitFactor && raw.scrollTop < previousScrollTop) {
                    if (maybePromise == null) {
                        // if the scroll is bound to a promise then wait for the promise before trying to 
                        // fire it off again
                        // console.log("1. blocking promise");
                        maybePromise = scope.$apply(attr.tlWhenScrolledTop);
                        elm.scrollTop(raw.scrollTop + 1);
                        if (maybePromise != null) {
                            // console.log("2. promise is undefined");
                            maybePromise.then(function () {
                                maybePromise = null;
                                // console.log("3. promise has returned");
                            });
                        }
                    }
                }
                previousScrollTop = raw.scrollTop;
            });
        }; });
        mod.filter('tlSplit', function () {
            return function (input, splitChar, splitIndex) {
                if (Triarc.hasValue(splitIndex)) {
                    return input.split(splitChar)[splitIndex];
                }
                input.split(splitChar);
            };
        });
        mod.directive('includeReplace', function () {
            return {
                require: 'ngInclude',
                restrict: 'A',
                link: function (scope, el, attrs) {
                    el.replaceWith(el.children());
                }
            };
        });
        mod.filter('tlDecimalPlaces', function ($filter) { return function (input, places) {
            if (isNaN(input))
                return input;
            var decimalPlaces = angular.isNumber(places) ? places : 2;
            return parseFloat((input * 100 / 100)).toFixed(decimalPlaces);
        }; });
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));

