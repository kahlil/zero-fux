var ZeroFux = function ZeroFux(element) {
    if (element) {
        this.dispatcher = element;
    } else {
        this.dispatcher = document.querySelector('body');
    }
};
ZeroFux.prototype.dispatch = function dispatch (action) {
    this.dispatcher.dispatchEvent(new CustomEvent(action.type, {
        detail: action,
        bubbles: true,
        compose: true
    }));
};
ZeroFux.prototype.setReducers = function setReducers (actionTypes, reducers, component) {
        var this$1 = this;

    actionTypes.forEach(function (actionType) {
        if (reducers[actionType]) {
            this$1.dispatcher.addEventListener(actionType, function (e) {
                var action = e.detail;
                component.state = reducers[actionType](component.state, action);
                console.log(component.state);
            });
        } else {
            throw new Error(("Please add a reducer for the \"" + actionType + "\" action."));
        }
    });
};
var zeroFux = new ZeroFux();

export { ZeroFux, zeroFux };
//# sourceMappingURL=index.m.js.map
