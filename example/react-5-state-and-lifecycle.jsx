// https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class
const { Render, CreateElement, Component, Patch } = require("../index");

class Clock extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { date: new Date() };
    }

    ComponentDidMount()
    {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    ComponentWillUnmount()
    {
        clearInterval(this.timerID);
    }

    tick()
    {
        this.SetState({
            date: new Date()
        });
    }

    Render()
    {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

Render(
    <Clock />,
    document.getElementById('root')
);