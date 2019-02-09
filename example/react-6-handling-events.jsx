// https://reactjs.org/docs/handling-events.html
const { Render, CreateElement, Component, Patch } = require("../index");

class Toggle extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        // TODO: see https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous 
        this.SetState({
            isToggleOn: !this.state.isToggleOn
        });
    }

    Render()
    {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

Render(
    <Toggle />,
    document.getElementById('root')
);