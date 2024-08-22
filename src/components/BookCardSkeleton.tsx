import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { bgColor, color } from "../color";

const BookCardSkeleton = () => {
  return (
    <Card bgColor={bgColor()}>
      <CardHeader>
        <Skeleton height="16px" mb={3} width="60%" color={color()} />
        <Skeleton height="12px" width="80%" color={color()} />
      </CardHeader>
      <Divider orientation="horizontal" />
      <CardBody>
        <Skeleton height="200px" color={color()} />
        <SkeletonText
          mt="5"
          noOfLines={3}
          spacing="4"
          skeletonHeight="2"
          color={color()}
        />
      </CardBody>
    </Card>
  );
};

export default BookCardSkeleton;
