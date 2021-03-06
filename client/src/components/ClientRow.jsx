import {FaTrash} from 'react-icons/fa'
import {useMutation} from '@apollo/client'
import {DELETE_CLIENT} from "../mutation/clientMutation";
import {GET_CLIENTS} from "../queries/clientQueries";
import {GET_PROJECTS} from "../queries/projectQueries";

const ClientRow = ({client}) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {id: client.id},
    refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}]


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
