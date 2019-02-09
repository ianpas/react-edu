// https://reactjs.org/docs/reconciliation.html
// https://reactjs.org/docs/lists-and-keys.html

const { Render, CreateElement, Component, Patch } = require("../index");

const ToDo = props => (
    <tr>
        <td>
            <label>{props.id}</label>
        </td>
        <td>
            <input />
        </td>
        <td>
            <label>{props.createdAt.toTimeString()}</label>
        </td>
    </tr>
);

class ToDoList extends Component
{
    constructor()
    {
        super();
        const date = new Date();
        const toDoCounter = 1;
        this.state = {
            list: [
                {
                    id: toDoCounter,
                    createdAt: date,
                },
            ],
            toDoCounter: toDoCounter,
        };
    }

    sortByEarliest()
    {
        const sortedList = this.state.list.sort((a, b) =>
        {
            return a.createdAt - b.createdAt;
        });
        this.SetState({
            list: [...sortedList],
        });
    }

    sortByLatest()
    {
        const sortedList = this.state.list.sort((a, b) =>
        {
            return b.createdAt - a.createdAt;
        });
        this.SetState({
            list: [...sortedList],
        });
    }

    addToEnd()
    {
        const date = new Date();
        const nextId = this.state.toDoCounter + 1;
        const newList = [
            ...this.state.list,
            { id: nextId, createdAt: date },
        ];
        this.SetState({
            list: newList,
            toDoCounter: nextId,
        });
    }

    addToStart()
    {
        const date = new Date();
        const nextId = this.state.toDoCounter + 1;
        const newList = [
            { id: nextId, createdAt: date },
            ...this.state.list,
        ];
        this.SetState({
            list: newList,
            toDoCounter: nextId,
        });
    }

    Render()
    {
        return (
            <div>
                <code>key=id</code>
                <br />
                <button onClick={this.addToStart.bind(this)}>
                    Add New to Start
          </button>
                <button onClick={this.addToEnd.bind(this)}>
                    Add New to End
          </button>
                <button onClick={this.sortByEarliest.bind(this)}>
                    Sort by Earliest
          </button>
                <button onClick={this.sortByLatest.bind(this)}>
                    Sort by Latest
          </button>
                <table>
                    <tr>
                        <th>ID</th>
                        <th />
                        <th>created at</th>
                    </tr>
                    {this.state.list.map((todo, index) => (
                        <ToDo key={todo.id} id={todo.id} createdAt={todo.createdAt} />
                    ))}
                </table>
            </div>
        );
    }
}

Render(
    <ToDoList />,
    document.getElementById('root')
);
