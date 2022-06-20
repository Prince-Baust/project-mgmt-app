import {FaTrash} from 'react-icons/fa'
import {useMutation} from '@apollo/client'
import {DELETE_CLIENT} from "../mutation/clientMutation";
import {GET_CLIENTS} from "../queries/clientQueries";

const ClientRow = ({client}) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {id: client.id},
    // refetchQueries: [{query: GET_CLIENTS}]       //N.B: update UI by refetching but calling refetch again n again may cause app to crash

    //Updating cache to update UI is good practice
    update(cache, {data: {deleteClient}}) {
      const {clients} = cache.readQuery({query: GET_CLIENTS});
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter(client => client.id !== deleteClient.id)
        }
      })
    }
  });

  const {name, email, phone} = client;
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
