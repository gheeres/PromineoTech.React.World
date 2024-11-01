type LoadingProps = {
  text?: string,
};
export default function Loading({ text = 'Loading...', ...props }: LoadingProps) {
  return(
    <div className="d-flex align-items-center m-3">
      <strong className="text-info">{ text }</strong>
      <div className="spinner-border spinner-border-sm text-info ms-auto" role="status" aria-hidden="true"></div>
    </div>      
  );
}