import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "./components/ui/toaster";

import { router } from "./router";
import { store } from "./store";

const queryClient = new QueryClient();

function App() {
	return (
		<Suspense>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<RouterProvider router={router} />
					<Toaster />
				</Provider>
			</QueryClientProvider>
		</Suspense>
	);
}

export default App;
