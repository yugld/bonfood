import { usePageProp } from "@ssr-client/usePage";

function ShowMessage() {
  const message = usePageProp<string>("msg");
  const first = usePageProp<string>("some.hidden[0].prop");
  const second = usePageProp<string>("some.hidden[1].prop");

  return (
    <div>
      <h1 className="text-center font-bold text-xl">{message}</h1>
      <h2 className="text-center font-bold text-md">
        {first} {second}
      </h2>
    </div>
  );
}

export default ShowMessage;
