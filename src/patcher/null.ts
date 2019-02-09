import { IVDomNode } from "../element/rigid-element";

export function PatchNull({ dom }: { dom: HTMLElement | ChildNode, vdom: IVDomNode })
{
    dom.remove();
}