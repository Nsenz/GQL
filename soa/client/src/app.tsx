//Core
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

//Utils
import { GlobalStore, GlobalStoreProvider } from './store';
import { meQueryGQL } from './graphql/queries';
import { loginMutationGQL } from './graphql/mutations';
import { SECTION_KEYS } from './const';
import { meQuery } from './graphql/queries/__generated__/meQuery';

//Components
import { Box } from 'wix-style-react';
import { CoinTable } from './components/coinTable';
import { WixSidebar } from './components/wixsidebar';
import { AccountSettings } from './components/account';
import { FormikForm } from './components/form';

const globalStore = new GlobalStore();

const renderSection = (toRender: SECTION_KEYS) => {
    switch (toRender) {
        case SECTION_KEYS.HOME:
            return <CoinTable isWatchlist={false} />;
        case SECTION_KEYS.WATCHLIST:
            return <CoinTable isWatchlist={true} />;
        case SECTION_KEYS.ACCOUNT_SETTINGS:
            return <AccountSettings />;
        default:
            return <div>No component</div>;
    }
};

export const App: React.FC = () => {
    const [selectedSection, setSelectionSection] = useState<SECTION_KEYS>(SECTION_KEYS.HOME);
    const [login] = useMutation(loginMutationGQL);
    const { refetch, loading, startPolling, stopPolling } = useQuery<meQuery>(meQueryGQL, {
        fetchPolicy: 'no-cache',
        notifyOnNetworkStatusChange: true,
        onCompleted(data: meQuery) {
            globalStore.me = data.me;
            setLoggedIn(true);
            startPolling(1000);
        },
        onError() {
            globalStore.me = null;
            setLoggedIn(false);
            stopPolling();
        },
    });
    const [loggedIn, setLoggedIn] = useState<Boolean>(false);
    return (
        <GlobalStoreProvider store={globalStore}>
            <Box>
                {loading && !loggedIn ? (
                    <></>
                ) : (
                    <>
                        {loggedIn ? (
                            <>
                                <WixSidebar
                                    selectedSection={selectedSection}
                                    setSelectedSection={setSelectionSection}
                                    login={setLoggedIn}
                                />
                                {renderSection(selectedSection)}
                            </>
                        ) : (
                            <div style={{display: 'flex', justifyContent: 'center', width: '100%', 
                            alignItems: 'center', height:'100vh'}}>
                                <FormikForm handler={login} refetch={refetch} startPolling={startPolling} />
                            </div>
                        )}
                    </>
                )}
            </Box>
        </GlobalStoreProvider>
    );
};
