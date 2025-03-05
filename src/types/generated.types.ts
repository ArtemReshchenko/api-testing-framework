export interface Post {
    body:   string;
    id:     number;
    title:  string;
    userId: number;
}


export interface Comment {
    body:   string;
    email:  string;
    id:     number;
    name:   string;
    postId: number;
}


export interface Album {
    id:     number;
    title:  string;
    userId: number;
}


export interface Photo {
    albumId:      number;
    id:           number;
    thumbnailUrl: string;
    title:        string;
    url:          string;
}


export interface Todo {
    completed: boolean;
    id:        number;
    title:     string;
    userId:    number;
}


export interface User {
    address:  Address;
    company:  Company;
    email:    string;
    id:       number;
    name:     string;
    phone:    string;
    username: string;
    website:  string;
}

export interface Address {
    city:    string;
    geo:     Geo;
    street:  string;
    suite:   string;
    zipcode: string;
}

export interface Geo {
    lat: string;
    lng: string;
}

export interface Company {
    bs:          string;
    catchPhrase: string;
    name:        string;
}


