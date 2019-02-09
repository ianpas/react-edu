import { IVDomNode, IRigidElement } from "../element/rigid-element";
import { Render } from "../renderer/dom-renderer";
import { Patch } from "./patcher";
import { SetAttribute } from "../renderer/utility";
import { Flat } from "../common/utility";

export function PatchSameTag({ dom, vdom }: { dom: HTMLElement | ChildNode, vdom: IRigidElement })
{
    const pool = new Map<string, ChildNode>();
    const active_element = document.activeElement;

    Flat(dom.childNodes).forEach((child, index) =>
    {
        const key = child.__RigidKey__ || `__index__${index}`;
        pool.set(key, child);
    });

    Flat(vdom.children).forEach((child, index) =>
    {
        // crux: 3 cases: vdom amount < = > dom amount
        const key = (child.props && child.props.key) || `__index__${index}`;

        // TODO: how to insert patched into correct position?
        const patched = pool.get(key) ? Patch({ dom: pool.get(key), vdom: child }) : Render(child);
        patched && dom.appendChild(patched);
        pool.delete(key);
    });

    // vdom amount less than dom amount
    // unmount these redundant dom element
    pool.forEach(child =>
    {
        const instance = (child as any).__RigidInstance__;
        instance && instance.ComponentWillUnmount();
        child.remove();
    });

    for (const attr of (dom as any).attributes)
    {
        (dom as any).removeAttribute(attr.name);
    }

    for (const prop in vdom.props)
    {
        SetAttribute(dom as HTMLElement, prop, vdom.props[prop]);
    }

    (active_element as any).focus();

    return dom;
}