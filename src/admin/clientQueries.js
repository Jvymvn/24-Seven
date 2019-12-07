import gql from "graphql-tag";

// Graphql queries are defined as javascript string literals in client app
// but must be processed using the gql function from the graphql-tag package.
// This query targets the servers orcers query and will accept variables that are used
// for the query's onlyShipped,page,pageSize, and sort parameters.
export const ordersSummaryQuery = gql`
    query($onlyShipped: Boolean, $page:Int, $pageSize:Int, $sort:String){
        orders(onlyUnshipped: $onlyShipped){
            totalSize,
            orders(page: $page, pageSize: $pageSize, sort: $sort){
                id, name, email, shipped
                products{
                    quantity, product { price }
                }
            }
        }
    }
`

// Adding queries to edit product
export const productsList = gql`
    query($page: Int, $pageSize: Int, $sort: String){
        products{
            totalSize,
            products(page: $page, pageSize: $pageSize, sort: $sort){
                id, name, category, price
            }
        }
    }
`
export const product = gql`
    query($id: ID!){
        product(id: $id){
            id, name, description, category, price
        }
    }
`