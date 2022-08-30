import React from "react";
import {inject, observer} from "mobx-react";
import {GlobalProps} from "../App";

interface Props extends GlobalProps {
    children: React.ReactNode;
}

const Home: React.FC<Props> = (props: Props) => {
    const {user} = props.store!;

    return <>
        {user.name}
    </>;
}

export default inject("store")(observer(Home));
