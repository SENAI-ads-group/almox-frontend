export abstract class StepMergeService<T> {
    private _state: T;

    get state() {
        return this._state;
    }

    set state(value: T) {
        this._state = value;
    }

    constructor(initialState: T) {
        if (initialState) {
            this._state = initialState;
        }
    }
}
