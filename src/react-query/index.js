import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

const Provider = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Provider;