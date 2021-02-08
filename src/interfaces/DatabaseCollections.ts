import { Collection } from 'mongodb';

export default interface IDatabaseCollections {
    registeredUsers: Collection;
    toDos: Collection;
}