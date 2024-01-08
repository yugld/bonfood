interface HeadlineProps {
  text: string;
}

function Headline({ text }: HeadlineProps): JSX.Element {
  return (
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium">{text}</h2>
  );
}

export default Headline;
