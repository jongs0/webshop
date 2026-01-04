import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import './styles/general/generalStyling.css';
import './styles/general/buttonStyling.css';
import './styles/pages/homepageStyling.css';
import './styles/general/imageStyling.css';
import './styles/general/colorStyling.css';
import './styles/general/spacingStyling.css';
import './styles/components/formStyling.css';
import './styles/components/listStyling.css';





export const API_URL = "http://localhost:8080";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}

export default App
