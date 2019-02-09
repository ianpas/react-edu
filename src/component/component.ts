import { IProps, IRigidElement } from "../element/rigid-element";
import { Patch } from "../patcher/patcher";

export interface IState
{
    [index: string]: any;
}

export abstract class Component
{
    //
    protected props: IProps;
    protected state: IState;

    //
    constructor(props?: IProps)
    {
        this.props = props || {};
        this.state = null;
    }

    public abstract Render(): IRigidElement;

    public SetState(next: IState)
    {
        if (this.ShouldComponentUpdate(this.props, next))
        {
            this.ComponentWillUpdate(this.props, next);
            this.state = { ...this.state, ...next };
            Patch({ dom: (this as any).base, vdom: this.Render() });
            this.ComponentDidUpdate(this.props, next);
        }
        else
        {
            this.state = { ...this.state, ...next };
        }

    }

    public ComponentWillMount()
    {

    }

    public ComponentDidMount()
    {

    }

    public ComponentWillUnmount()
    {

    }

    public ComponentWillReceiveProps(props: IProps)
    {

    }

    public ComponentWillUpdate(next_props: IProps, next_state: IState)
    {

    }

    public ComponentDidUpdate(next_props: IProps, next_state: IState)
    {

    }

    public ShouldComponentUpdate(next_props: IProps, next_state: IState)
    {
        return true;
    }
}