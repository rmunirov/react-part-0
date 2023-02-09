import styles from "./App.module.scss";
import classNames from "classnames/bind";
import React from "react";
import MainPage from "./pages/main";
import { Provider } from "react-redux";
import store from "./__data__/store";

const cn = classNames.bind(styles);
const CLASS_NAME = "App";

function App() {
    return (
        <Provider store={store}>
            <div className={cn(CLASS_NAME)}>
                <MainPage />
            </div>
        </Provider>
    );
}

export default App;
