import { IRigidElement } from "../element/rigid-element";
import { Render } from "./dom-renderer";
import { ComponenType } from "../common/utility";

export function RenderComponent(vdom: IRigidElement, parent: HTMLElement = null)
{
    const props = { ...vdom.props, ...{ children: vdom.children } };
    const __constructor = vdom.type as Function;

    if (ComponenType(__constructor) === "class")
    {
        // TODO: change "as any" to "class that extends Component"
        const instance = new (__constructor as any)(props);
        instance.ComponentWillMount();
        instance.base = Render(instance.Render(), parent);
        instance.base.__RigidInstance__ = instance;
        instance.base.__RigidKey__ = vdom.props.key;
        instance.ComponentDidMount();
        return instance.base;
    }
    else if (ComponenType(__constructor) === "function")
    {
        // type field stores a function, which return a function that creates element with props as params
        // thus we get the element then render that element instead
        const dom = Render(__constructor(props), parent);
        if (dom)
        {
            (dom as any).__RigidKey__ = vdom.props.key;
        }
        return dom;
    }
}