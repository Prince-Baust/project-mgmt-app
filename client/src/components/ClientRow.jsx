import {FaTrash} from 'react-icons/fa'
import {useMutation} from '@apollo/client'
import {DELETE_CLIENT} from "../mutation/clientMutation";

const ClientRow = ({client}) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {id: client.id}
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
