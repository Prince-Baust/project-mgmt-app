import {FaTrash} from 'react-icons/fa'

const ClientRow = ({client}) => {
  const {name, email, phone} = client;
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className="btn btn-danger btn-sm">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
