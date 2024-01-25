import Skin_type_form from "../../views/test/codeSkin/Skin_type_form"
import OtpinManage from "../../views/test/Templates/OtpinManage"
import Template from "../../views/test/Templates/Template"
import WAbusinessTable from "../../views/test/Templates/components/WAbusinessTable"
import EmbededSignup from "../../views/test/Templates/EmbededSignup"
import Test from "../../views/test/Test"

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
        path: '/test',
        element: <Test />
    }
]