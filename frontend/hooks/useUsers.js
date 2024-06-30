import { axiosInstance } from "../utils/axiosInstance";
import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, seUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchedUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/users");
        seUsers(response.data);
      } catch (error) {
        setError(error?.response?.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchedUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
  };
};

export default useUsers;
