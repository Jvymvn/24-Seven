import React, { Component } from 'react';
// Alternative to graphql function, allows graphql queries to be performed declaratively
import { Query } from "react-apollo";
import { ProductCreator } from "./ProductCreator";
import { product } from "./clientQueries";

// Component will obtain the id of the product we want to edit
// using Query component, render props recieves object with loading and properties
// 
export class ProductEditor extends Component {
    render = () => 
    <Query query={ product } variables={ {id: this.props.match.params.id} }>
        {({ loading, data }) => {
            if(!loading){
                return <ProductCreator {...this.props} product={data.product} mode="edit" />
            }
            return null;
        }}
    </Query>
}