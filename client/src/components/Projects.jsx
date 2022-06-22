import {useQuery} from '@apollo/client'
import {GET_PROJECTS} from "../queries/projectQueries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  console.log(useQuery(GET_PROJECTS))

  if (loading) <Spinner />;
  if (error)  <p>Something Went Wrong!</p>;
  return (
    <>
      {
        data.projects.length > 0 ?
          (
            <div className="row mt-4">
              {data.projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
          )
          : (<p>No Projects Yet!</p>)
      }
    </>
  );
};

export default Projects;
