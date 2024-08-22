import { Box, Icon } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { color } from "../color";

interface Props {
  rating?: number;
}

const StarRating = ({ rating }: Props) => {
  const fullStars = Math.floor(rating ? rating : 0);
  const hasHalfStar = (rating ? rating : 0) % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Box>
      {[...Array(fullStars)].map((_, index) => (
        <Icon key={index} as={FaStar} color="yellow.500" />
      ))}
      {hasHalfStar && <Icon as={FaStarHalfAlt} color="yellow.500" />}
      {[...Array(emptyStars)].map((_, index) => (
        <Icon key={index} as={FaStar} color={color()} />
      ))}
    </Box>
  );
};

export default StarRating;
