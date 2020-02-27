import React from 'react';

export interface Product {
    _id: string,
    title: string,
    description: string,
    price: number,
    image: string,
    views: number,
    likes: number,
    category: string,
    creator: Person
    liked?: boolean
}

export interface Action<T, P> {
    type: T 
    payload?: P
}

export interface Like {
    _id: string
    user: string
    product: string | Product
}

export interface Person {
    _id: string
    email?: string
    password?: string
    name: string
    lastname: string
    avatar: string
    dialogs?: Array<Dialog> 
    createdProducts?: Array<string>
    gender?: string
}

export interface Message {
    sender: Person
    receiver: Person
    text: string
    date: string
}

export interface Dialog {
    url: string
    messages: Array<Message>
}

export interface AppProps {
    token: string
    logout: (e: React.MouseEvent<HTMLElement>) => void
}

export interface LinkDispatchToProps {
    [propName: string]: Function
}

export interface Dispatches {
    myLikes?: () => void
    like?: (id: string) => void
    deleteLike: (id: string) => void
    addView: (id: string, views: number) => void
    addInCart: (product: Product) => void
}

export interface Pag {
    data: Array<Product> 
    totalCount: number
    page: number
    pageSize: number
}
