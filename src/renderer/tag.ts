import { IRigidElement } from "../element/rigid-element";
import { Mount, SetAttribute } from "./utility";
import { Render } from "./dom-renderer";
import { Flat } from "../common/utility";

export function RenderTag(vdom: IRigidElement, parent: HTMLElement = null)
{
    const root = Mount(document.createElement(vdom.type as string));

    // node.children can be [e,e,[e,e,e],e]...etc
    /**
     * eg:
     *  <div>
            <h1>Hello, {props.name}</h1>
            {props.children}
        </div>
     */
    Flat(vdom.children).forEach(e => Render(e, root as HTMLElement));
    Object.entries(vdom.props).forEach(e => SetAttribute(root as HTMLElement, ...e));
    return Mount(root, parent);
}