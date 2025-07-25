import Avatar from "./Avatar";
import Name from "./Name";

export default function Profile() {
  console.log(`Profile()`)  ;
  return(
    <>
      <div className="card">
        <div className="card-body">
          <Avatar />
          <Name name="George Heeres" />
        </div>
      </div>
    </>
  );
}