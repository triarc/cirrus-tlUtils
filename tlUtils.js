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
            var scrollLimitFactor = 10;
            var isRegistered = false;
            if (Triarc.hasValue(attr.tlScrollLimit)) {
                var parsed = parseInt(attr.tlScrollLimit);
                if (!isNaN(parsed))
                    scrollLimitFactor = parsed;
            }
            var handleScroll = function () {
                var maybePromise = null;
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
            };
            var unregister = function () {
                elm.unbind('scroll', handleScroll);
                isRegistered = false;
            };
            var register = function () {
                if (!isRegistered) {
                    elm.bind('scroll', handleScroll);
                    isRegistered = true;
                }
            };
            if (angular.isString(attr.tlScrollEnabled)) {
                scope.$watch(attr.tlScrollEnabled, function (newValue) {
                    if (newValue === false) {
                        unregister();
                    }
                    else {
                        register();
                    }
                });
            }
            register();
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
        mod.service("tlIntelligentDebouncer", [
            "$timeout", "tlIntelligentDebouncer.config", function ($timeout, config) {
                return {
                    getDebouncer: function (promiseFactory, initialLoad, initialMs, debounceMs) {
                        if (initialLoad === void 0) { initialLoad = true; }
                        initialMs = Triarc.hasValue(initialMs) ? initialMs : config.initialDebounce;
                        debounceMs = Triarc.hasValue(debounceMs) ? debounceMs : config.debounceInterval;
                        var promise;
                        var debounceNeeded = false;
                        var check = function () {
                            if (debounceNeeded) {
                                promise = promise
                                    .then(function () { return promiseFactory(); })
                                    .then(function () { return $timeout(function () { return check(); }, debounceMs); });
                            }
                            else {
                                promise = undefined;
                            }
                            debounceNeeded = false;
                        };
                        var debounce = function () {
                            debounceNeeded = true;
                            if (Triarc.hasNoValue(promise)) {
                                promise = $timeout(function () { return check(); }, initialMs);
                            }
                        };
                        if (initialLoad)
                            debounce();
                        return {
                            debounce: debounce
                        };
                    }
                };
            }
        ]);
        mod.constant("tlIntelligentDebouncer.config", {
            initialDebounce: 1000,
            debounceInterval: 15000
        });
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));

