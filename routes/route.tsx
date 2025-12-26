import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import PlayLayout from "../layouts/PlayLayout/PlayLayout";
import Home from "../pages/Home";
import { lazy, Suspense, type JSX } from "react";

const Play = lazy(() => import("../pages/Play"));

function withSuspense(Component: React.LazyExoticComponent<() => JSX.Element>) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component />
        </Suspense>
    );
}

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {path: "/", element: <Home /> }
        ]
    },
    {
        element: <PlayLayout />,
        children: [
            {path: "/play", element: withSuspense(Play) }
        ]
    }
]);

export default router;