import Skin_type_form from "../../views/test/codeSkin/Skin_type_form"
import OtpinManage from "../../views/test/Templates/OtpinManage"
import TemplateUI from "../../views/test/Templates/TemplateUI/TemplateUI"
import WAbusinessTable from "../../views/test/Templates/components/WAbusinessTable"
import EmbededSignup from "../../views/test/Templates/EmbededSignup"
import Test from "../../views/test/Test"
import CreateTemplate from "../../views/test/Templates/CreateTemplate"
import CodeUserData from "../../views/test/codeSkin/CodeUserData"
import CodeUserDetails from "../../views/test/codeSkin/CodeUserDetails"
import EditTemplate from "../../views/test/Templates/EditTemplate"

export const Test_routes = [
    {
        path: '/codeskin/skin-type-test',
        element: <Skin_type_form />,
        meta: {
            layout: "NewBlank",
            publicRoute: true
        }
    },
    {
        path: '/template/message',
        element: <TemplateUI />
    },
    {
        path: '/template/optinManage',
        element: <OtpinManage />
    },
    {
        path: '/template/WAbusinessTable',
        element: <WAbusinessTable />
    },
    {
        path: '/template/EmbededSignup',
        element: <EmbededSignup />
    },
    {
        path: '/template/createTemplate',
        element: <CreateTemplate />
    },
    {
        path: '/template/editTemplate/:templateID',
        element: <EditTemplate />
    },
    {
        path: '/codeskin',
        element: <CodeUserData />
    },
    {
        path: '/codeskin-user/:id',
        element: <CodeUserDetails />
    },
    {
        path: '/test',
        element: <Test />,
        meta: {
            publicRoute: true
        }
    }
]