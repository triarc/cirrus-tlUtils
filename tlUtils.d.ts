declare module Triarc.Utils {
    var mod: ng.IModule;
}
declare module Triarc.Utils {
}
declare module Triarc.Utils {
}
declare module Triarc.Utils {
}
declare module Triarc.Utils {
}
declare module Triarc.Utils {
    interface IHasScrollContentScope extends angular.IScope {
        tlHasScrollContent: boolean;
        checkHeight(): void;
    }
}
declare module Triarc.Utils {
    interface IDebouncerConfig {
        initialLoad?: boolean;
        initialMs?: number;
        debounceMs?: number;
    }
    interface ITlIntelligentDebouncer {
        getDebouncer(promiseFactory: Function, config?: IDebouncerConfig): {
            debounce(): void;
        };
    }
}
declare module Triarc.Utils {
}
declare module Triarc.Utils {
}
declare module Triarc.Utils {
}
