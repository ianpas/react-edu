export function Mount(e: HTMLElement | Text, parent: HTMLElement = null): HTMLElement | Text
{
    // appendChild: the returned value is the appended child
    return parent ? parent.appendChild(e) : e;
}

export function SetAttribute(e: HTMLElement, key: string, value: string | Function)
{
    if (typeof value === "function" && key.startsWith("on"))
    {
        let event_type = key.slice(2).toLowerCase();

        // gotcha: in react, onChange is actually onInput in html
        if (event_type === "change")
        {
            event_type = "input";
        }

        const dom = e as any;
        dom.__RigidHandlers__ = dom.__RigidHandlers__ || {};
        dom.removeEventListener(event_type, dom.__RigidHandlers__[event_type]);
        dom.__RigidHandlers__[event_type] = value;
        dom.addEventListener(event_type, dom.__RigidHandlers__[event_type]);
    }
    else if (key == 'style' && typeof value == 'object')
    {
        Object.assign(e.style, value);
    }
    else if (key === "key")
    {
        (e as any).__RigidKey__ = value;
    }
    else
    {
        e[key] = value;
    }
}