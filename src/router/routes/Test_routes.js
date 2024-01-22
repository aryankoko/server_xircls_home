import Skin_type_form from "../../views/test/codeSkin/Skin_type_form"
import OtpinManage from "../../views/test/Templates/OtpinManage"
import Template from "../../views/test/Templates/Template"
import WAbusinessTable from "../../views/test/Templates/components/WAbusinessTable"

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
    }
]