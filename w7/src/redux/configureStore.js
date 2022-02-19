import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createBrowserHistory } from "history"
import { connectRouter } from "connected-react-router"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// modules import
import User from "./modules/user"
import Post from "./modules/post"

export const history = createBrowserHistory()

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["post", "user"]
};

const rootReducer = combineReducers({
	user: User,
	post: Post,
	router: connectRouter(history),
})

const perReducer = persistReducer(persistConfig, rootReducer);

// middleware
const middlewares = [thunk.withExtraArgument({ history: history })]

// redux-logger
const env = process.env.NODE_ENV
if (env === "development") {
	const { logger } = require("redux-logger")
	middlewares.push(logger)
}

// redux dev-tools
const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		})
		: compose

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

// store
let store = initialStore => createStore(perReducer, enhancer)

export default store()
