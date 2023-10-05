import { useParams } from "react-router-dom";

export default function Country(props) {
  const { country_code } = useParams();
  return(
    <>
      <h2>Country</h2>
      <p>{ country_code }</p>
    </>
  );
}