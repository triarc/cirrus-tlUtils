declare module Triarc.Utils {
    interface IHasScrollContentScope extends angular.IScope {
        tlHasScrollContent: boolean;
        checkHeight(): void;
    }
    interface ITlIntelligentDebouncer {
        getDebouncer(promiseFactory: () => angular.IPromise<void>, initialLoad?: boolean, initialMs?: number, debounceMs?: number): {
            debounce(): void;
        };
    }
}
