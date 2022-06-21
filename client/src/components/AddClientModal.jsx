import {FaUser} from "react-icons/fa";
import {useState} from "react";


const AddClientModal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(phone)
  }

  return (
    <>

      <button type="button"
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#addClientModal">
        <div className="d-flex align-items-center">
          <FaUser className="icon"/>
          <div>
            Add Client
          </div>
        </div>
      </button>


      <div className="modal fade" id="addClientModal" tabIndex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">E-mail</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientModal;
