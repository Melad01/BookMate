import {
  List,
  ListItem,
  ListIcon,
  Show,
  HStack,
  Text,
  Badge,
  Box,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { GoHomeFill } from "react-icons/go";
import { ImBooks } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import LogoutModal from "./Modals/LogoutModal";
import { CgProfile } from "react-icons/cg";
import { color, hoverColor } from "../color";
import useNotifications from "../hooks/useNotifications";

interface Props {
  onClose: () => void;
}

const Sidebar = ({ onClose }: Props) => {
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const location = useLocation();
  const notifications = useNotifications();

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <>
      <List
        bgColor={hoverColor()}
        spacing={{ base: 2, lg: 8 }}
        paddingX={5}
        alignSelf="center"
      >
        <ListItem
          fontSize="lg"
          fontWeight="bold"
          onClick={onClose}
          color={location.pathname === "/" ? hoverColor() : color()}
          bgColor={location.pathname === "/" ? color() : hoverColor()}
          borderRadius={20}
          paddingX={3}
          paddingY={2}
        >
          <Link to="/">
            <HStack spacing={0}>
              <ListIcon
                boxSize={7}
                as={GoHomeFill}
                color={location.pathname === "/" ? hoverColor() : color()}
              />
              <Text>Home</Text>
            </HStack>
          </Link>
        </ListItem>
        <ListItem
          fontSize="lg"
          fontWeight="bold"
          onClick={onClose}
          color={location.pathname === "/books" ? hoverColor() : color()}
          bgColor={location.pathname === "/books" ? color() : hoverColor()}
          borderRadius={20}
          paddingX={3}
          paddingY={2}
        >
          <Link to="/books">
            <HStack spacing={0}>
              <ListIcon
                boxSize={7}
                as={ImBooks}
                color={location.pathname === "/books" ? hoverColor() : color()}
              />
              <Text>Books</Text>
            </HStack>
          </Link>
        </ListItem>
        <ListItem
          fontSize="lg"
          fontWeight="bold"
          onClick={onClose}
          color={location.pathname === "/users" ? hoverColor() : color()}
          bgColor={location.pathname === "/users" ? color() : hoverColor()}
          borderRadius={20}
          paddingX={3}
          paddingY={2}
        >
          <Link to="/users">
            <HStack spacing={0}>
              <ListIcon
                boxSize={7}
                as={FaUsers}
                color={location.pathname === "/users" ? hoverColor() : color()}
              />
              <Text>Users</Text>
            </HStack>
          </Link>
        </ListItem>
        <ListItem
          fontSize="lg"
          fontWeight="bold"
          onClick={onClose}
          color={
            location.pathname === "/notifications" ? hoverColor() : color()
          }
          bgColor={
            location.pathname === "/notifications" ? color() : hoverColor()
          }
          borderRadius={20}
          paddingX={3}
          paddingY={2}
        >
          <Link to="/notifications">
            <HStack spacing={3}>
              <Box position="relative">
                <Icon
                  boxSize={7}
                  as={FaBell}
                  w={6}
                  h={6}
                  color={
                    location.pathname === "/notifications"
                      ? hoverColor()
                      : color()
                  }
                />
                {unreadCount > 0 && (
                  <Badge
                    position="absolute"
                    bottom="-1"
                    right="-1"
                    fontSize="xs"
                    borderRadius="full"
                    px="1"
                    bgColor={color()}
                    textColor={hoverColor()}
                  >
                    {unreadCount > 9 ? "+9" : unreadCount}
                  </Badge>
                )}
              </Box>
              <Text>Notifications</Text>
            </HStack>
          </Link>
        </ListItem>
        <Show below="md">
          <ListItem>
            <ColorModeSwitch />
          </ListItem>
          <ListItem
            fontSize="lg"
            fontWeight={location.pathname === "/profile" ? "bold" : undefined}
            onClick={onClose}
            color={location.pathname === "/profile" ? hoverColor() : color()}
            bgColor={location.pathname === "/profile" ? color() : hoverColor()}
            borderRadius={20}
            paddingX={3}
            paddingY={2}
          >
            <Link to="/profile">
              <HStack spacing={0}>
                <ListIcon
                  boxSize={7}
                  as={CgProfile}
                  color={
                    location.pathname === "/profile" ? hoverColor() : color()
                  }
                />
                <Text>Profile</Text>
              </HStack>
            </Link>
          </ListItem>
        </Show>
        <ListItem
          fontSize="lg"
          fontWeight="bold"
          onClick={onAlertOpen}
          cursor="pointer"
          color={location.pathname === "/logout" ? hoverColor() : color()}
          bgColor={location.pathname === "/logout" ? color() : hoverColor()}
          borderRadius={20}
          paddingX={3}
          paddingY={2}
        >
          <ListIcon boxSize={7} as={TbLogout} color={color()} />
          Logout
        </ListItem>
        <LogoutModal
          onClose={onAlertClose}
          onOpen={onAlertOpen}
          isOpen={isAlertOpen}
        />
      </List>
    </>
  );
};

export default Sidebar;
