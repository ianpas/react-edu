import { IVDomNode } from "../element/rigid-element";
import { VDomType } from "../common/utility";
import { RenderText } from "./text";
import { RenderTag } from "./tag";
import { RenderComponent } from "./component";
import { RenderNull } from "./null";


const RenderingTable: { [key: string]: Function } =
{
    "text": RenderText,
    "tag": RenderTag,
    "component": RenderComponent,
    "null": RenderNull
}

// render vdom node and return its' corresponding dom
export function Render(vdom: IVDomNode, parent: HTMLElement = null): HTMLElement | Text
{
    const type = VDomType(vdom);

    if (type)
    {
        return RenderingTable[type](vdom, parent);
    }
    else
    {
        throw `invalid node: ${JSON.stringify(vdom, null, 4)} found!`;
    }
}