import {Db, ObjectId} from 'mongodb';

export function buildCoinResolvers(dbClient: Db): any{
    return {
        Query: {
            coins: async ()=> {
                const coins: any[] = [];
                await dbClient.collection('coins').find().forEach(coin => coins.push(coin));
                console.log(`${new Date()} : Fetching coins`);
                return coins;
            }
        },
        Coin: {
            subscribers: (coin: any) => {
                return coin.subscribers.map((subscribers: any) => ({ __typename: "User", _id: subscribers }));
            } 
        },
        User: {
            watchList: async (user: any) => {
                const coins: any[] = [];
                await dbClient.collection('coins').find().forEach(coin => {
                    coins.push(coin);
                });
                console.log(`${new Date()} : Fetching users`);
                return coins.filter((coin)=>coin.subscribers.find((subscribers: any)=> subscribers == user._id));
            }
        },
        Mutation: {
            addCoinsubscribers: async (_: any, input: any) => {
                const coin = await dbClient.collection('coins').findOne({_id: new ObjectId(input._id)});
                if(coin){
                    const subscribers: any[] = coin.subscribers;
                    if(!subscribers.find(subscribers => subscribers == input.userId)){
                        subscribers.push(String(input.userId));
                    }
                    await dbClient.collection('coins').updateOne({
                        _id: new ObjectId(input._id)
                    }, {
                        $set: {
                            subscribers: subscribers
                        }
                    });
                    console.log(`${new Date()} : Adding a new coin subscriber`);
                    return true;
                }
                return false;
            },
            addCoin: async (_:any, input: any) => {
                try{
                    await dbClient.collection('coins').insertOne({
                        name: input.coin.name,
                        rank: input.coin.rank,
                        symbol: input.coin.symbol,
                        icon: input.coin.icon||"NaN",
                        volume24: input.coin.volume24||"NaN",
                        subscribers: []
                    });
                    console.log(`${new Date()} : Adding a new coin`);
                    return true;
                } catch (err){
                    return false;
                }
            }
        }
    };
}