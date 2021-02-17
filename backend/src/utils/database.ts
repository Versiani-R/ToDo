import { MongoClient, Db, ClientSession } from 'mongodb';

/* Interfaces */
import IDatabaseCollections from '../interfaces/DatabaseCollections';
import IUser from '../interfaces/User';
import ITodo from '../interfaces/ToDo';
import IUpdateToDo from '../interfaces/UpdateToDo';
import IDeleteToDo from '../interfaces/DeleteToDo';


class Database {
    client: MongoClient;
    database: Db;
    collections: IDatabaseCollections;

    constructor() {
        this.client = new MongoClient(process.env.DATABASE_URI, { useUnifiedTopology: true, useNewUrlParser: true });
        this.controller();
    }

    private async controller() {
        /**
            * The .catch will only be called if there's an exception.
            * Note that the "Connected to the database." message has a color to it.
                * It doesn't affect the code, only displays the message in green.
        **/
        await this.connect().catch((e) => console.log('\x1b[31m%s\x1b[0m', 'Error while trying to connect to the database.\n' + e));
        console.log('\x1b[32m%s\x1b[0m', 'Connected to the database.');

        /**
            * The database will be responsible for every collection.
            * The collections will then be responsible for every amount of data in the collection itself.
            * A collection containing multiple registered users will only be responsible for the registered users.
        **/
        this.database = this.client.db(process.env.DATABASE_NAME);

        this.collections = {
            /**
                * RegisteredUsers will be the collection containing all users of the website.
                * If a user is registered on the website it will be inside this collection.
                * If a user registers on the website it will be added on this collection.
            **/
            registeredUsers: this.database.collection(process.env.REGISTERED_USERS_NAME),

            /**
                * ToDos will be the collection containing all tasks of the website.
                * It will identify it's owner by the id of the user.
                * It will contain only the title of the todo and it's deadline.
            **/
            toDos: this.database.collection('toDos')
        }
    }

    private connect = async () => this.client.isConnected() ? console.log('Already Connected!') : await this.client.connect();

    /* Returns the user being guided by the email, returns null if not found. */
    isEmailAlreadyRegistered = async (email: string) => await this.collections.registeredUsers.findOne({ email });

    /* Will insert the user already passing the sessionId, and for so, already logging the user in. */
    insertUser = async ({ email, password, sessionId }: IUser) => await this.collections.registeredUsers.insertOne({ email, password, sessionId });

    /* Used on the login.ts file being responsible for updating and adding the sessionId being guided by the email. */
    addSession = async (email: string, sessionId: string) => await this.collections.registeredUsers.updateOne({ email }, { $set: { sessionId } });

    /* It will return the entire user object ( email, password and sessionId ) being guided by the sessionId. ( or null if not found ) */
    getUserBySessionId = async (sessionId: string) => await this.collections.registeredUsers.findOne({ sessionId });

    /* Returns all the toDos of the user. The toDos are organized with the email being the "owner" of the toDo. */
    getToDosByEmail = (email: string) => this.collections.toDos.find({ email });

    /* A business rule is that the same title cannot be used twice. */
    isToDoTitleAlreadyBeingUsed = async (title: string) => await this.collections.toDos.findOne({ title });

    /* Insert a to do adding the user's email as a future guidance. */
    insertToDo = async ({ email, title, deadline }: ITodo) => this.collections.toDos.updateOne({ email, title }, { $set: { title, deadline }}, { upsert: true });

    /* Insert a to do adding the user's email as a future guidance. */
    updateToDoByTitle = async ({ email, title, newTitle, newDeadline }: IUpdateToDo) => await this.collections.toDos.updateOne({ email, title }, { $set: { title: newTitle, deadline: newDeadline }});

    /* Remove a to do being guided by it's title. Only possible because of business rule. */
    removeToDoByTitle = async ({ email, title }: IDeleteToDo) => await this.collections.toDos.deleteOne({ email, title });
}

export default Database;