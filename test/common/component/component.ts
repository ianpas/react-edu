import { CreateElement, Component } from "../../../src";

function SimpleFunctionComponent(props) {
  return CreateElement("h1", null, "Hello, ", props.name);
}

class AnotherComponent extends Component {
  constructor(props) {
    super(props);
  }

  Render() {
    return CreateElement("div", null, "another");
  }

}

class SimpleComponent extends Component {
  constructor(props) {
    super(props);
  }

  Render() {
    return CreateElement("div", null, this.props.a, "+", this.props.b, "=", parseInt(this.props.a) + parseInt(this.props.b));
  }

}

function Container(props) {
  return CreateElement("div", null, CreateElement("h1", null, "Hello, ", props.name), props.children);
}

const nested_component = CreateElement(Container, {
  name: "react"
}, CreateElement("div", null, "hello again"), CreateElement(SimpleComponent, {
  a: "2",
  b: "3"
}));
const render_attributes = CreateElement("ul", {
  className: "some-list"
}, CreateElement("li", {
  className: "some-list__item"
}, "One"), CreateElement("li", {
  className: "some-list__item"
}, "Two"), CreateElement("li", {
  className: "some-list__item"
}, "Three"));
const two_div = CreateElement("div", null, CreateElement("div", null, "1"), CreateElement("div", null, "2"));
const component_div = CreateElement("div", null, CreateElement(SimpleComponent, {
  a: "1",
  b: "2"
}), CreateElement("div", null, "2"));
const one_div = CreateElement("div", null, CreateElement("div", null, "1"));

function NullComponent(props) {
  return null;
}

const patch_null_before = CreateElement("div", null, CreateElement("div", null, "1"), CreateElement("div", null, "2"));
const to_patch_null = CreateElement("div", null, CreateElement(NullComponent, null), CreateElement("div", null, "2"));
let list_item_count = 0;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  AddAfter() {
    ++list_item_count;
    this.SetState({
      items: [...this.state.items, {
        id: list_item_count,
        text: `item id ${list_item_count}`
      }]
    });
  }

  AddBefore() {
    ++list_item_count;
    this.SetState({
      items: [{
        id: list_item_count,
        text: `item id ${list_item_count}`
      }, ...this.state.items]
    });
  }

  RemoveItem() {
    const items_copy = [...this.state.items];
    items_copy.pop();
    this.SetState({
      items: items_copy
    });
  }

  Render() {
    return CreateElement("div", null, CreateElement("button", {
      onClick: this.AddBefore.bind(this)
    }, "AddBefore"), CreateElement("button", {
      onClick: this.AddAfter.bind(this)
    }, "AddAfter"), CreateElement("button", {
      onClick: this.RemoveItem.bind(this)
    }, "Remove"), this.state.items.map(item => CreateElement("div", {
      key: item.id
    }, item.text)));
  }

}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);

  if (Number.isNaN(input)) {
    return '';
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return CreateElement("p", null, "The water would boil.");
  }

  return CreateElement("p", null, "The water would not boil.");
}

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  Render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return CreateElement("input", {
      value: temperature,
      onChange: this.handleChange
    });
  }

}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {
      temperature: '',
      scale: 'c'
    };
  }

  handleCelsiusChange(temperature) {
    this.SetState({
      scale: 'c',
      temperature
    });
  }

  handleFahrenheitChange(temperature) {
    this.SetState({
      scale: 'f',
      temperature
    });
  }

  Render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return CreateElement("div", null, CreateElement(TemperatureInput, {
      scale: "c",
      temperature: celsius,
      onTemperatureChange: this.handleCelsiusChange
    }), CreateElement(TemperatureInput, {
      scale: "f",
      temperature: fahrenheit,
      onTemperatureChange: this.handleFahrenheitChange
    }));
  }

}

function FancyBorder(props) {
  return CreateElement("div", {
    className: 'FancyBorder FancyBorder-' + props.color
  }, props.children);
}

function Dialog(props) {
  return CreateElement(FancyBorder, {
    color: "blue"
  }, props.children);
}

class SignUpDialog extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      login: ''
    };
  }

  Render() {
    return CreateElement(Dialog, {
      title: "Mars Exploration Program",
      message: "How should we refer to you?"
    }, CreateElement("input", {
      value: this.state.login,
      onChange: this.handleChange
    }), CreateElement("button", {
      onClick: this.handleSignUp
    }, " Sign Me Up! "));
  }

  handleChange(e) {
    this.SetState({
      login: e.target.value
    });
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }

}

export const components = {
  render_tag: CreateElement("div", null, "test"),
  patched_tag: CreateElement("div", null, "patched"),
  diff_tag: CreateElement("h1", null, "patched"),
  null_component: CreateElement(NullComponent, null),
  patch_null_before,
  to_patch_null,
  two_div,
  component_div,
  one_div,
  render_attributes,
  simple_function_component: CreateElement(SimpleFunctionComponent, {
    name: "react"
  }),
  simple_component: CreateElement(SimpleComponent, {
    a: "1",
    b: "2"
  }),
  simple_component_2: CreateElement(SimpleComponent, {
    a: "2",
    b: "3"
  }),
  another_component: CreateElement(AnotherComponent, null),
  nested_component,
  simple_list: CreateElement(List, null),
  calculator: CreateElement(Calculator, null),
  sign_up_dialog: CreateElement(SignUpDialog, null)
};