const express = require("express");
const jsonServer = require("json-server");
const chokidar = require("chokidar");
const cors = require("cors");
//Adding Graphql
const fs = require("fs");
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");
const queryResolvers  = require("./serverQueriesResolver");
const mutationResolvers = require("./serverMutationsResolver");

const history = require("connect-history-api-fallback");

const fileName = process.argv[2] || "./data.js"
const port = process.argv[3] || 3500;

let router = undefined;
let graph = undefined;
const app = express();

const createServer = () => {
    delete require.cache[require.resolve(fileName)];
    setTimeout(() => {
        router = jsonServer.router(fileName.endsWith(".js") ? require(fileName)() : fileName);
        // Load the schema/resolvers and use them to create a graphql service
        let schema = fs.readFileSync("./serverQueriesSchema.graphql", "utf-8")
            + fs.readFileSync("./serverMutationsSchema.graphql", "utf-8");
        let resolvers = { ...queryResolvers, ...mutationResolvers };
        graph = graphqlHTTP({
            schema: buildSchema(schema), rootValue: resolvers,
            graphiql: true, context: {db: router.db}
        })
    }, 100);
}

createServer();

app.use(history());
app.use("/", express.static("./build"));
app.use(cors());
app.use(jsonServer.bodyParser);
app.use("/api", (req,res, next) => router(req,res,next));
//Graphiql browser localhost:3500/graphql
app.use("/graphql", (req,res,next) => graph(req,res,next));

chokidar.watch(fileName).on("change", () => {
    console.log("Reloading web service data...");
    createServer();
    console.log("Reloading web service data complete.");
});

app.listen(port, () => console.log(`Web service running on port ${port}`));