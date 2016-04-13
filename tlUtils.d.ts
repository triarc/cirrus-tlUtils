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
    interface ITlIntelligentDebouncer {
        getDebouncer(promiseFactory: () => angular.IPromise<void>, initialLoad?: boolean, initialMs?: number, debounceMs?: number): {
            debounce(): void;
        };
    }
}
declare module Triarc.Utils {
    interface IPillButtonControllerScope extends angular.IScope {
        label(): string;
        labelIcon(): string;
        labelClick({$event: JQueryEventObject}: {
            $event: any;
        }): void;
        labelClass(): string;
        labelPosition(): string;
        text(): string;
        textClick({$event: JQueryEventObject}: {
            $event: any;
        }): void;
        textClass(): string;
        textWidth(): number;
        pileDisabled(): boolean;
        pileClick({$event: JQueryEventObject}: {
            $event: any;
        }): void;
        pileClass(): string;
        pileFullWidth(): boolean;
    }
    class PillButtonController {
        private $scope;
        static controllerId: string;
        static $inject: string[];
        private $labelClass;
        private $textClass;
        constructor($scope: IPillButtonControllerScope);
        leftClicked($event: JQueryEventObject): void;
        rightClicked($event: JQueryEventObject): void;
        labelClass: string;
        textClass: string;
        textStyle: any;
    }
}
declare module Triarc.Utils {
}
declare module Triarc.Utils {
}
declare module Triarc.Utils {
}
