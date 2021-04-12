import {useState} from 'react';
import { Box, Table } from "wix-style-react";
import {AiOutlineStar, AiFillStar} from 'react-icons/ai';

const data = [
    {
        name: "Bitcoin",
        rank: 1,
        symbol: 'BTC',
        icon: "https://cryptorank-images.s3.eu-central-1.amazonaws.com/coins/icon.bitcoin1524754012028.png",
        volume24h: "$19,406,552,022",
    },
    {
        name: "Etherium",
        rank: 2,
        symbol: 'ETH', 
        icon: "https://cryptorank-images.s3.eu-central-1.amazonaws.com/coins/icon.bitcoin1524754012028.png",
        volume24h: "$19,406,552,022",
    }
];

const Star: React.FC<{subscribedInit: Boolean}> = ({subscribedInit})=>{
    const [subscribed, setSubscribed] = useState<Boolean>(subscribedInit);
    return(
        <a onClick={()=>setSubscribed(!subscribed)}>
            {subscribed===true?<AiFillStar />:<AiOutlineStar />}
        </a>
    );
}

const columns = [
    {
        title: 'Name', 
        render: (row: any) => (
            <Box>
                <Box marginRight={1}>
                    <img src={row.icon}/>
                </Box>
                <Box>
                    {row.name}
                </Box>
            </Box>
        ),
        width: '10%'
    },
    { title: 'Rank', render: (row: any) => row.rank, width: '5%', align: 'center' },
    { title: 'Symbol', render: (row: any) => row.symbol, width: '5%', align: 'center'},
    { title: 'Volume', render: (row: any) => row.volume24h, width: '30%', align: 'center' },
    { title: 'Watch', render: (_: any) => <Star subscribedInit={false}/>, width: '5%', align: 'center'}
];

export const CoinTable: React.FC<{ isWatchlist: Boolean }> = ({ isWatchlist }) => {
    return (
        <Table data={data} columns={columns}>
            <Table.Content />
        </Table>
    );
};