// const {projects, clients} = require('../sampleData');      SampleData for testing without db
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = require('graphql');
const Client = require('../models/clientModel');
const Project = require('../models/projectModel');

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
        // return clients.find(client => client.id === parent.clientId)        // Return from sample data
        return Client.findById(parent.clientId)                                // Return from db
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
        // return clients;                                        // Clients from sample data
        return Client.find();                                     //Clients from db
      }
    },
    // Get Client by ID
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // return clients.find(client => client.id === args.id);        //Return from sample data
        return Client.findById(args.id);                                // Return from db
      }
    },
    //Get All Projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve (parent, args) {
        // return projects                  // Projecs from sample data

        return Project.find();              // Projects from db
      }
    },
    //Get Project by ID
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // return projects.find(project => project.id === args.id)  // Project from sample data
        return Project.findById(args.id)                            // Project from db
      }
    }

  }
})

//Mutation
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //Add new client
    addClient: {
      type: ClientType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        phone: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        });
        return client.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})