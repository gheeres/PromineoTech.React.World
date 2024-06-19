import { useParams } from "react-router-dom";

export default function Country(props) {
  const { country_code } = useParams();

  console.log(`Country.render()`);
  return(
    <>
      <h2>[{ country_code }]</h2>
    </>
  );
}