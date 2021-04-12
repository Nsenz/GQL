import React from 'react';
import {SECTION_KEYS} from '../const';
import { Box, Sidebar, SidebarHeader, TextButton, Avatar, SidebarSectionItem, SidebarDivider } from 'wix-style-react';


interface WixSidebarProps{
    selectedSection: SECTION_KEYS;
    setSelectedSection: React.Dispatch<React.SetStateAction<SECTION_KEYS>>;
    logout: React.Dispatch<React.SetStateAction<Boolean>>;
};

export const WixSidebar: React.FC<WixSidebarProps> = ({selectedSection, setSelectedSection, logout}) => {
    return (
        <Box height="800px">
            <Sidebar skin="light">
                <Sidebar.PersistentHeader>
                    <SidebarHeader>
                        <Box align="center">
                            <TextButton size="small" weight="normal" skin="dark" onClick={()=>{
                                logout(false);
                                localStorage.clear();
                            }}>
                                Logout
                            </TextButton>
                        </Box>
                        <Box direction="vertical" align="center" marginTop={5}>
                            <Avatar size="size72" name="Owner" />
                            <Box direction="vertical" align="center" marginTop={2}>
                                <Box>Owner</Box>
                            </Box>
                        </Box>
                    </SidebarHeader>
                </Sidebar.PersistentHeader>

                <Sidebar.Item itemKey={SECTION_KEYS.HOME.toString()}>
                    <SidebarSectionItem
                        onClick={() => setSelectedSection(SECTION_KEYS.HOME)}
                        selected={SECTION_KEYS.HOME === selectedSection}
                    >
                        Home
                    </SidebarSectionItem>
                </Sidebar.Item>

                <Sidebar.Item itemKey={SECTION_KEYS.WATCHLIST.toString()}>
                    <SidebarSectionItem
                        onClick={() => setSelectedSection(SECTION_KEYS.WATCHLIST)}
                        selected={SECTION_KEYS.WATCHLIST === selectedSection}
                    >
                        Watchlist
                    </SidebarSectionItem>
                </Sidebar.Item>

                <SidebarDivider />

                <Sidebar.Item itemKey={SECTION_KEYS.ACCOUNT_SETTINGS.toString()}>
                    <SidebarSectionItem
                        onClick={() => setSelectedSection(SECTION_KEYS.ACCOUNT_SETTINGS)}
                        selected={SECTION_KEYS.ACCOUNT_SETTINGS === selectedSection}
                    >
                        Account
                    </SidebarSectionItem>
                </Sidebar.Item>

                <Sidebar.Item itemKey={SECTION_KEYS.WATCHLIST_HISTORY.toString()}>
                    <SidebarSectionItem disabled>Watchlist History</SidebarSectionItem>
                </Sidebar.Item>
            </Sidebar>
        </Box>
    );
};
