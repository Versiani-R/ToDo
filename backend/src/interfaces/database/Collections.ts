import { Collection } from 'mongodb';

export default interface ICollections {
    registeredUsers: Collection;
    toDos: Collection;
}