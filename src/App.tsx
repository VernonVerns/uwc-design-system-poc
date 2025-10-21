import { Theme } from '@carbon/react';
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
	return (
		<Theme theme="g10"> {/* Carbon base: white | g10 | g90 | g100 */}
			<RouterProvider router={router} />
		</Theme>
	)
}

export default App
