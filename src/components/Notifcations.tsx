import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import Notification from "../../src/components/Notification";
import { bgColor, color, hoverColor } from "../color";
import useNotifications from "../hooks/useNotifications";
import { useNotificationStore } from "../store";

const Notifcations = () => {
  const notifications = useNotifications();
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);

  return (
    <Box paddingX={{ base: 5, md: 10 }} marginTop={1}>
      <Heading color={bgColor()} marginBottom={5}>
        <VStack>
          <Text>Notifications:</Text>
          <Button
            color={color()}
            bg={bgColor()}
            _hover={{
              bgColor: hoverColor(),
              color: color(),
            }}
            onClick={markAllAsRead}
          >
            Make all read
          </Button>
        </VStack>
      </Heading>
      <VStack spacing={1}>
        {notifications
          ?.slice()
          .reverse()
          .map((notification, index) => (
            <Notification
              key={notification.id}
              id={notification.id}
              message={notification.message}
              isRead={notification.isRead}
            />
          ))}
      </VStack>
    </Box>
  );
};

export default Notifcations;
