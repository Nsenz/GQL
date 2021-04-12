import React, {useState} from 'react';
import {useMutation, gql, useQuery} from '@apollo/client';

import { Box } from 'wix-style-react';
import { CoinTable } from './components/coinTable';
import {WixSidebar} from './components/wixsidebar';
import {AccountSettings} from './components/account';

import {SECTION_KEYS} from './const';

const renderSection = (toRender: SECTION_KEYS) => {
    switch(toRender){
        case SECTION_KEYS.HOME:
            return <CoinTable isWatchlist={false}/>;
        case SECTION_KEYS.WATCHLIST:
            return <CoinTable isWatchlist={true} />;
        case SECTION_KEYS.ACCOUNT_SETTINGS:
            return <AccountSettings />
        default:
            return <div>No component</div>
    }
};

const loginMutation = gql`
    mutation Login($username: String!, $password: String!){
        login(username:$username,password:$password)
    }
`;

const meQuery = gql`
    query Me{
        me {
            _id
            username
            password
            watchList {
                name
                rank
            }
        }
    }
`;

export const App: React.FC = () => {
    const [selectedSection, setSelectionSection] = useState<SECTION_KEYS>(SECTION_KEYS.HOME);
    const [login, _] = useMutation(loginMutation);
    const {data, refetch} = useQuery(meQuery);
    const [loggedIn, setLoggedIn] = useState<Boolean>(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
            <Box align="center">
                {data && loggedIn ? (
                    <>
                        <WixSidebar
                            selectedSection={selectedSection}
                            setSelectedSection={setSelectionSection}
                            logout={setLoggedIn}
                        />
                        {renderSection(selectedSection)}
                    </>
                ) : (
                    <form onSubmit={async (e)=>{
                        e.preventDefault();
                        const response = await login({variables: {username, password}});
                        if(response.data.login){
                            localStorage.setItem("token", response.data.login);
                            refetch();
                            setLoggedIn(true);
                        }
                    }}>
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" name="username" onChange={(e)=>setUsername(e.target.value)}/>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
                        <button type="submit">Login</button>
                    </form>
                )}
            </Box>
    );
};
