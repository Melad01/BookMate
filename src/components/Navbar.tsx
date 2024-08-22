import {
  Box,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  GridItem,
  HStack,
  Image,
  Show,
  SimpleGrid,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../assets/logog.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TiThMenu } from "react-icons/ti";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import Sidebar from "./Sidebar";
import { bgColor, color, hoverColor } from "../color";
import useNotifications from "../hooks/useNotifications";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notifications = useNotifications();
  const hasUnread = notifications.some(
    (notification) => notification.isRead === false
  );

  return (
    <>
      <Show above="lg">
        <HStack
          as="nav"
          align="center"
          justify="space-between"
          spacing={{ lg: 200 }}
          flex={1}
        >
          <Link to="/">
            <Image src={logo} maxW="200px" maxH="100px" objectFit="contain" />
          </Link>
          <SearchInput />
          <HStack>
            <ColorModeSwitch />
            <Tooltip label="Profile">
              <Link to="/profile">
                <CgProfile size={35} color={color()} />
              </Link>
            </Tooltip>
          </HStack>
        </HStack>
      </Show>
      <Show below="lg">
        <SimpleGrid row={2} marginBottom={1}>
          <GridItem>
            <HStack justifyContent="space-between">
              <Box position="relative">
                <TiThMenu onClick={onOpen} size={30} color={color()} />
                {hasUnread && (
                  <Box
                    position="absolute"
                    top="-5px"
                    right="-5px"
                    width="10px"
                    height="10px"
                    bg="red.500"
                    borderRadius="full"
                  />
                )}
              </Box>
              <Link to="/">
                <Image src={logo} width="200px" height="100px" />
              </Link>
            </HStack>
          </GridItem>
          <GridItem paddingX={1}>
            <SearchInput />
          </GridItem>
        </SimpleGrid>
      </Show>
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        size={{ base: "xs", md: "md" }}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={hoverColor()} padding={1}>
          <Box display="flex" justifyContent="flex-end" padding={1}>
            <CloseButton size="lg" onClick={onClose} color={color()} />
          </Box>
          <DrawerHeader
            color={color()}
            borderBottomWidth="2px"
            borderBottomColor={color()}
          >
            Sidebar
          </DrawerHeader>
          <DrawerBody>
            <Sidebar onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
