import { GraphQLRequest } from './graphql-request';
import { Pag, Like, Product } from '../additional/interfaces';

const graphql = new GraphQLRequest('http://localhost:2001/', {
    'Authorization' : `${new Date().toISOString()} ${localStorage.getItem('token')}` 
});
const templateProduct = `
    _id,
    title,
    description,
    price,
    image,
    views,
    likes,
    category,
    creator {
        _id,
        name,
        lastname,
        avatar
    }
`;

export default {
    myProducts : async (): Promise<Array<Product>> => (
        await graphql.query(
            `createdProducts {
                ${templateProduct} 
            }`
        )
    ),
    myLikes : async (): Promise<Array<Product>> => (
         (await graphql.query(
            `likes {
                product {
                    ${templateProduct}
                }
            }`
        ))
        .map((item: Like) => ({...item.product as Product}))
    ),
    addProduct : async (productData: any): Promise<Product> => {
        const form = new FormData();
        const request = {
            query : `
                mutation AddingProduct($data : ProductInput!) {
                    createProduct(data : $data){
                        ${templateProduct}
                    }
                }
            `,
            variables : {
                data : {
                    title : productData.title as string,
                    description : productData.description as string,
                    price : +productData.price,
                    category : productData.category as string,
                    image : null as any
                }
            }
        }
    
        form.append('operations', JSON.stringify(request));
        form.append('map', JSON.stringify({ '0': ['variables.data.image'] }));
        form.append('0', productData['avatar']);
        
        return await graphql.sendForm(form);
    },
    likeProduct : async (id: string): Promise<Product> => (
        await graphql.mutation(
            `likeProduct(productId: $productId){
                _id
            }`,
            {
                productId: {
                    value: id,
                    settings: { type: 'ID', nonNull: true }
                }
            },
            'doLike'
        )
    ),
    deleteLike : async (id: string): Promise<string> => (
        await graphql.mutation(
            `deleteLike(productId : $productId)`,
            {
                productId: {
                    value: id,
                    settings: { type: 'ID', nonNull: true }
                }
            },
            'DeletingLike'
        )
    ),
    newView : async (id: string, watches: number): Promise<void> => {
        await graphql.mutation(
            `updateProduct(id : $id,values : $values){
                views
            }`,
            {
                id: {
                    value: id,
                    settings: { type: 'ID', nonNull: true }
                },
                values: {
                    value: { views : watches + 1 },
                    settings: { type: 'ProductInput', nonNull: true }
                }
            }
        )
    },
    getProductsCatalog : async (name: string, page: number, pageSize: number | any): Promise<Pag> => (
        await graphql.query(
            `productsCatalog(category: $category,page : $page,pageSize : $pageSize) {
                data {
                    ${templateProduct}
                },
                totalCount,
                page,
                pageSize
            }`,
            {
                category: {
                    value: name,
                    settings: { type: 'String', nonNull: true }
                },
                page: {
                    value: page,
                    settings: { type: 'Int', nonNull: true }
                },
                pageSize: {
                    value: pageSize,
                    settings: { type: 'Int', nonNull: false }
                }
            },
            'getProducts'
        )
    ),
    getProducts : async (page: number, pageSize: number): Promise<Pag> => (
        await graphql.query(
            `products(page : $page,pageSize : $pageSize) {
                data {
                    ${templateProduct}
                },
                totalCount,
                page,
                pageSize
            }`,
            {
                page: {
                    value: page,
                    settings: { type: 'Int', nonNull: true }
                },
                pageSize: {
                    value: pageSize,
                    settings: { type: 'Int', nonNull: false }
                }
            },
            'Pagination' 
        )
    ),
    searchProduct : async (word: string): Promise<Array<Product>> => (
        await graphql.query(
            `searchProduct(word: $expect) {
                ${templateProduct}
            }`,
            {
                expect: {
                    value: word,
                    settings: { type: 'String', nonNull: true }
                }
            },
            'Searching'
        )
    ),
    recommendations : async (): Promise<Array<Product>> => (
        await graphql.query(
            `recommendations {
                ${templateProduct}
            }`
        )
    )
}