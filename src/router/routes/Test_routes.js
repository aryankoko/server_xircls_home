import Skin_type_form from "../../views/test/Skin_type_form"
import Template from "../../views/test/Template"

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
        path: '/template',
        element: <Template />
    }
]