declare module Triarc.Utils {
    interface ITlIntelligentDebouncer {
        getDebouncer(promiseFactory: () => angular.IPromise<void>, initialLoad?: boolean, initialMs?: number, debounceMs?: number): {
            debounce(): void;
        };
    }
}
