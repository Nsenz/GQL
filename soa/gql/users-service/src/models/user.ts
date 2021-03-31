import uuid from 'uuid';

export class User{
    private _id: string;
    private _firstName: string;
    private _lastName: string;
    private _password: string;
    private _createdAt: Date;
    private _subscribedTo: string[];
    private _subscribers: string[];

    constructor(fisrtName: string, lastName: string, password: string){
        this._id = uuid.v4();
        this._firstName = fisrtName;
        this._lastName = lastName;
        this._password = password;
        this._createdAt = new Date();
        this._subscribedTo = [];
        this._subscribers = [];
    }

    get id(){
        return this._id;
    }

    get firstName(){
        return this._firstName;
    }

    get lastName(){
        return this._lastName;
    }

    get createdAt(){
        return this._createdAt;
    }

    get password(){
        return this._password;
    }

    set firstName(firstName: string){
        this._firstName = firstName;
    }

    set lastName(lastName: string){
        this._lastName = lastName;
    }

    set password(password: string){
        this._password = password;
    }
    
    public addSubscriber(uuid: string){
        if(this._subscribers.find(u => u === uuid)) return; 
        this._subscribers.push(uuid);
    }

    public removeSubscriber(uuid: string){
        if(this._subscribers.find(u => u===uuid)){
            this._subscribers = this._subscribers.filter(u => u !== uuid);
        }
    }

    public subscribe(uuid: string){
        if(this._subscribedTo.find(u => u===uuid)) return;
        this._subscribedTo.push(uuid);
    }

    public unsubscribe(uuid: string){
        if(this._subscribedTo.find(u=>u===uuid)){
            this._subscribedTo = this._subscribedTo.filter(u => u !== uuid);
        }
    }
}



