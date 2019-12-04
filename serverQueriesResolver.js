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

