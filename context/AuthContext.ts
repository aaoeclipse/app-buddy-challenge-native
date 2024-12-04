import createDataContext from './createDataContext';

const authReducer = (state: any, action: any): any => {
    switch (action.type) {
        default:
            return state;
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    {},
    { isSignedIn: false }
)