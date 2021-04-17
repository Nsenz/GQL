//Core
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useQuery, useMutation } from '@apollo/client';

//Utils
import { useGlobalStore } from '../store';
import { subscribeMutationGQL, unsubscribeMutationGQL } from '../graphql/mutations';
import { coinsQueryGQL } from '../graphql/queries';
import { meQuery_me_watchList } from '../graphql/queries/__generated__/meQuery';
import {getRandom} from './utils/pseudoRandom';

//Components
import { Box, LinearProgressBar, Loader, Table, TableToolbar } from 'wix-style-react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';


//Columns
const columns = [
    {
        title: 'Name',
        render: (row: any) => (
            <Box>
                <Box marginRight={1}>
                    <img src={row.icon} />
                </Box>
                <Box>{row.name}</Box>
            </Box>
        ),
        width: '10%',
    },
    { title: 'Rank', render: (row: any) => row.rank, width: '5%', align: 'center' },
    { title: 'Symbol', render: (row: any) => row.symbol, width: '5%', align: 'center' },
    { title: 'Volume', render: (row: any) => row.volume24, width: '30%', align: 'center' },
    {
        title: 'Watch',
        render: (row: any) => <Star currentCoin={row} />,
        width: '5%',
        align: 'center',
    },
];

const watchlistColumns = [{
    title: 'Name',
    render: (row: any) => (
        <Box>
            <Box marginRight={1}>
                <img src={row.icon} />
            </Box>
            <Box>{row.name}</Box>
        </Box>
    ),
    width: '10%',
},
{ title: 'Rank', render: (row: any) => row.rank, width: '5%', align: 'center' },
{ title: 'Symbol', render: (row: any) => row.symbol, width: '5%', align: 'center' },
{ title: 'Volume', render: (row: any) => row.volume24, width: '30%', align: 'center' },
{
    title: 'Some indicator',
    render: (row: any) => <LinearProgressBar skin={Math.round(Math.random())==1?'success':'standard'} value={getRandom(row.rank+4, row.rank + 88)} />,
    width: '15%',
    align: 'center',
}];

//React components
const Star: React.FC<{ currentCoin: meQuery_me_watchList }> = observer(({ currentCoin }) => {
    const [subscribe, { error: subscribeError }] = useMutation(subscribeMutationGQL);
    const [unsubscribe, { error: unsubscribeError }] = useMutation(unsubscribeMutationGQL);
    const [subscribed, setSubscribed] = useState<Boolean>(false);
    const store = useGlobalStore();
    useEffect(
        () =>
            store.me.watchList.forEach((coin: meQuery_me_watchList) => {
                if (coin._id === currentCoin._id) {
                    setSubscribed(true);
                }
            }),
        [store]
    );
    return (
        <a
            onClick={async (e) => {
                e.preventDefault();
                if (subscribed) {
                    await unsubscribe({
                        variables: { coinId: currentCoin._id, userId: store.me._id },
                    });
                    if (subscribeError) {
                        return;
                    }
                } else {
                    await subscribe({
                        variables: { coinId: currentCoin._id, userId: store.me._id },
                    });
                    if (unsubscribeError) {
                        return;
                    }
                }
                setSubscribed(!subscribed);
            }}
        >
            {subscribed === true ? <AiFillStar /> : <AiOutlineStar />}
        </a>
    );
});


export const CoinTable: React.FC<{ isWatchlist: Boolean }> = observer(({ isWatchlist }) => {
    const { data, loading } = useQuery(coinsQueryGQL);
    const store = useGlobalStore();
    return (
        <Box width="100%">
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Loader size="medium" />
                </div>
            ) : (
                <>
                    {data && !isWatchlist ? (
                        <Box>
                            <Table data={data.coins} columns={columns}>
                                <Table.Content />
                            </Table>
                        </Box>
                    ) : (
                        <>
                            <Table
                                data={store.me.watchList}
                                columns={watchlistColumns}
                            >
                                {store.me.watchList.length != 0 ? (
                                    <Table.Content />
                                ) : (
                                    <TableToolbar>
                                        <TableToolbar.Title>
                                            No subscriptions yet
                                        </TableToolbar.Title>
                                    </TableToolbar>
                                )}
                            </Table>
                        </>
                    )}
                </>
            )}
        </Box>
    );
});
