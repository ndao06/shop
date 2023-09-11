
import * as React from "react";
import { Context } from './../../routes/root';
export const ContextValue = () => {
    return <Context.Consumer>

        {({ name, file }) => <h2>{name} --- {file}</h2>}
    </Context.Consumer>
}

