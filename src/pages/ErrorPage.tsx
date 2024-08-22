import { isRouteErrorResponse, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <div>
        Error Page:{" "}
        {isRouteErrorResponse(error)
          ? "This page does not exist."
          : "An unexpected error occurred."}
      </div>
    </>
  );
};

export default ErrorPage;
