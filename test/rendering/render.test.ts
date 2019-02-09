/**
 * @jest-environment jsdom
 */

import { Render } from "../../src/renderer/dom-renderer";
import { components } from "../common/component/component";

let body: HTMLElement = null;
let root: HTMLElement = null;

beforeEach(() =>
{
    document.body.innerHTML = `<div id="root"></div>`;
    body = document.body;
    root = body.children[0] as HTMLElement;
});

test("render null", () =>
{
    const vdom = components.null_component;
    const dom = Render(vdom, root) as HTMLElement;
    expect(root.outerHTML).toEqual(`<div id="root"></div>`);
});

test("render text", () =>
{
    const vdom = "test";
    const dom = Render(vdom, root) as HTMLElement;
    expect(root.outerHTML).toEqual(`<div id="root">test</div>`);
});
test("render tag", () =>
{
    const vdom = components.render_tag;
    const dom = Render(vdom, root) as HTMLElement;
    expect(dom.outerHTML).toEqual(`<div>test</div>`);
    expect(root.outerHTML).toEqual(`<div id="root"><div>test</div></div>`);
});

test("render attributes, className", () =>
{
    const vdom = components.render_attributes;
    Render(vdom, root);
    expect(root.innerHTML).toEqual(`<ul class="some-list"><li class="some-list__item">One</li><li class="some-list__item">Two</li><li class="some-list__item">Three</li></ul>`);
});

test("render simple function component", () =>
{
    const vdom = components.simple_function_component;
    Render(vdom, root);
    expect(root.innerHTML).toEqual(`<h1>Hello, react</h1>`);
});

test("render simple component", () =>
{
    const vdom = components.simple_component;
    Render(vdom, root);
    expect(root.innerHTML).toEqual(`<div>1+2=3</div>`);
});

test("render nested component", () =>
{
    const vdom = components.nested_component;
    Render(vdom, root);
    expect(root.innerHTML).toEqual(`<div><h1>Hello, react</h1><div>hello again</div><div>2+3=5</div></div>`);
});