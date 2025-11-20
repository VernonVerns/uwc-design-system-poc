import { Theme } from '@carbon/react';
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ToastProvider } from './components/ToastProvider';

function App() {
	return (
		<Theme theme="white"> {/* Carbon base: white | g10 | g90 | g100 */}
			<ToastProvider>
				<RouterProvider router={router} />
			</ToastProvider>
		</Theme>
	)
}

export default App
