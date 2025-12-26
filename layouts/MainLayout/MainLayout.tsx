import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return <div>
        <div>Main Layout</div>
        <Outlet />
    </div>;
}