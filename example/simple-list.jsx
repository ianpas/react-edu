const { Render, CreateElement, Component, Patch } = require("../index");


class List extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = { items: [] };
        this.count = 0;
    }

    AddAfter()
    {
        ++this.count;
        this.SetState({ items: [...this.state.items, { id: this.count, text: `item id ${this.count}` }] });
    }

    AddBefore()
    {
        ++this.count;
        this.SetState({ items: [{ id: this.count, text: `item id ${this.count}` }, ...this.state.items] });
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
                {this.state.items.map(item => (
                    <div key={item.id}>
                        <div>{item.text}</div>
                        <input></input>
                    </div>
                ))}
            </div>
        );
    }
}

Render(
    <List />,
    document.getElementById("root")
);