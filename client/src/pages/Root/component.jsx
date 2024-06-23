import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";

export default function RootLayout() {
    return(
        <>
            <Header/>
            <section className="pb-main-content-wrapper">
                <SideNav/>
                <Outlet/>
            </section>
        </>
    )
}