import React, { Component } from 'react';
// Access to the GraphQl client is provided through the ApolloProvider
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { GraphQlUrl } from "../data/Urls";
import { OrdersConnector } from "./OrdersConnector";
// PRODUCT ADMINISTRATION
import { Route, Redirect, Switch, Link } from "react-router-dom";
import { ToggleLink } from "../ToggleLink";
import { ConnectedProducts } from "./ProductsConnector";
import { ProductEditor } from "./ProductEditor";
import { ProductCreator } from "./ProductCreator";

const graphQlClient = new ApolloClient({
    uri: GraphQlUrl
});

export class Admin extends Component {
    render() {
        // Access to the GraphQl client is provided through the ApolloProvider
        return <ApolloProvider client={graphQlClient}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-info text-white">
                        <div className="navbar-brand">24/SEVEN</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 p-2">
                        <ToggleLink to="/admin/orders">Orders</ToggleLink>
                        <ToggleLink to="/admin/products">Products</ToggleLink>
                        <Link className="btn btn-block btn-secondary fixed-bottom m-2 col-3" to="/shop">
                            Return to Shop
                        </Link>
                    </div>
                    <div className="col-9 p-2">
                        <Switch>
                            <Route path="/admin/orders" component={OrdersConnector} />
                            <Route path="/admin/products/create" component={ProductCreator} />
                            <Route path="/admin/products/:id" component={ProductEditor} />
                            <Route path="/admin/products" component={ConnectedProducts} />
                            <Redirect to="/admin/orders" />
                        </Switch>
                    </div>
                </div>
            </div>
        </ApolloProvider>
    }
}