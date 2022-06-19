const {projects, clients} = require('../sampleData');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');

//Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    phone: {type: GraphQLString}
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args){
        return clients;
      }
    },
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        //TODO: Later when mongoose add, change this query
        return clients.find(client => client.id === args.id);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})