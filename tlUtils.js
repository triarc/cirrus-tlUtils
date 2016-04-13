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
                    scope.checkHeight = function () {
                        var child = element.first().children("div").first();
                        if (child) {
                            if (child.height() > element.first().height()) {
                                scope.tlHasScrollContent = true;
                            }
                            else {
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
        var PillButtonController = (function () {
            function PillButtonController($scope) {
                var _this = this;
                this.$scope = $scope;
                this.$scope.$watch("pileDisabled()", function (value) {
                    _this.$labelClass = null;
                    _this.$textClass = null;
                });
            }
            PillButtonController.prototype.leftClicked = function ($event) {
                if (this.$scope.labelPosition() === 'right') {
                    this.$scope.textClick({ $event: $event });
                }
                if (this.$scope.labelPosition() !== 'right') {
                    this.$scope.labelClick({ $event: $event });
                }
                this.$scope.pileClick({ $event: $event });
            };
            PillButtonController.prototype.rightClicked = function ($event) {
                if (this.$scope.labelPosition() !== 'right') {
                    this.$scope.textClick({ $event: $event });
                }
                if (this.$scope.labelPosition() === 'right') {
                    this.$scope.labelClick({ $event: $event });
                }
                this.$scope.pileClick({ $event: $event });
            };
            Object.defineProperty(PillButtonController.prototype, "labelClass", {
                get: function () {
                    if (!this.$labelClass) {
                        this.$labelClass = 'btn-default';
                        if (this.$scope.labelClass()) {
                            this.$labelClass = this.$scope.labelClass();
                        }
                        if (this.$scope.pileClass()) {
                            this.$labelClass = this.$scope.pileClass();
                        }
                        if (this.$scope.pileDisabled()) {
                            this.$labelClass = 'btn-white';
                        }
                    }
                    return this.$labelClass;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PillButtonController.prototype, "textClass", {
                get: function () {
                    if (!this.$textClass) {
                        this.$textClass = 'btn-default';
                        if (this.$scope.textClass()) {
                            this.$textClass = this.$scope.textClass();
                        }
                        if (this.$scope.pileClass()) {
                            this.$textClass = this.$scope.pileClass();
                        }
                        if (this.$scope.pileDisabled()) {
                            this.$textClass = 'btn-white';
                        }
                    }
                    return this.$textClass;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PillButtonController.prototype, "textStyle", {
                get: function () {
                    if (this.$scope.pileFullWidth()) {
                        return {
                            'width': 'calc(100% - 45px)'
                        };
                    }
                    if (this.$scope.textWidth()) {
                        return {
                            'width': this.$scope.textWidth()
                        };
                    }
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            PillButtonController.controllerId = "pillButtonController";
            PillButtonController.$inject = ['$scope'];
            return PillButtonController;
        })();
        Utils.PillButtonController = PillButtonController;
        Utils.mod.controller(PillButtonController.controllerId, PillButtonController);
        Utils.mod.directive("tlPillButton", function () {
            return {
                restrict: "E",
                controller: PillButtonController.controllerId,
                controllerAs: "ctrl",
                templateUrl: "tlUtils/tlPillButton.html",
                scope: {
                    label: "&",
                    labelIcon: "&",
                    labelPosition: "&",
                    labelClick: "&",
                    labelClass: "&",
                    text: "&",
                    textClass: "&",
                    textClick: "&",
                    textWidth: "&",
                    pileDisabled: "&",
                    pileClick: "&",
                    pileClass: "&",
                    pileFullWidth: "&"
                }
            };
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

