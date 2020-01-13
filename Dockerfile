FROM node:12.14.1

RUN mkdir -p /usr/src/24-seven

COPY build /usr/src/24-seven/build

COPY productionData.json /usr/src/24-seven/
COPY server.js /usr/src/24-seven/
COPY deploy-package.json /usr/src/24-seven/package.json

COPY serverQueriesSchema.graphql /usr/src/24-seven/
COPY serverQueriesResolver.js /usr/src/24-seven/
COPY serverMutationsSchema.graphql /usr/src/24-seven/
COPY serverMutationsResolver.js /usr/src/24-seven/

WORKDIR /usr/src/24-seven

RUN echo 'package-lock=false' >> .npmrc

RUN npm install

EXPOSE 80

CMD ["node", "server.js", "./productionData.json", "80"]