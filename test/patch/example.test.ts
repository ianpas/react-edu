/**
 * @jest-environment jsdom
 */

import { Render } from "../../src/renderer/dom-renderer";
import { Patch } from "../../src/patcher/patcher";
import { components } from "../common/component/component";

let body: HTMLElement = null;
let root: HTMLElement = null;

beforeEach(() =>
{
    document.body.innerHTML = `<div id="root"></div>`;
    body = document.body;
    root = body.children[0] as HTMLElement;
});

test("patch input", () =>
{
    const vdom = components.calculator;
    const dom = Render(vdom, root) as any;
    const component = dom.__RigidInstance__;
    component.handleCelsiusChange(12);

    //
    const __dom = dom as HTMLElement;
    
    const celsius_input = __dom.childNodes[0] as any;
    expect(celsius_input.value).toEqual("12");

    const fahrenheit_input = __dom.childNodes[1] as any;
    expect(fahrenheit_input.value).toEqual("53.6");

});

test("flat array before rendering", () =>
{
    const vdom = components.sign_up_dialog;
    const dom = Render(vdom, root) as any;
});




