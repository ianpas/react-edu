// https://reactjs.org/docs/rendering-elements.html#updating-the-rendered-element
const { Render, CreateElement, Component, Patch } = require("../index");

function tick()
{
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );

    const root = document.getElementById("root");
    if (root.children[0])
    {
        Patch({ dom: root.children[0], vdom: element });
    }
    else
    {
        Render(element, root);
    }
}

setInterval(tick, 1000);