import { IVDomNode, IRigidElement } from "../element/rigid-element";
import { Render } from "../renderer/dom-renderer";
import { VDomType, DomType } from "../common/utility";

export type IPatchType = "same_tag" | "text" | "tag_by_text" | "text_by_tag" | "diff_tag" | "null" | "component";

export function Replace({ old_child, new_child }: { old_child: HTMLElement | ChildNode, new_child: HTMLElement | ChildNode })
{
    const parent = old_child.parentNode;

    // replace child: return replacedNode, which is the same node as oldChild.
    parent.replaceChild(new_child, old_child);

    return new_child;
}

export function FullRender({ dom, vdom }: { dom: HTMLElement | ChildNode, vdom: IVDomNode })
{
    return Replace({ old_child: dom, new_child: Render(vdom) });
}

export function PatchType({ dom, vdom }: { dom: HTMLElement | ChildNode, vdom: IVDomNode }): IPatchType
{
    if (VDomType(vdom) === "null")
    {
        return "null";
    }
    else if (VDomType(vdom) === "component")
    {
        return "component";
    }
    else if (VDomType(vdom) === "tag" && DomType(dom) === "tag" && dom.nodeName === ((vdom as IRigidElement).type as string).toUpperCase())
    {
        return "same_tag";
    }
    else if (VDomType(vdom) === "tag" && DomType(dom) === "tag" && dom.nodeName !== ((vdom as IRigidElement).type as string).toUpperCase())
    {
        return "diff_tag";
    }
    else if (VDomType(vdom) === "text" && DomType(dom) === "text")
    {
        return "text";
    }
    else if (VDomType(vdom) === "text" && DomType(dom) === "tag")
    {
        return "tag_by_text";
    }
    else if (VDomType(vdom) === "tag" && DomType(dom) === "text")
    {
        return "text_by_tag";
    }

    throw `unknown patch type! vdom: ${JSON.stringify(vdom, null, 4)} dom:${JSON.stringify(dom, null, 4)}`;
}
