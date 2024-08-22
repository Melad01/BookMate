import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRef } from "react";
import useLogout from "../../hooks/user/useLogout";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { bgColor, color, hoverColor } from "../../color";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onOpen, onClose }: Props) => {
  const cancelRef = useRef<HTMLInputElement>(null);
  const authHeader = useAuthHeader();
  const { mutate, isPending } = useLogout();

  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", md: "sm", lg: "lg" }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            width={{ base: "300px", sm: "400px" }}
            bgColor={color()}
          >
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              color={bgColor()}
            >
              Confirm Logout
            </AlertDialogHeader>
            <AlertDialogBody color={bgColor()}>
              Are you sure you want to logout?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button variant="ghost" onClick={() => onClose()}>
                No
              </Button>
              <Button
                bgColor={bgColor()}
                _hover={{ bgColor: hoverColor() }}
                onClick={() => {
                  mutate(authHeader ?? "");
                  onClose();
                }}
                textColor={color()}
                ml={3}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default LogoutModal;
