import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Box,
  Heading,
  HStack,
  Divider,
  AvatarGroup,
  Center,
  Tooltip,
} from "@chakra-ui/react";
import { bgColor, color } from "../../color";
import { MdThumbUp } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { ImSad } from "react-icons/im";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import useDeletePost from "../../hooks/post/useDeletePost";
import usePost from "../../hooks/post/usePost";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id?: string;
}

const PostModal = ({ isOpen, onClose, onOpen, id }: Props) => {
  // Define the reactions and their corresponding icons
  const { data: post } = usePost(id ?? "");

  const reactions = [
    { type: "Like", icon: <MdThumbUp color="#fec83e" />, count: post?.Like },
    { type: "Love", icon: <FaHeart color="red" />, count: post?.Love },
    {
      type: "Laugh",
      icon: <FaRegFaceLaughSquint color="#fec83e" />,
      count: post?.Laugh,
    },
    { type: "Sad", icon: <ImSad color="#fec83e" />, count: post?.Sad },
  ];

  // Sort reactions by count in descending order
  const sortedReactions = reactions.sort(
    (a, b) => (b.count ?? 0) - (a.count ?? 0)
  );

  const { mutate } = useDeletePost(id ?? "");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "2xs", sm: "xs", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent width={{ base: "300px", sm: "400px" }} bgColor={bgColor()}>
        <ModalHeader>
          <HStack>
            <Avatar name={post?.ApplicationUserImageUrl} />
            <Box>
              <Heading size="sm" color={color()}>
                {post?.ApplicationUserName}
              </Heading>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {post?.Content}
          <Divider orientation="horizontal" />
          <AvatarGroup marginTop={1} size="md" max={4}>
            {sortedReactions.map(
              (reaction, index) =>
                reaction?.count > 0 && (
                  <Tooltip label={reaction.type} key={index}>
                    <Avatar
                      key={index}
                      bgColor={color()}
                      borderColor={bgColor()}
                      icon={reaction.icon}
                    >
                      <Center>
                        <Box
                          mt={"-2px"}
                          textColor={
                            reaction.type === "Love" ? "red" : "#fec83e"
                          }
                          fontSize={16}
                        >
                          {reaction.count}
                        </Box>
                      </Center>
                    </Avatar>
                  </Tooltip>
                )
            )}
          </AvatarGroup>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            bgColor="#e70127"
            _hover={{ bgColor: "#fe0001" }}
            textColor={"white"}
            onClick={mutate}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
