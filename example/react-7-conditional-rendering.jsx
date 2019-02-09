// https://reactjs.org/docs/conditional-rendering.html

const { Render, CreateElement, Component, Patch } = require("../index");

function WarningBanner(props)
{
    if (!props.warn)
    {
        return null;
    }

    return (
        <div className="warning">
            Warning!
      </div>
    );
}

class Page extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { showWarning: true };
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick()
    {
        this.SetState({
            showWarning: !this.state.showWarning
        });
    }

    Render()
    {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

Render(
    <Page />,
    document.getElementById('root')
);