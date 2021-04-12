import React from "react";
import { Box, Avatar, Badge, Input } from "wix-style-react";

const BottomMarginBox: React.FC = ()=>{
    return(
        <Box marginBottom={4}/>
    )
}

const InformationInput: React.FC<{value: string}> = ({value})=>{
    return(
        <div style={{marginLeft: "2rem", marginRight: "2rem"}}>
            <Input size="large" defaultValue={value} disabled={true} />
        </div>
    );
}

export const AccountSettings: React.FC = ()=>{
    return (
        <Box direction="vertical" width="100%">
            <Box align="center" marginBottom={4} marginTop={4}>
                <Avatar size="size90" name="Owner" />
                <Badge skin="standard">User</Badge>
            </Box>
            <BottomMarginBox />
            <InformationInput value="12312afsfas21515215"/>
            <BottomMarginBox />
            <InformationInput value="Owner"/>
            <BottomMarginBox />
            <InformationInput value="Password"/>
        </Box>
    );
};