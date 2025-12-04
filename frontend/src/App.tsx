import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";
import './App.css'
import './styles/generalStyling.css';
import './styles/buttonStyling.css';

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
