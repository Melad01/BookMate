import { SimpleGrid } from "@chakra-ui/react";
import UserCard from "./UserCard";
import useUsers from "../hooks/user/useUsers";
import UserCardSkeleton from "./UserCardSkeleton";

const UserGrid = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const { data, isLoading } = useUsers();

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={{ base: 3, lg: 5, xl: 8 }}
      padding={{ base: 3, lg: 5 }}
      justifyItems="center"
    >
      {isLoading &&
        skeletons.map((skeleton, index) => <UserCardSkeleton key={index} />)}
      {data?.map((user) => (
        <UserCard key={user.Id} userId={user.Id ?? ""} name={user.Name ?? ""} />
      ))}
    </SimpleGrid>
  );
};

export default UserGrid;
