import React, { useReducer } from 'react';

export default (reducer: any, action: any, defaultValue: any): {Context: any, Provider: any} => {
    const Context = React.createContext("light");
    const Provider = ({ children }: { children: any }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);
        const boundAction = {};
        for (let key in action) {
          // @ts-ignore
            boundAction[key] = action[key](dispatch);
        }
        return (
          // @ts-ignore
            <Context.Provider value={{ state, ...boundAction }}>
                {children}
            </Context.Provider>
        )
    };

    return { Context: Context, Provider: Provider}
}