import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider} from "react-apollo";
import { GraphQlUrl } from "../data/Urls";
import { OrdersConnector } from "./ordersConnector";

const graphQlClient = new ApolloClient({
    uri: GraphQlUrl
});

export class Admin extends Component {
    render() {
        // access to the GraphQl client is provided through the ApolloProvider
        return <ApolloProvider client={graphQlClient}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-info text-white">
                        <div className="navbar-brand">24/SEVEN</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col p-2">
                        <OrdersConnector />
                    </div>
                </div>
            </div>
        </ApolloProvider>
    }
}