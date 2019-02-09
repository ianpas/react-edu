import { IVDomNode } from "../element/rigid-element";
import { Mount } from "./utility";

export function RenderText(vdom: IVDomNode, parent: HTMLElement = null)
{
    return Mount(document.createTextNode(vdom.toString()), parent);
}