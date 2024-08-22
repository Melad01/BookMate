import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { bgColor, color } from "../color";

interface User {
  Id: string;
  Name: string;
  Email: string;
}

interface Props {
  users: User[];
}

const UsersTable = ({ users }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple" size={{ base: "sm", md: "lg" }}>
        <Thead>
          <Tr bg={bgColor()} color={color()}>
            <Th color={color()}>Name</Th>
            <Th color={color()}>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <Tr key={user.Id} bg={bgColor()} color={color()}>
              <Td style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                {user.Name}
              </Td>
              <Td style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                {user.Email}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
