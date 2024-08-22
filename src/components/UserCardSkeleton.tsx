import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { bgColor, color } from "../color";

const UserCardSkeleton = () => {
  return (
    <Card bgColor={bgColor()} w="300px">
      <CardHeader>
        <HStack>
          <SkeletonCircle color={color()} />
          <Skeleton
            height="12px"
            width="40%"
            color={color()}
            marginRight={20}
          />
          <SkeletonCircle color={color()} />
        </HStack>
      </CardHeader>
      <Divider orientation="horizontal" />
      <CardBody>
        <SkeletonText
          mt="5"
          noOfLines={2}
          spacing="4"
          skeletonHeight="2"
          color={color()}
        />
      </CardBody>
    </Card>
  );
};

export default UserCardSkeleton;
