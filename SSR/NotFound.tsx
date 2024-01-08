import { usePage } from "@ssr-client/usePage";

const NotFound = () => {
  const page = usePage();

  return (
    <h1>
      HELLO TO ROOT! Page {page.component.toLocaleLowerCase()} Is not defined!{" "}
      {page.props.msg as string}
    </h1>
  );
};

export default NotFound;
