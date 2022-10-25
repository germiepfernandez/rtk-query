import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MantineProvider } from "@mantine/core";
import { persistStore } from "redux-persist";
import { store } from "./redux/store";
import { theme } from "./theme";
import { PokemonPage, TaskPage } from "./pages";
import AppContainer from "./layout/AppContainer";
import { TaskAPIPage } from "./pages/tasks_api/TaskAPIPage";
import { NotificationsProvider } from "@mantine/notifications";

const persistor = persistStore(store);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
					<NotificationsProvider position="top-right">
						<BrowserRouter>
							<Routes>
								<Route path="/" element={<AppContainer />}>
									<Route path="/tasks-slice" element={<TaskPage />}></Route>
									<Route path="/tasks-service" element={<TaskAPIPage />}></Route>
									<Route path="/pokemon" element={<PokemonPage />}></Route>
								</Route>
							</Routes>
						</BrowserRouter>
					</NotificationsProvider>
				</MantineProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
