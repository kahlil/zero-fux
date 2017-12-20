export class ZeroFux {
  constructor(element) {
    if (element) {
      this.dispatcher = element;
    } else {
      this.dispatcher = document.querySelector('body');
    }
  }

  // The dipatch method takes an action argument
  // of the previously defined action type.
  dispatch(action) {
	  this.dispatcher.dispatchEvent(
		  new CustomEvent(action.type, {
		    detail: action,
		    // In case you set a custom dispatcher element
		    // and want them to bubble.
		    bubbles: true,
		    // In case your custom dispatcher is in the
		    // Shadow DOM and you want them to bubble between
		    // the borders or Shadow DOM and regular DOM.
		    compose: true,
		  })
		)
  }

  // This method takes an array of action types
  // that can influence a component's state,
  // an object with reducers with the same names
	// as the action types and a reference
	// to the component on which we want to set
	// the state propery.
  setReducers(actionTypes, reducers, component) {
		actionTypes.forEach(actionType => {
			if (reducers[actionType]) {
				this.dispatcher.addEventListener(actionType, e => {
					const action = e.detail;
					component.state = reducers[actionType](component.state, action);
				});
			} else {
				throw new Error(
					`Please add a reducer for the "${actionType}" action.`
				);
			}
		});
	}
}

export const zeroFux = new ZeroFux();
