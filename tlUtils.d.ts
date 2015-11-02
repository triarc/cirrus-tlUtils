declare module Triarc.Utils {
    interface ITlIntelligentDebouncer {
        getDebouncer(promiseFactory: () => angular.IPromise<void>, initial?: boolean): {
            debounce(): void;
        };
    }
}
