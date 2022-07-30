import LoginPage from "@/pages/LoginPage";
import DashboardPage from '@/pages/DashboardPage'
//import ProductListPage from '@/pages/productListPage'
import ProductListPageWithComp from '@/pages/ProductListPageWithComp'

export const routes = [
    {
        path:"/",
        component:LoginPage
    },
    {
        path:"/dashboard",
        component: DashboardPage,
        meta:{
            auth:true,
            guard:"dashboard"
        },
        beforeEnter:(to, from,next) =>{
            if (!localStorage.getItem("userAuth")){
                next("/")
            }
            next()
                
        },
        children:[{
            path:"",
            component: ProductListPageWithComp,
    
        }]

    }

]