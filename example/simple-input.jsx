const { Render, CreateElement, Component, Patch } = require("../index");

class Input extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            numberOfGuests: 2
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleChange(e)
    {
        alert("hi");
    }

    handleInputChange(event)
    {
        alert("hi");

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.SetState({
            [name]: value
        });
    }

    Render()
    {
        return (
            <div>
                <input
                    name="numberOfGuests"
                    type="number"
                    value={this.state.numberOfGuests}
                    /**
                     * gotcha: in react, onChange is actually onInput in html
                     */
                    onInput={this.handleInputChange} />
                <input onInput={this.handleChange}></input>
            </div>
        );
    }
}

Render(
    <Input />,
    document.getElementById("root")
);