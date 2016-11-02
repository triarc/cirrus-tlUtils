var Triarc;
(function (Triarc) {
    var Utils;
    (function (Utils) {
        Utils.mod = angular.module("tlUtils", []);
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));
var Triarc;
(function (Triarc) {
    var Utils;
    (function (Utils) {
        Utils.mod.directive('includeReplace', function () {
            return {
                require: 'ngInclude',
                restrict: 'A',
                link: function (scope, el, attrs) {
                    el.replaceWith(el.children());
                }
            };
        });
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));
var Triarc;
(function (Triarc) {
    var Utils;
    (function (Utils) {
        Utils.mod.directive('tlBackButton', function () {
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
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));
var Triarc;
(function (Triarc) {
    var Utils;
    (function (Utils) {
        Utils.mod.filter('tlDecimalPlaces', function ($filter) { return function (input, places) {
            if (isNaN(input))
                return input;
            var decimalPlaces = angular.isNumber(places) ? places : 2;
            return parseFloat((input * 100 / 100)).toFixed(decimalPlaces);
        }; });
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));
var Triarc;
(function (Triarc) {
    var Utils;
    (function (Utils) {
        Utils.mod.directive('tlFullHeight', ['$window', function ($window) {
                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        element.css('overflow-y', 'auto');
                        var update = function () {
                            var margins = scope.$eval(attrs.tlFullHeight);
                            var margin = 0;
                            if (angular.isNumber(margins)) {
                                margin = margins;
                            }
                            $(element).css('height', $window.innerHeight - element.offset().top - margin);
                        };
                        scope.$watch(function () { return element.offset().top; }, function (val) {
                            update();
                        });
                        scope.$watch(attrs.tlFullHeight, function () {
                            update();
                        });
                        angular.element($window).bind('resize', function () {
                            update();
                        });
                    }
                };
            }]);
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));
var Triarc;
(function (Triarc) {
    var Utils;
    (function (Utils) {
        Utils.mod.directive('tlHasScrollContent', function () {
            return {
                restrict: 'A',
                scope: {
                    tlHasScrollContent: '='
                },
                link: function (scope, element, attrs) {
                    var child;
                    scope.checkHeight = function () {
                        if (!child) {
                            child = element.first().children("div").first();
                        }
                        if (!child)
                            return;
                        if (child.height() > element.first().height()) {
                            if (!scope.tlHasScrollContent) {
                                scope.tlHasScrollContent = true;
                            }
                        }
                        else {
                            if (scope.tlHasScrollContent) {
                                scope.tlHasScrollContent = false;
                            }
                        }
                    };
                    element.bind('DOMNodeInserted', function () {
                        scope.checkHeight();
                    });
                    element.bind('DOMNodeRemoved', function () {
                        scope.checkHeight();
                    });
                }
            };
        });
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));
var Triarc;
(function (Triarc) {
    var Utils;
    (function (Utils) {
        Utils.mod.service("tlIntelligentDebouncer", [
            "$rootScope", "tlIntelligentDebouncer.config", function ($rootScope, globalConfig) {
                function timeout(callback, timeoutMs) {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve(callback());
                        }, timeoutMs);
                    });
                }
                return {
                    getDebouncer: function (promiseFactory, config) {
                        if (!config) {
                            var initialLoad = Triarc.hasValue(config.initialLoad) ? config.initialLoad : true;
                            var initialMs_1 = Triarc.hasValue(config.initialMs) ? config.initialMs : globalConfig.initialDebounce;
                            var debounceMs_1 = Triarc.hasValue(config.debounceMs) ? config.debounceMs : globalConfig.debounceInterval;
                            var promise_1;
                            var debounceNeeded_1 = false;
                            var check_1 = function () {
                                if (debounceNeeded_1) {
                                    promise_1 = promise_1
                                        .then(function () { return promiseFactory(); })
                                        .then(function () { return timeout(function () { return check_1(); }, debounceMs_1); });
                                }
                                else {
                                    promise_1 = undefined;
                                }
                                debounceNeeded_1 = false;
                            };
                            var debounce = function () {
                                debounceNeeded_1 = true;
                                if (Triarc.hasNoValue(promise_1)) {
                                    promise_1 = timeout(function () { return check_1(); }, initialMs_1);
                                }
                            };
                            if (initialLoad)
                                debounce();
                            return {
                                debounce: debounce
                            };
                        }
                    }
                };
            }
        ]);
        Utils.mod.constant("tlIntelligentDebouncer.config", {
            initialDebounce: 1000,
            debounceInterval: 15000
        });
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));
var Triarc;
(function (Triarc) {
    var Utils;
    (function (Utils) {
        Utils.mod.filter('tlSplit', function () {
            return function (input, splitChar, splitIndex) {
                if (Triarc.hasValue(splitIndex)) {
                    return input.split(splitChar)[splitIndex];
                }
                input.split(splitChar);
            };
        });
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));
var Triarc;
(function (Triarc) {
    var Utils;
    (function (Utils) {
        Utils.mod.directive('tlWhenScrolled', function () { return function (scope, elm, attr) {
            var raw = elm[0];
            var scrollLimitFactor = 10;
            var maybePromise = null;
            var isRegistered = false;
            if (Triarc.hasValue(attr.tlScrollLimit)) {
                var parsed = parseInt(attr.tlScrollLimit);
                if (!isNaN(parsed))
                    scrollLimitFactor = parsed;
            }
            var handleScroll = function () {
                if ((raw.scrollTop + raw.offsetHeight + scrollLimitFactor) >= raw.scrollHeight) {
                    if (maybePromise == null) {
                        // if the scroll is bound to a promise then wait for the promise before trying to 
                        // fire it off again
                        // console.log("1. blocking promise");
                        maybePromise = scope.$apply(attr.tlWhenScrolled);
                        if (maybePromise != null) {
                            // console.log("2. promise is undefined");
                            maybePromise.finally(function () {
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
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));
var Triarc;
(function (Triarc) {
    var Utils;
    (function (Utils) {
        Utils.mod.directive('tlWhenScrolledTop', function () { return function (scope, elm, attr) {
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
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));

