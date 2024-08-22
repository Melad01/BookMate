import {
  Avatar,
  HStack,
  Heading,
  VStack,
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { MdReport } from "react-icons/md";
import { bgColor, color, hoverColor } from "../color";
import PostModal from "./Modals/PostModal";

interface Props {
  id: string;
  message: string;
  isRead: boolean | undefined;
}

const Notification = ({ id, message, isRead }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bgColor={!isRead ? hoverColor() : bgColor()}
      borderRadius={10}
      padding={1}
      onClick={onOpen}
    >
      <HStack>
        <Avatar
          size={{ base: "md", md: "lg" }}
          name={message}
          color={color()}
        />
        <VStack alignItems="flex-start" spacing={0}>
          <Heading color={color()} fontSize={{ base: 15, md: 20 }}>
            <HStack>
              <Text>Report</Text>
              <MdReport />
            </HStack>
          </Heading>
          <Text fontWeight="bold" fontSize={{ base: 10, md: 15 }}>
            {message} reported post with id: {id}
          </Text>
          <PostModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            id={id}
          />
        </VStack>
      </HStack>
    </Box>
  );
};

export default Notification;
