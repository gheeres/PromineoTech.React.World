
type NameProps = {
  name: string,
};
export default function Name({ name, ...props}: NameProps) {
  return(
    <>
      <h1>{ name } </h1>
    </>
  );
}