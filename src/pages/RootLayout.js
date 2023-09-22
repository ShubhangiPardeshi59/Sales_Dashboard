import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";
import { Outlet ,useNavigation} from "react-router-dom";


export default function RootLayout() {
 // const navigation = useNavigation();
//console.log(navigation.state);

  return (
   <div className="main">
    <Sidebar />
    <div className="rightSide">
      <Header />
      <main>
      {/* {navigation.state === 'loading' && <h1>Loading...</h1>} */}
      <Outlet />
      </main>
    </div>
  </div>
  );
}

// export async function loader(){
//   const response = await fetch("http://localhost:8000/sales");

//   if(!response.ok){
//     throw json(
//       {message:"Could not fetch data."},
//       {status:500}
//     )
//   }
//   else{
//     return response
//   }
// }
