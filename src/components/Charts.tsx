import {
  Divider,
  Heading,
  Show,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PieChart } from "react-chartkick";
import "chartkick/chart.js";
import useChart1 from "../hooks/charts/useChart1";
import useChart2 from "../hooks/charts/useChart2";
import useChart3 from "../hooks/charts/useChart3";
import BookTable from "./BookTable";
import { bgColor } from "../color";
import UsersTable from "./UsersTable";
import useChart4 from "../hooks/charts/useChart4";

interface Chart1 {
  CategoryName: string;
  Percent: number;
}

interface Chart4 {
  CategoryName: string;
  Count: number;
}

const Charts = () => {
  const { data: chart1, isLoading: chart1Loading } = useChart1();
  const { data: chart2, isLoading: chart2Loading } = useChart2();
  const { data: chart3, isLoading: chart3Loading } = useChart3();
  const { data: chart4, isLoading: chart4Loading } = useChart4();

  const result1 = chart1?.reduce((acc, curr: Chart1) => {
    acc[curr.CategoryName] = curr.Percent.toFixed(2);
    return acc;
  }, {});
  const totalCount = chart4?.reduce((acc, curr) => acc + curr.Count, 0) || 1;
  const result2 = chart4?.reduce((acc, curr: Chart4) => {
    acc[curr.CategoryName] = (curr.Count * 100) / totalCount;
    return acc;
  }, {});

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} padding={3} spacing={5}>
      <VStack>
        <Heading
          textAlign="center"
          color={bgColor()}
          fontSize={{ base: 25, md: 35 }}
        >
          Categories percentage:
        </Heading>
        {chart1Loading ? (
          <Spinner
            thickness="5px"
            speed="0.85s"
            color={bgColor()}
            size={{ base: "md", md: "xl" }}
          />
        ) : (
          <PieChart data={result1} />
        )}
      </VStack>
      <Show breakpoint="(max-width: 426px)">
        <Divider
          orientation="horizontal"
          borderColor={bgColor()}
          borderWidth={1}
        />
      </Show>
      <VStack>
        <Heading
          textAlign="center"
          color={bgColor()}
          fontSize={{ base: 25, md: 35 }}
        >
          Most wanted Categories:
        </Heading>
        {totalCount === 1 && (
          <Text color={bgColor()} fontSize={20}>
            No data yet.
          </Text>
        )}
        {chart4Loading ? (
          <Spinner
            thickness="5px"
            speed="0.85s"
            color={bgColor()}
            size={{ base: "md", md: "xl" }}
          />
        ) : (
          totalCount !== 1 && <PieChart data={result2} />
        )}
      </VStack>
      <Show breakpoint="(max-width: 426px)">
        <Divider
          orientation="horizontal"
          borderColor={bgColor()}
          borderWidth={1}
        />
      </Show>
      <VStack>
        <Heading
          textAlign="center"
          fontSize={{ base: 25, md: 35 }}
          color={bgColor()}
        >
          Most read books:
        </Heading>
        {chart2?.length === 0 && (
          <Text color={bgColor()} fontSize={20}>
            No data yet.
          </Text>
        )}
        {chart2Loading ? (
          <Spinner
            thickness="5px"
            speed="0.85s"
            color={bgColor()}
            size={{ base: "md", md: "xl" }}
          />
        ) : (
          chart2?.length > 0 && <BookTable books={chart2 ?? []} />
        )}
      </VStack>
      <Show breakpoint="(max-width: 426px)">
        <Divider
          orientation="horizontal"
          borderColor={bgColor()}
          borderWidth={1}
        />
      </Show>
      <VStack>
        <Heading
          textAlign="center"
          fontSize={{ base: 25, md: 35 }}
          color={bgColor()}
        >
          Top readers:
        </Heading>
        {chart3?.length === 0 && (
          <Text color={bgColor()} fontSize={20}>
            No data yet.
          </Text>
        )}
        {chart3Loading ? (
          <Spinner
            thickness="5px"
            speed="0.85s"
            color={bgColor()}
            size={{ base: "md", md: "xl" }}
          />
        ) : (
          chart3?.length > 0 && <UsersTable users={chart3 ?? []} />
        )}
      </VStack>
    </SimpleGrid>
  );
};

export default Charts;
