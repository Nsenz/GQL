//Core
import React from "react";
import {observer} from 'mobx-react-lite';

//Utils
import {getColor} from './utils/badgePicker';
import {useGlobalStore} from '../store';
import { BottomMarginBox } from "./utils/bottomMarginBox";
import { InformationInput } from "./utils/informationInput";

//Components
import { Box, Avatar, Badge } from "wix-style-react";

export const AccountSettings: React.FC = observer(()=>{
    const store = useGlobalStore();
    return (
        <Box direction="vertical" width="100%">
            <Box align="center" marginBottom={4} marginTop={4}>
                <Avatar size="size90" name={store.me.username} />
                <Badge skin={getColor(store.me.role)}>{store.me.role}</Badge>
            </Box>
            <BottomMarginBox />
            <InformationInput value={store.me._id}/>
            <BottomMarginBox />
            <InformationInput value={store.me.username}/>
            <BottomMarginBox />
            <InformationInput value={store.me.password}/>
        </Box>
    );
});