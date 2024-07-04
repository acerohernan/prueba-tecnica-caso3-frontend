import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "./components/ui/toaster";

import { router } from "./router";

function App() {
	return (
		<Suspense>
			<RouterProvider router={router} />
			<Toaster />
		</Suspense>
	);
}

export default App;
