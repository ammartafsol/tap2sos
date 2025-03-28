import { CiGrid41 } from "react-icons/ci";
import { FaClinicMedical } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";




export const  sidebarData = [
    {
        _id:1,
        name:'Dashboard',
        icon:CiGrid41,
        link:'/'
    },
    {
        _id:2,
        name:'Clinic Management',
        icon:FaClinicMedical ,
        link:'/clinic-management',
    },
    {
        _id:3,
        name:'Profile',
        icon:CiSettings,
        link:'/profile-setting'
    },
]