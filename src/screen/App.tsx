import React from 'react';
import {Provider} from "mobx-react";
import {RootStore} from "../stores/rootStore";
import Home from "./home/home";

export interface GlobalProps {
    store?: RootStore;
}

const App: React.FC = () => {
    return (
        <Provider store={RootStore.getInstance()}>
            <Home>
                <></>
            </Home>
        </Provider>
    );
}

export default App;
