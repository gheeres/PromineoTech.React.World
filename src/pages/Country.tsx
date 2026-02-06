import { useParams } from "react-router";

type CountryProps = {
};

export default function Country(props: CountryProps) {
  const { country_code } = useParams();
  return(
    <>
      <h2>Country ({ country_code })</h2>
      <p>Tab containing cities. Include details about country.</p>
    </>
  );
}