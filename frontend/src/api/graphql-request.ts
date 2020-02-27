import axios, { AxiosInstance } from 'axios';

interface Settings {
    type: string
    nonNull: boolean
}

interface Variables {
    [prop: string]: {
        value: any
        settings: Settings
    }
}

const auth = (): string => (
    `${new Date().toISOString()} ${localStorage.getItem('token')}` 
);

export class GraphQLRequest {
    protected tool: AxiosInstance

    constructor(url: string, headers: object) {
        this.tool = axios.create({
            baseURL: url,
            headers,
            transformRequest: [ function(data, headers) {
                headers['Authorization'] =  auth();
                headers.post['Content-Type'] = 'application/json';
                return JSON.stringify(data);
            }]
        });
    }

    async sendForm(form: FormData): Promise<any> {
        const { data } = await this.tool.post('graphql', form);
        return Object.entries(data.data)[0][1];
    }

    async mutation(...data: [string, Variables?, string?]): Promise<any> {
        return await this.doQuery('mutation', data)
    }
        
    async query(...data: [string, Variables?, string?]): Promise<any> {
        return await this.doQuery('query', data)
    }

    protected async doQuery(variant: string, [body, variables, name]: Array<any>): Promise<any> {
        let params: string = '';
        let values: any = {};

        if (typeof name != 'undefined' && name.trim().length > 0) {
            for (let param in variables) {
                params += `$${param}` + `: ${variables[param].settings.type}` + `${variables[param].settings.nonNull ? '!' : ''},`;
                values[param] = variables[param].value
            }
        }

        const request = {
            query: `
                ${variant} ${name ? `${name}(${params})` : ''} {
                   ${body}
                }
            `,
            variables: values
        };

        let { data } = await this.tool.post('graphql', request);
        return Object.entries(data.data)[0][1];
    }
}