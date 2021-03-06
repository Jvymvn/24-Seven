// The schema in a Graphql services is implemented by a resolver.
// Relies on lowdb database that json-server package uses for data storage
// https://github.com/ typicode/lowdb
// Each query is resolved using a series of functions

const paginateQuery = (query, page = 1, pageSize = 5) => 
    query.drop((page - 1) * pageSize).take(pageSize);

const product = ({id},{db}) => db.get("products").getById(id).value();

const products = ({ category }, {db}) => ({
    totalSize: () => db.get("products")
        .filter(p => category ? new RegExp(category, "i").test(p.category) : p)
        .size().value(),
    products: ({page, pageSize, sort}) => {
        let query = db.get("products");
        if(category){
            query = query.filter(item => 
                new RegExp(category, "i").test(item.category))
        }
        if(sort) { query = query.orderBy(sort) }
        return paginateQuery(query, page, pageSize).value();
    }
});

const categories = (arg, {db}) => db.get("categories").value();

const resolveProducts = (products, db) => 
    products.map(p  => ({
        quantity: p.quantity,
        product: product({id: p.product_id}, {db})
    }))

const resolveOrders = (onlyUnshipped, {page, pageSize, sort}, {db}) => {
    let query = db.get("orders");
    if(onlyUnshipped){ query = query.filter({shipped: false}) }
    if(sort) { query = query.orderBy(sort) }
    return paginateQuery(query, page, pageSize).value()
        .map(order => ({...order, products: () => 
        resolveProducts(order.products, db) }));
}

const orders = ({onlyUnshipped = false}, {db}) => ({
    totalSize: () => db.get("orders")
        .filter(o => onlyUnshipped ? o.shipped === false : o).size().value(),
    orders: (...arg) => resolveOrders(onlyUnshipped, ...arg)
})

module.exports = { product, products, categories, orders }
