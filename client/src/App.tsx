// import Layout from "./Layout";

// export default function App() {
//   return (
//     <div>
//       <Layout>Hello Sidebar</Layout>
//     </div>
//   );
// }

import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AppLayout } from "@/components/layout/app-layout";

export default function App() {
  return (
    <AppLayout>
      <RouterProvider router={router} />
    </AppLayout>
  );
}
