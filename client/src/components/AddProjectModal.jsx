import {FaList} from "react-icons/fa";
import {useState} from "react";
import {ADD_CLIENT} from "../mutation/clientMutation";
import {GET_CLIENTS} from "../queries/clientQueries";
import {useMutation, useQuery} from "@apollo/client";


const AddProjectModal = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  //Get clients for select
  const {loading, errror, data} = useQuery(GET_CLIENTS);


  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || description === '' || status === '')
      alert('All fields are required!');

    // addClient(name, email, phone);

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  }

  if (loading) return null;
  if (errror) return `Something went wrong`

  return (
    <>
      {!loading && !errror && (
        <>
          <button type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#addProjectModal">
            <div className="d-flex align-items-center">
              <FaList className="icon"/>
              <div>
                New Project
              </div>
            </div>
          </button>

          <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel"
               aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjectModalLabel">New Project</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" value={name}
                             onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" id="description" value={description}
                                onChange={e => setDescription(e.target.value)}>
                  </textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="form-select" id="status" value={status}
                              onChange={e => setStatus(e.target.value)}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select id="clientId" className="form-select" value={clientId} onChange={e => setClientId(e.target.value)}>
                        <option value="">Select Client</option>
                        {data.clients.map(client => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )
      }
    </>
  );
};

export default AddProjectModal;
