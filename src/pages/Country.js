import { useParams } from 'react-router-dom';

export default function Country(props) {
  const { country } = useParams();

  return(
    <>
     <h2>Country</h2>
     { country }
    </>
  );
}