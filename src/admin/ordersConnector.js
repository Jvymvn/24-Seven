// GraphQl function is the counterpart to the connect and withRouter functions,
// Which connects a component to the GraphQl features by creating a HOC
import {compose, graphql} from "react-apollo";
import { ordersSummaryQuery } from "./clientQueries";
import { OrdersTable } from "./OrdersTable";
import { shipOrder } from "./clientMutations";

const vars = {
    onlyShipped: false, page: 1, pageSize: 10, sort: "id"
}

// GraphQl accepts arguments for the query and a configuration object 
// and returns a function that is used to wrap the component

// Options prop -- used to create the set of variables that will be applied to the query
// Props prop -- used to ceate the props that will be passed to the display component
// and is provided with a data object that combines 
// details of the query progress
// the response from the server
// functions used to refresh the query

// three props are selected from the data object 
// and used to create the props for the orders table component
// the response is awaited, placeholder values are used until response is received

// Compose function combines queries and mutations
// The apollo client automatically updates its cache of data when there is a change.
export const OrdersConnector = compose(
    graphql(ordersSummaryQuery,
    {
        options: (props) => ({ variables: vars}),
        props: ({data: {loading, orders, refetch}}) => ({
            totalSize: loading ? 0 : orders.totalSize,
            orders: loading ? [] : orders.orders,
            currentPage: vars.page,
            pageCount: loading ? 0 : Math.ceil(orders.totalSize / vars.pageSize),
            navigateToPage: (page) => {vars.page = Number(page); refetch(vars)},
            pageSize: vars.pageSize,
            setPageSize: (size) => { vars.pageSize = Number(size); refetch(vars)},
            sortKey: vars.sort,
            setSortProperty: (key) => { vars.sort = key; refetch(vars)}
        })
    }
), graphql(shipOrder, {
    props: ({ mutate }) => ({
        toggleShipped: (id, shipped) => mutate({variables: {id, shipped}})
    })
}))(OrdersTable)