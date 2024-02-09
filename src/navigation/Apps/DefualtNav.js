import { Home } from "react-feather"
import { ownUrl } from "../../views/Validator"

export const DefaultNav = [
    {
        id: 'home',
        title: 'Home',
        icon: <Home size={20} />,
        navLink: '/merchant/home/'
    },
    {
        id: 'app',
        title: 'Apps',
        icon: <img style={{marginRight: '18px'}} src={`${ownUrl}/images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/merchant/apps/'
    },
    {
        id: 'Manage',
        title: 'Template',
        icon: <img style={{marginRight: '18px'}} src={`${ownUrl}/images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/template/message'
    },
    {
        id: 'optinManage',
        title: 'Optin Management',
        icon: <img style={{marginRight: '18px'}} src={`${ownUrl}/images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/template/optinManage'
    },
    {
        id: 'WAbusinessTable',
        title: 'WA business Table',
        icon: <img style={{marginRight: '18px'}} src={`${ownUrl}/images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/template/WAbusinessTable'
    },
    {
        id: 'createTemplate',
        title: 'Create Template',
        icon: <img style={{marginRight: '18px'}} src={`${ownUrl}/images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/template/createTemplate'
    },
    {
        id: 'EmbededSignup',
        title: 'Embeded    Signup',
        icon: <img style={{marginRight: '18px'}} src={`${ownUrl}/images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/template/EmbededSignup'
    },
    {
        id: 'codeskin',
        title: 'codeskin',
        icon: <img style={{marginRight: '18px'}} src={`${ownUrl}/images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/codeskin'
    },
    {
        id: 'codeskin',
        title: 'user details',
        icon: <img style={{marginRight: '18px'}} src={`${ownUrl}/images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/codeskin-user/:id'
    },
    {
        id: 'test',
        title: 'Tessst',
        icon: <img style={{marginRight: '18px'}} src={`${ownUrl}/images/website-slide/navbar/customer_group.png`} width='16px' />,
        navLink: '/test'
    }
]