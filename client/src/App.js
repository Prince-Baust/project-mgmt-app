import Header from "./components/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";
import Projects from "./components/Projects";

//TODO: deleting client/project ui update warning solution to be updated

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        Clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        },
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache
})


function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header/>
        <div className="container">
          <AddClientModal />
          <Projects />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
