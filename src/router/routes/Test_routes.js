import Skin_type_form from "../../views/test/codeSkin/Skin_type_form"
import OtpinManage from "../../views/test/Templates/OtpinManage"
import Template from "../../views/test/Templates/Template"
import WAbusinessTable from "../../views/test/Templates/components/WAbusinessTable"
import EmbededSignup from "../../views/test/Templates/EmbededSignup"
import Test from "../../views/test/Test"
import CreateTemplate from "../../views/test/Templates/CreateTemplate"
import CodeUserData from "../../views/test/codeSkin/CodeUserData"
import CodeUserDetails from "../../views/test/codeSkin/CodeUserDetails"

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
        element: <Template />
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