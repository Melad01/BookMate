import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import useDeleteBook from "../../hooks/book/useDeleteBook";
import { bgColor, color } from "../../color";
import useDeleteUser from "../../hooks/user/useDeleteUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  id?: string;
}

const DeleteModal = ({
  isOpen,
  onOpen,
  onClose,
  children,
  title,
  id,
}: Props) => {
  const cancelRef = useRef<HTMLInputElement>(null);

  const deleteBook = useDeleteBook(title ?? "");
  const deleteUser = useDeleteUser(id ?? "");

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      size={{ base: "xs", md: "sm", lg: "lg" }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          bgColor={color()}
          width={{ base: "300px", sm: "400px" }}
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color={bgColor()}>
            Delete this {children}?
          </AlertDialogHeader>

          <AlertDialogBody color={bgColor()}>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (children === "user") deleteUser.mutate();
                else if (children === "book") deleteBook.mutate(title ?? "");
                onClose();
              }}
              ml={3}
              bgColor="#e70127"
              _hover={{ bgColor: "#fe0001" }}
              textColor={"white"}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteModal;
