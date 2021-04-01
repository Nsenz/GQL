import {Db, ObjectId} from 'mongodb';

export function buildCoinResolvers(dbClient: Db): any{
    return {
        Query: {
            coins: async ()=> {
                const coins: any[] = [];
                await dbClient.collection('coins').find().forEach(coin => coins.push(coin));
                return coins;
            }
        },
        Coin: {
            watchers: (coin: any) => {
                return coin.watchers.map((watcher: any) => ({ __typename: "User", _id: watcher }));
            } 
        },
        User: {
            watchList: async (user: any) => {
                const coins: any[] = [];
                await dbClient.collection('coins').find().forEach(coin => {
                    coins.push(coin);
                });
                return coins.filter((coin)=>coin.watchers.find((watcher: any)=> watcher == user._id));
            }
        },
        Mutation: {
            addCoinWatcher: async (_: any, input: any) => {
                const coin = await dbClient.collection('coins').findOne({_id: new ObjectId(input._id)});
                if(coin){
                    const watchers: any[] = coin.watchers;
                    if(!watchers.find(watcher => watcher == input.userId)){
                        watchers.push(String(input.userId));
                    }
                    await dbClient.collection('coins').updateOne({
                        _id: new ObjectId(input._id)
                    }, {
                        $set: {
                            watchers: watchers
                        }
                    });
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
                        watchers: []
                    });
                    return true;
                } catch (err){
                    return false;
                }
            }
        }
    };
}