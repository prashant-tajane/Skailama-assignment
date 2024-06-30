import { useEffect, useState } from "react";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchedProjects = async () => {
      setIsLoading(true);
      try {
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        setProjects(savedProjects);
      } catch (error) {
        console.log(error);
        setError("Failed to load projects from local storage.");
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
