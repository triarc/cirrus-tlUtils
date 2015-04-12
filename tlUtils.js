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
            elm.bind('scroll', function () {
                if ((raw.scrollTop + raw.offsetHeight + scrollLimitFactor) >= raw.scrollHeight) {
                    scope.$apply(attr.tlWhenScrolled);
                }
            });
        }; });
        mod.directive('tlWhenScrolledTop', function () { return function (scope, elm, attr) {
            var raw = elm[0];
            var scrollLimitFactor = Triarc.hasValue(attr.tlScrollTopLimit) ? attr.tlScrollTopLimit : 10;
            var previousScrollTop = raw.scrollTop;
            elm.bind('scroll', function () {
                if (raw.scrollTop <= scrollLimitFactor && raw.scrollTop < previousScrollTop) {
                    scope.$apply(attr.tlWhenScrolledTop);
                    elm.scrollTop(raw.scrollTop + 1);
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
            return parseFloat((Math.round(input * 100) / 100)).toFixed(2);
        }; });
    })(Utils = Triarc.Utils || (Triarc.Utils = {}));
})(Triarc || (Triarc = {}));

