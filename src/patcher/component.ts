import { IRigidElement } from "../element/rigid-element";
import { Patch } from "./patcher";
import { ComponenType } from "../common/utility";
import { FullRender } from "./utility";

export function PatchByComponent({ dom, vdom }: { dom: HTMLElement | ChildNode, vdom: IRigidElement })
{
    // crux: currently we want to render a component
    // however, previous dom can be:
    // 1. also rendered by a class component
    // 2. just a tag

    const props = { ...vdom.props, ...{ children: vdom.children } };
    const __constructor = vdom.type as Function;

    // dom is rendered by class component
    if ((dom as any).__RigidInstance__)
    {
        const instance = (dom as any).__RigidInstance__;

        if (instance.constructor === __constructor)
        {
            instance.ComponentWillReceiveProps(props);
            instance.props = props;

            if (instance.ShouldComponentUpdate(instance.props, instance.state))
            {
                instance.ComponentWillUpdate(instance.props, instance.state);
                const patched = Patch({ dom, vdom: instance.Render() });
                instance.ComponentDidUpdate(instance.props, instance.state);
                return patched;
            }
            else
            {
                return dom;
            }
        }
        else 
        {
            instance.ComponentWillUnmount();
            return FullRender({ dom, vdom });
        }
    }
    // dom is tag
    else if (ComponenType(__constructor) === "function")
    {
        return Patch({ dom, vdom: __constructor(props) });
    }
    else if (ComponenType(__constructor) === "class")
    {
        return FullRender({ dom, vdom });
    }
}