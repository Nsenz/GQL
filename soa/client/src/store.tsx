import React, { useContext } from 'react';
import { makeAutoObservable } from 'mobx';

import { meQuery_me } from './graphql/queries/__generated__/meQuery';

class GlobalStore {
    private _me: meQuery_me | any = null;

    constructor() {
        makeAutoObservable(this);
    }

    public set me(me: meQuery_me | any) {
        this._me = me;
    }

    public get me() {
        return this._me;
    }
}

const GlobalStoreContext = React.createContext<GlobalStore>(new GlobalStore());

const GlobalStoreProvider: React.FC<{ store: GlobalStore }> = ({ store, children }) => {
    return <GlobalStoreContext.Provider value={store}>{children}</GlobalStoreContext.Provider>;
};

const useGlobalStore = () => {
    return useContext(GlobalStoreContext);
};

export { GlobalStore, GlobalStoreProvider, useGlobalStore };
