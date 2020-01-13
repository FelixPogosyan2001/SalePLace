import {instance} from './instanseAxios';

export default {
    myProducts : async () => {
        const request = {
            query : `
                query {
                    createdProducts {
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
                    }
                }
            `
        };
        
       const {data} = await instance.post('graphql',request);
       return data.data.createdProducts;
    },
    myLikes : async (id) => {
        const request = {
            query : `
                query {
                    likes {
                        product {
                            _id,
                            title,
                            description,
                            price,
                            image,
                            views,
                            likes,
                            category
                        }
                    }
                }
                
            `
        };
        const {data} = await instance.post('graphql',request);
        return data.data.likes.map(item => ({...item.product}));
    },
    addProduct : async (productData) => {
        const form = new FormData();
        const request = {
            query : `
                mutation AddingProduct($data : ProductInput!) {
                    createProduct(data : $data){
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
                    }
                }
            `,
            variables : {
                data : {
                    title : productData.title,
                    description : productData.description,
                    price : +productData.price,
                    category : productData.category,
                    image : null
                }
            }
        }

        form.append('operations',JSON.stringify(request));
        form.append('map',JSON.stringify({'0' : ['variables.data.image']}));
        form.append('0',productData['avatar']);
        var {data} = await instance.post('graphql',form);
        return data.data.createProduct;
    },
    likeProduct : async (id) => {
        const request = {
            query : `
                mutation doLike($productId: ID!){
                    likeProduct(productId: $productId){
                        _id
                    }
                }
            `,
            variables : {
                productId : id
            }
        };
        let result = await instance.post('graphql',request);
        return result.data.data.likeProduct;
    },
    deleteLike : async (id) => {
        const request = {
            query : `
                mutation DeletingLike($productId : ID!){
                    deleteLike(productId : $productId)
                }
            `,
            variables : {
                productId : id
            }
        };
        const status = await instance.post('graphql',request);
        return status
    },
    newView : async (id,watches) => {
        const request = {
            query : `
                mutation Updating($id : ID!,$values : ProductInput!){
                    updateProduct(id : $id,values : $values){
                        views
                    }
                }
            `,
            variables : {
                id,
                values : {views : watches + 1}
            }
        };
        const result = await instance.post('graphql',request);
        console.log(result)
    },
    getProductsCatalog : async (name,page,pageSize) => {
        const request = {
            query : `
                query getProducts($category : String!,$page : Int!,$pageSize : Int){
                    productsCatalog(category: $category,page : $page,pageSize : $pageSize) {
                        data {
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
                        },
                        totalCount,
                        page,
                        pageSize
                    }
                }
            `,
            variables : {
                category : name,
                page,
                pageSize
            }
        };
       let {data} = await instance.post('graphql',request);
       return data.data.productsCatalog;
    },
    getProducts : async (page,pageSize) => {
        const request = {
            query : `
                query Pagination($page : Int!,$pageSize : Int){
                    products(page : $page,pageSize : $pageSize){
                        data {
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
                        },
                        totalCount,
                        page,
                        pageSize
                    }
                }
            `,
            variables : {
                page,
                pageSize
            }
        }
        
        const {data} = await instance.post('graphql',request);
        return data.data.products;
    },
    searchProduct : async (word) => {
        const request = {
            query : `
                query Searching($expect : String!){
                    searchProduct(word: $expect) {
                        _id,
                        title,
                        description,
                        price,
                        image,
                        views,
                        likes,
                        category
                    }
                }
            `,
            variables : {
                expect : word
            }
        };
        const {data} = await instance.post('graphql',request);
        return data.data.searchProduct;
    },
    recommendations : async () => {
        const request = {
            query :  `
                query {
                    recommendations {
                        _id,
                        title,
                        description,
                        price,
                        image,
                        views,
                        likes,
                        category
                    }
                }
            `
        }
        let {data} = await instance.post('graphql',request);
        return data.data.recommendations;
    }
}