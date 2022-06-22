import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_PROJECT} from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectBtn from "../components/DeleteProjectBtn";
import EditProjectForm from "../components/EditProjectForm";

const Project = () => {
  const {id} = useParams();
  const {loading, error, data} = useQuery(GET_PROJECT, {
    variables: {id}
    }
  );

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong!</p>
  const {name, description, status, client} = data.project;

  return (
    <>
      { !loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{name}</h1>
          <p>{description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{status}</p>

          <ClientInfo client={client} />

          <EditProjectForm project={data.project} />

          <DeleteProjectBtn projectId={id} />
        </div>
      )
      }
    </>
  );
};

export default Project;
