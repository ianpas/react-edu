export interface IProps
{
    [index: string]: any
}

export type IChildren = Array<IRigidElement | string | number>

export interface IRigidElement
{
    type: string | Function,
    props: IProps,
    children: IChildren
}

export type IVDomNode = IRigidElement | string | number

// the trick is that type is not string for component!
// during runtime, type can be string or function, and another trick is that typeof class def is function as well
// type annotation works only in compile time, and only for compiler
export function CreateElement(type: string | Function, props: IProps, ...children: IChildren)
{
    return { type, props: props || {}, children: children || [] };
}
