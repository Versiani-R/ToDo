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
    updateToDoByTitle = async ({ email, title, newTitle, newDeadline }: IUpdateToDo) => await this.collections.toDos.updateOne({ email, title }, { $set: { title: newTitle, deadline: newDeadline }});
    
    /* Remove a to do being guided by it's title. Only possible because of business rule. */
    removeToDoByTitle = async ({ email, title }: IDeleteToDo) => await this.collections.toDos.deleteOne({ email, title });
    
    /* Insert a to do adding the user's email as a future guidance. */
    insertToDo = async ({ email, title, deadline }: ITodo) => {
        /**
            * This function used to have instead of the "updateOne" method, the "insertOne" method.
            * The problem with this approach is the race-conditions.
            
            Explanation: Imagine someone adds a To Do. The backend would receive a request from the frontend,
            it would check if the title is already being used, and if it's not, it would add the To Do.

            Problem: The check if the title is already being used only works if the To Do has already been
            added. But if the user on the front end presses the "create To Do" button 10x, it would send
            10 requests, creating 10 To Do's.
                ?Solution: Disable the button after the user clicks, only allowing one request to be made.

                Problems:
                    Problem: This would not work if the user was sending requests outside the frontend.
                    Using postmark for example.
                    Problem: Avoiding race conditions is not the frontend job.
                ?Solution: Using atomic operations. This one would take huge amounts of time to explain.
                But basically it doesn't work since nodejs is single-threaded. Again, this is a very summed
                up answer.
                    @docs
                        https://docs.mongodb.com/manual/core/write-operations-atomicity/
                        https://docs.mongodb.com/manual/tutorial/model-data-for-atomic-operations/
                        https://www.tutorialspoint.com/mongodb/mongodb_atomic_operations.htm

            Solution: Using updateOne.
            The idea is to check if there are already a todo with the title passed on the parameter.
                updateOne({ email, title })
                    Checks if someone with that email already added a to do with that title.
            If so, just update the to do with the new information.
            If no to do with that title was added by the user, create a new one.
                { upsert: true }
                    No data found to update, create a new one.
        **/
        await this.collections.toDos.updateOne({ email, title }, { $set: { title, deadline }}, { upsert: true })
    }
}

export default Database;