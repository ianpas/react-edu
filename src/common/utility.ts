import { IVDomNode } from "../element/rigid-element";
import { Component } from "../component/component";

export type IVDomType = "text" | "tag" | "component" | "null";
export type IDomType = "text" | "tag";
export type IComponentType = "function" | "class";

export function DomType(dom: HTMLElement | ChildNode): IDomType
{
    if (dom instanceof Text)
    {
        return "text";
    }
    else
    {
        return "tag";
    }
}

export function VDomType(vdom: IVDomNode): IVDomType
{
    if (!vdom)
    {
        return "null";
    }

    if (typeof vdom === "string" || typeof vdom === "number")
    {
        return "text";
    }
    // note: typeof type, instead of simple typeof
    // "string" implies that this node is a tag such as div, ul, etc... 
    // instead of simple text node
    else if (typeof vdom === "object" && typeof vdom.type === "string")
    {
        return "tag";
    }
    else if (typeof vdom === "object" && typeof vdom.type == "function")
    {
        return "component";
    }

    throw `unknown vdom type! vdom: ${JSON.stringify(vdom, null, 4)}`;
}

export function ComponenType(constructor: Function): IComponentType
{
    if (Component.isPrototypeOf(constructor))
    {
        return "class";
    }
    else
    {
        return "function";
    }
}

function OnFlat(array: any)
{
    return array.reduce((prev, curr) => Array.isArray(curr) ? prev.concat(OnFlat(curr)) : prev.concat(curr), []);
}

export function Flat(array: any)
{
    return OnFlat([...array]).filter(e => e !== null);
}