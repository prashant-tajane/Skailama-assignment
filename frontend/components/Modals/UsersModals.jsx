"use client";

import useUsers from "../../hooks/useUsers";
import styles from "../../styles/modals.module.css";
import { useSnackbar } from "notistack";

const UsersModals = ({ setUserModal }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { users, isLoading } = useUsers();

  const handleSelectUser = (user) => {
    localStorage.setItem("lamaUser", JSON.stringify(user));
    enqueueSnackbar(`User ${user.email} selected successfully`, {
      variant: "success",
    });
    setUserModal(false);
  };
  return (
    <div className={styles.modal}>
      <div
        className={`${styles.card} scrollbar`}
        style={{
          maxHeight: "450px",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <h3 className={styles.create_project_title}>Users</h3>
        {isLoading ? (
          <div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className={styles.users}>
            {users &&
              users?.map((user) => (
                <div
                  onClick={() => handleSelectUser(user)}
                  key={user?._id}
                  className={styles.user}
                >
                  <img src={user?.image} alt={user?.name} />
                  <p>{user?.email}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersModals;
