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

test("patch same tag with text", () =>
{
    /**
     * <div>test</div> -> <div>patched</div>
     */

    const vdom = components.render_tag;
    Render(vdom, root);

    const vdom_update = components.patched_tag;
    const patched = Patch({ dom: root.children[0], vdom: vdom_update }) as HTMLElement;

    expect(patched.outerHTML).toEqual(`<div>patched</div>`);
    expect(root.innerHTML).toEqual(`<div>patched</div>`);
});

test("patch different tag with text", () =>
{
    /**
     * <div>test</div> -> <h1>patched</h1>
     */

    const vdom = components.render_tag;
    Render(vdom, root);

    const vdom_update = components.diff_tag;
    const patched = Patch({ dom: root.children[0], vdom: vdom_update }) as HTMLElement;

    expect(patched.outerHTML).toEqual(`<h1>patched</h1>`);
    expect(root.innerHTML).toEqual(`<h1>patched</h1>`);
});

test("patch tag by text", () =>
{
    /**
     * <div>test</div> -> patched
     */

    const vdom = components.render_tag;
    Render(vdom, root);

    const patched = Patch({ dom: root.children[0], vdom: "patched" }) as HTMLElement;
    expect(root.innerHTML).toEqual(`patched`);
});

test("patch text by tag", () =>
{
    /**
     * patched -> <div>test</div>
     */

    const patched = Patch({ dom: Render("test", root), vdom: components.render_tag }) as HTMLElement;
    expect(root.innerHTML).toEqual(`<div>test</div>`);
});

test("patch with unmount", () =>
{
    /**
     *  <div>                    <div>
            <div>{"1"}</div> ->     <div>{"1"}</div>
            <div>{"2"}</div>     </div>
        </div>
     */

    const vdom = components.two_div;
    Render(vdom, root);

    const patched = Patch({ dom: root.children[0], vdom: components.one_div }) as HTMLElement;
    expect(root.innerHTML).toEqual(`<div><div>1</div></div>`);

});

test("patch null", () =>
{
    /**
     *  <div>                    <div>
            <div>{"1"}</div> ->     <NullComponent></NullComponent>
            <div>{"2"}</div>        <div>{"2"}</div>
        </div>                   </div>
     */

    const vdom = components.patch_null_before;
    Render(vdom, root);

    const patched = Patch({ dom: root.children[0], vdom: components.to_patch_null }) as HTMLElement;
    expect(root.innerHTML).toEqual(`<div><div>2</div></div>`);

});

test("patch by component", () =>
{
    /**
     *  <div>                    <div>
            <div>{"1"}</div> ->     <SimpleComponent a="1" b="2"></SimpleComponent>
            <div>{"2"}</div>        <div>{"2"}</div>
        </div>                   </div>
     */

    const vdom = components.two_div;
    Render(vdom, root);

    const patched = Patch({ dom: root.children[0], vdom: components.component_div }) as HTMLElement;
    expect(root.innerHTML).toEqual(`<div><div>1+2=3</div><div>2</div></div>`);

});


test("patch by same component", () =>
{
    /**
     * 
        <SimpleComponent a="1" b="2"></SimpleComponent> -> <SimpleComponent a="2" b="3"></SimpleComponent>
     * 
     */

    const vdom = components.simple_component;
    Render(vdom, root);

    const patched = Patch({ dom: root.children[0], vdom: components.simple_component_2 }) as HTMLElement;
    expect(root.innerHTML).toEqual(`<div>2+3=5</div>`);

});

test("patch by different component", () =>
{
    /**
     * 
        <AnotherComponent></AnotherComponent> -> <SimpleComponent a="2" b="3"></SimpleComponent>
     * 
     */

    const vdom = components.another_component;
    Render(vdom, root);

    const patched = Patch({ dom: root.children[0], vdom: components.simple_component_2 }) as HTMLElement;
    expect(root.innerHTML).toEqual(`<div>2+3=5</div>`);

});

test("patch with key", () =>
{
    const vdom = components.simple_list;
    const dom = Render(vdom, root) as any;
    const component = dom.__RigidInstance__;
    component.AddAfter();
    component.AddAfter();
    component.AddAfter();
    expect(root.innerHTML).toEqual(`<div><button>AddBefore</button><button>AddAfter</button><button>Remove</button><div>item id 1</div><div>item id 2</div><div>item id 3</div></div>`);
});