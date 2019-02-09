import { CreateElement, Component } from "../../../src";

function SimpleFunctionComponent(props)
{
    return <h1>Hello, {props.name}</h1>;
}

class AnotherComponent extends Component
{
    constructor(props)
    {
        super(props);
    }

    Render()
    {
        return <div>another</div>
    }
}

class SimpleComponent extends Component
{
    constructor(props)
    {
        super(props);
    }

    Render()
    {
        return <div>{this.props.a}+{this.props.b}={parseInt(this.props.a) + parseInt(this.props.b)}</div>
    }
}

function Container(props)
{
    return (
        <div>
            <h1>Hello, {props.name}</h1>
            {props.children}
        </div>
    );
}

const nested_component = (
    <Container name="react">
        <div>hello again</div>
        <SimpleComponent a="2" b="3"></SimpleComponent>
    </Container>
);

const render_attributes = (<ul className="some-list">
    <li className="some-list__item">One</li>
    <li className="some-list__item">Two</li>
    <li className="some-list__item">Three</li>
</ul>);

const two_div = (
    <div>
        <div>{"1"}</div>
        <div>{"2"}</div>
    </div>
);

const component_div = (
    <div>
        <SimpleComponent a="1" b="2"></SimpleComponent>
        <div>{"2"}</div>
    </div>
);

const one_div = (
    <div>
        <div>{"1"}</div>
    </div>
);


function NullComponent(props)
{
    return null;
}

const patch_null_before = (
    <div>
        <div>{"1"}</div>
        <div>{"2"}</div>
    </div>
);

const to_patch_null = (
    <div>
        <NullComponent></NullComponent>
        <div>{"2"}</div>
    </div>
);

let list_item_count = 0;
class List extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = { items: [] };
    }

    AddAfter()
    {
        ++list_item_count;
        this.SetState({ items: [...this.state.items, { id: list_item_count, text: `item id ${list_item_count}` }] });
    }

    AddBefore()
    {
        ++list_item_count;
        this.SetState({ items: [{ id: list_item_count, text: `item id ${list_item_count}` }, ...this.state.items] });
    }

    RemoveItem()
    {
        const items_copy = [...this.state.items];
        items_copy.pop();

        this.SetState({ items: items_copy });
    }

    Render()
    {
        return (
            <div>
                <button onClick={this.AddBefore.bind(this)}>AddBefore</button>
                <button onClick={this.AddAfter.bind(this)}>AddAfter</button>
                <button onClick={this.RemoveItem.bind(this)}>Remove</button>
                {this.state.items.map(item => (<div key={item.id}>{item.text}</div>))}
            </div>
        );
    }
}


const scaleNames =
{
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(fahrenheit)
{
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius)
{
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert)
{
    const input = parseFloat(temperature);
    if (Number.isNaN(input))
    {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props)
{
    if (props.celsius >= 100)
    {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

class TemperatureInput extends Component
{
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e)
    {
        this.props.onTemperatureChange(e.target.value);
    }

    Render()
    {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <input value={temperature} onChange={this.handleChange} />
        );
    }
}

class Calculator extends Component
{
    constructor(props)
    {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = { temperature: '', scale: 'c' };
    }

    handleCelsiusChange(temperature)
    {
        this.SetState({ scale: 'c', temperature });
    }

    handleFahrenheitChange(temperature)
    {
        this.SetState({ scale: 'f', temperature });
    }

    Render()
    {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
            </div>
        );
    }
}

function FancyBorder(props)
{
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

function Dialog(props)
{
    return (
        <FancyBorder color="blue">
            {props.children}
        </FancyBorder>
    );
}

class SignUpDialog extends Component
{
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = { login: '' };
    }

    Render()
    {
        return (
            <Dialog title="Mars Exploration Program" message="How should we refer to you?">
                <input value={this.state.login} onChange={this.handleChange} />
                <button onClick={this.handleSignUp}> Sign Me Up! </button>
            </Dialog>
        );
    }

    handleChange(e)
    {
        this.SetState({ login: e.target.value });
    }

    handleSignUp()
    {
        alert(`Welcome aboard, ${this.state.login}!`);
    }
}

export const components =
{
    render_tag: <div>{"test"}</div>,
    patched_tag: <div>{"patched"}</div>,
    diff_tag: <h1>{"patched"}</h1>,
    null_component: <NullComponent></NullComponent>,
    patch_null_before,
    to_patch_null,
    two_div,
    component_div,
    one_div,
    render_attributes,
    simple_function_component: <SimpleFunctionComponent name="react"></SimpleFunctionComponent>,
    simple_component: <SimpleComponent a="1" b="2"></SimpleComponent>,
    simple_component_2: <SimpleComponent a="2" b="3"></SimpleComponent>,
    another_component: <AnotherComponent></AnotherComponent>,
    nested_component,
    simple_list: <List></List>,
    calculator: <Calculator></Calculator>,
    sign_up_dialog: <SignUpDialog></SignUpDialog>
}