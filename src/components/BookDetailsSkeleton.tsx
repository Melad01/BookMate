import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  HStack,
  Skeleton,
  SkeletonText,
  Divider,
  GridItem,
  List,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const BookDetailsSkeleton = () => {
  return (
    <>
      <Heading margin={3}>
        <Link to="/books">
          <IoMdArrowRoundBack size={40} />
        </Link>
      </Heading>
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        padding={{ base: 4, md: 5 }}
        spacing={{ base: 4, xl: 10 }}
        justifyContent="center"
      >
        <GridItem>
          <HStack justifyContent="space-between" marginBottom={2}>
            <Box>
              <SkeletonText />
            </Box>
            <HStack>
              <Skeleton />
              <Skeleton />
            </HStack>
          </HStack>
          <Skeleton width="100%" height="450px" />
        </GridItem>
        <GridItem>
          <Heading>Description:</Heading>
          <Skeleton noOfLines={5} />
          <Divider height={5} />
          <SimpleGrid columns={{ md: 2 }} marginTop={2} spacing={5}>
            <List spacing={2}>
              <Heading fontSize={{ base: 20, md: 30 }}>Genres:</Heading>
              <SimpleGrid
                columns={2}
                spacingY={{ base: 2, md: 1 }}
                spacingX={{ base: 1, md: 0.1 }}
              >
                <SkeletonText />
                <SkeletonText />
                <SkeletonText />
                <SkeletonText />
              </SimpleGrid>
            </List>
            <VStack alignItems="flex-start" spacing={0.1}>
              <SkeletonText />
              <SkeletonText />
            </VStack>
            <VStack alignItems="flex-start" spacing={0.1}>
              <SkeletonText />
              <SkeletonText />
            </VStack>
            <VStack alignItems="flex-start" spacing={0.1}>
              <SkeletonText />
              <SkeletonText />
            </VStack>
            <VStack alignItems="flex-start" spacing={0.1}>
              <SkeletonText />
              <SkeletonText />
            </VStack>
            <VStack alignItems="flex-start" spacing={0.1}>
              <SkeletonText />
              <SkeletonText />
            </VStack>
            <VStack alignItems="flex-start" spacing={0.1}>
              <SkeletonText />
              <SkeletonText />
            </VStack>
            <SkeletonText />
            <SkeletonText />
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default BookDetailsSkeleton;
