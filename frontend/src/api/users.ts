import { GraphQLRequest } from './graphql-request';
import { Person, Message, Dialog } from '../additional/interfaces';

const graphql = new GraphQLRequest('http://localhost:2001/', {
    'Authorization' : `${new Date().toISOString()} ${localStorage.getItem('token')}` 
});
const templateMessage = `
    sender {
        _id,
        name,
        lastname,
        avatar
    },
    receiver {
        _id,
        name,
        lastname,
        avatar
    }
    text,
    date
`;
const templateUser = `
    _id,
    email,
    password,
    name,
    lastname,
    avatar,
    gender
`

export default {
    signIn : async (meta: { email: string, password: string }): Promise<string> => (
        await graphql.query(
            `login(fieldsData : $userData)`,
            {
                userData: {
                    value: meta,
                    settings: { type: 'Login', nonNull: true }
                }
            },
            'signIn'
        )
    ),
    signUp : async (data: Partial<Person>): Promise<void> => {
        const form = new FormData();
        const request = {
            query : `
                 mutation UpdateAPI($userData : UserInput!) {
                    createUser(userData : $userData) {
                        _id
                    }
                }
            `,
            variables : {
                userData : {
                    ...data,
                    avatar : null as any
                }
            }
        };

        form.append('operations', JSON.stringify(request));
        form.append('map', JSON.stringify({ '0': ['variables.userData.avatar'] }));
        form.append('0', data['avatar']);

        await graphql.sendForm(form);
    },
    getUser : async (id?: string): Promise<Person> => (
        await graphql.query(
            `user(id : $id) {
                ${templateUser}
                dialogs {
                    url,
                    messages {
                        ${templateMessage}
                    }
                }
            }`,
            {
                id: {
                    value: id,
                    settings: { type: 'ID', nonNull: false }
                }
            },
            'getUser'
        )
    ),
    editUser : async (settingsFields: Partial<Person>): Promise<Person> => (
        await graphql.mutation(
            `editUser(userData:$userData){
                ${templateUser}
            }`,
            {
                userData: {
                    value: settingsFields,
                    settings: { type: 'UserInput', nonNull: true }
                }
            },
            'Editing'
        )
    ),
    updateDialogs : async (dialog: Dialog, message: Message): Promise<Array<Dialog>> => (
       await graphql.mutation(
            `updateDialogs(dialog : $dialog,message : $message){
                url, 
                messages {
                    ${templateMessage}
                }
            }`,
            {
                message: {
                    value: message,
                    settings: { type: 'MessageInput', nonNull: true }
                },
                dialog: {
                    value: dialog,
                    settings: { type: 'DialogInput', nonNull: true }
                }
            },
            'NewMessage'
        )
    ),
    deleteDialog : async (url: string): Promise<Array<Dialog>> => (
        await graphql.mutation(
            `deleteDialog(url : $url) {
                url, 
                messages {
                    ${templateMessage}
                }
            }`,
            {
                url: {
                    value: url,
                    settings: { type: 'ID', nonNull: true }
                }
            },
            'Deleting'
        )
    )
}