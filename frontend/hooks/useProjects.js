import { axiosInstance } from "../utils/axiosInstance";
import { useEffect, useState } from "react";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchedProjects = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchedProjects();
  }, []);

  return {
    projects,
    isLoading,
    error,
    setProjects
  };
};

export default useProjects;
