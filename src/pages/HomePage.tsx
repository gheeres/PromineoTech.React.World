import FilterableCountryTable from "../components/FilterableCountryTable";
import withLoading from "../components/withLoading";

type HomePageProps = {
};

export default function HomePage({ ...props }: HomePageProps) {


  const LoadingFilterableCountryTable = FilterableCountryTable; //withLoading(FilterableCountryTable);
  return(
    <>
      <h1>Countries of the World</h1>
      <p>Lets take a little journey...</p>
      
      <LoadingFilterableCountryTable />
    </>
  );
}