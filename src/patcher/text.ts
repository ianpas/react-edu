import { IVDomNode } from "../element/rigid-element";
import { Render } from "../renderer/dom-renderer";
import { Replace } from "./utility";

export function PatchText({ dom, vdom }: { dom: HTMLElement | ChildNode, vdom: IVDomNode })
{
    if (dom.textContent !== vdom.toString())
    {
        return Replace({ old_child: dom, new_child: Render(vdom) });
    }
    else
    {
        return dom;
    }
}