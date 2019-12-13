import { DataTypes } from "./Types";

const protocol = "http";
const hostname = "localhost";
const port = 3500;

export const RestUrls = {
    [DataTypes.PRODUCTS]: `${protocol}://${hostname}:${port}/api/products`,
    [DataTypes.CATEGORIES]: `${protocol}://${hostname}:${port}/api/categories`,
    [DataTypes.ORDERS]: `${protocol}://${hostname}:${port}/api/orders`
}

//GraphQl client
export const GraphQlUrl = `${protocol}://${hostname}:${port}/graphql`;
//Url to perform authentication
export const authUrl = `${protocol}://${hostname}:${port}/login`;