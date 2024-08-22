import { useParams } from "react-router";
import BookDetails from "../components/BookDetails";
import useBook from "../hooks/book/useBook";
import BookDetailsSkeleton from "../components/BookDetailsSkeleton";

const BookDetailsPage = () => {
  const { title } = useParams();

  const { data: book, isLoading, isError } = useBook(title!);

  if (isLoading) return <BookDetailsSkeleton />;

  if (isError || !book) throw Error;

  if (book) return <BookDetails book={book} />;
};

export default BookDetailsPage;
