import { useParams } from "react-router";
//import useUser from "../hooks/useUser";

const UserDetailPage = () => {
  const { id } = useParams();
  //const { data } = useUser(id);

  return (
    <>
      <h1>UserDetailPage {id}</h1>
    </>
  );
};

export default UserDetailPage;
