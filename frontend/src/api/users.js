import {instance} from './instanseAxios';

export default {
    signIn : async (meta) => {
        let request = {
            query : `
                query signIn($userData : Login!){
                    login(fieldsData : $userData)
                }
            `,
            variables : {
                userData: meta
            }
        };
        let {data} = await instance.post('graphql',request,{
            headers : {
                'Authorization' : `${new Date().toISOString()} ${localStorage.getItem('token')}`
            }
        });
        return data.data.login;
    },
    signUp : async (data) => {
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
                    avatar : null
                }
            }
        };
        form.append('operations',JSON.stringify(request));
        form.append('map',JSON.stringify({'0' : ['variables.userData.avatar']}));
        form.append('0',data['avatar']);
        await instance.post('graphql',form);
    },
    getUser : async (id) => {
        const request = {
            query : `
                query getUser($id : ID) {
                    user(id : $id) {
                        _id,
                        email,
                        password,
                        name,
                        lastname,
                        avatar,
                        gender,
                        dialogs {
                            url,
                            messages {
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
                            }
                        }
                    }
                }
            `,
            variables : {
                id
            }
        };
  
        const response = await instance.post('graphql',request,{
            headers : {
                'Authorization' : `${new Date().toISOString()} ${localStorage.getItem('token')}`
            }
        });
        
        return response.data.data.user;
    },
    editUser : async (settingsFields) => {
        const request = {
            query : `
                mutation Editing($userData : UserInput!){
                    editUser(userData:$userData){
                        name,
                        lastname,
                        email,
                        password,
                        avatar,
                        gender
                    }
                }
            `,
            variables : {
                userData : settingsFields
            }
        };

        const {data} = await instance.post('graphql',request);
        return data.data.editUser;
    },
    updateDialogs : async (dialog,message) => {
        const request = {
            query : `
                mutation NewMessage($dialog : DialogInput!,$message: MessageInput!){
                    updateDialogs(dialog : $dialog,message : $message){
                        url, 
                        messages {
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
                            },
                            text,
                            date
                        }
                    }
                }
            `,
            variables : {
                message,
                dialog
            }
        };

        const {data} = await instance.post('graphql',request);
        return data.data.updateDialogs;
    },
    deleteDialog : async (url) => {
        const request = {
            query : `
                mutation Deleting($url : ID!) {
                    deleteDialog(url : $url) {
                        url, 
                        messages {
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
                            },
                            text,
                            date
                        }
                    }
                }
            `,
            variables : {
                url
            }
        };

        const {data} = await instance.post('graphql',request);
        return data.data.deleteDialog;
    }
}