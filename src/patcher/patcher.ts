import { IVDomNode } from "../element/rigid-element";
import { PatchText } from "./text";
import { PatchSameTag } from "./same-tag";
import { FullRender, PatchType } from "./utility";
import { PatchByComponent } from "./component";
import { PatchNull } from "./null";

const PatchTable: { [key: string]: Function } =
{
    "text": PatchText,
    "same_tag": PatchSameTag,
    "tag_by_text": FullRender,
    "text_by_tag": FullRender,
    "diff_tag": FullRender,
    "component": PatchByComponent,
    "null": PatchNull
}

// patch dom with corresponding vdom and return patched
export function Patch({ vdom, dom }: { dom: HTMLElement | ChildNode, vdom: IVDomNode })
{
    const type = PatchType({ vdom, dom });

    if (type)
    {
        return PatchTable[type]({ vdom, dom });
    }
    else
    {
        throw `unknown patch type! vdom: ${JSON.stringify(vdom, null, 4)} dom:${JSON.stringify(dom, null, 4)}`;
    }
}