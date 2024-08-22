import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  HStack,
  useDisclosure,
  Divider,
  Text,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import DeleteModal from "./Modals/DeleteModal";
import { bgColor, color } from "../color";

interface Props {
  userId: string;
  name: string;
}

const UserCard = ({ userId, name }: Props) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <Card bgColor={bgColor()}>
      <CardHeader>
        <Flex gap={1}>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Link to={`/users/${userId}`}>
              <HStack>
                <Avatar name={name} />
                <Box>
                  <Heading size="sm" color={color()}>
                    {name}
                  </Heading>
                </Box>
              </HStack>
            </Link>
          </Flex>
        </Flex>
      </CardHeader>
      <Divider orientation="horizontal" color={color()} />
      <CardBody>
        <HStack>
          <Text fontSize={30} color={color()}>
            ID:
          </Text>
          <Text
            bgColor={color()}
            color={bgColor()}
            borderRadius={20}
            padding={3}
          >
            {userId}
          </Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default UserCard;
