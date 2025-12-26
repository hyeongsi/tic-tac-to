import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import PlayLayout from "../layouts/PlayLayout/PlayLayout";
import Home from "../pages/Home/Home";
import { lazy, Suspense, type JSX } from "react";
import MainLayoutError from "../pages/Error/MainLayoutError";
import PlayLayoutError from "../pages/Error/PlayLayoutError";
import NotFound from "../pages/Error/NotFound";
import Settings from "../pages/Home/Settings/Settings";
import HowToPlay from "../pages/Home/HowToPlay/HowToPlay";

//React.lazy 특징
// 1. 동적 import 사용 -> 번들 크기 줄이고 초기 로딩 속도 개선
// 2. default export만 지원 -> named export는 바로 사용 불가 (별도 래퍼 필요)
// 3. Promise를 반환 -> 컴포넌트 로딩이 완료될 때까지 기다림
const Play = lazy(() => import("../pages/Play/Play"));

function withErrorBoundayAndSuspense(Component: React.LazyExoticComponent<() => JSX.Element>) {
    // Suspense (lazy로 로딩되는 컴포넌트를 감싸고, 로딩 중 보여줄 fallback UI를 제공하는 역할)
    // Suspense 특징 
    // 1. fallback에 로딩 UI 지정 가능 (div, 스피너, skeleton 등)
    // 2. Suspense로 감싸지 않으면 lazy 컴포넌트는 에러 발생
    // 3. 중첩 가능 -> 레이아웃 전체를 감싸거나 페이지별로 부분 감싸기 가능
    return (
        // <ErrorBoundary fallback={<div>로딩 실패! 다시 시도하세요.</div>}>
            <Suspense fallback={<div>Loading...</div>}>
                <Component />
            </Suspense>
        // </ErrorBoundary>
    );
}

// lazy + Suspense 연관성
// React.lazy로 지연 로딩된 컴포넌트는 반드시 Suspense 안에서 사용해야 함
// Suspense는 로딩 상태를 감지하여 fallback을 보여주고, 로딩 완료되면 컴포넌트 렌더링
// 둘은 함께 사용해야만 안전하게 동적 import 가능

const router = createBrowserRouter([
    {
        element: <MainLayout/>,
        errorElement: <MainLayoutError />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/howToPlay", element: <HowToPlay /> },
            { path: "/settings", element: <Settings /> }
        ]
    },
    {
        element: <PlayLayout />,
        errorElement: <PlayLayoutError />,
        children: [
            {path: "/play", element: withErrorBoundayAndSuspense(Play) }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

export default router;