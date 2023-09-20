import { Outlet } from "react-router-dom";
import Header from "./Header";
import IndexPage from './pages/IndexPage'

export default function Layout(){
    return (
        <main>
            <Header />
            <Outlet/>
        </main>
    )
}