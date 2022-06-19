const {projects, clients} = require('../sampleData');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');


//Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: {type: GraphQLID},
    clientId: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLString},
    client: {
      type: ClientType,
      resolve(parent, args) {
        return clients.find(client => client.id === parent.clientId)
      }
    }
  })
})


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
    // Get all clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args){
        return clients;
      }
    },
    // Get Client by ID
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        //TODO: Later when mongoose add, change this query
        return clients.find(client => client.id === args.id);
      }
    },
    //Get All Projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve (parent, args) {
        return projects
      }
    },
    //Get Project by ID
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return projects.find(project => project.id === args.id)
      }
    }

  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})