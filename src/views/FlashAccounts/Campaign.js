import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'

const Campaign = () => {

    // const columns = [
    //     {
    //         name: 'Campaign',
    //         selector: row => {
    //             return (
    //                 <>{row.campaign_name}</>
    //             )
    //         },
    //         type: "text",
    //         isEnable: true
    //     },
    //     {
    //         name: 'Status',
    //         selector: row => {
    //             if (row.theme_name.is_draft === 0) {
    //                 return (
    //                     <div className="m-auto form-check form-switch form-check-success cursor-pointer p-0 m-0" style={{ filter: `drop-shadow(0px 0px 7.5px rgba(40, 199, 111, ${row.theme_name.is_active ? "0.5" : "0"}))` }}>
    //                         <input onChange={() => {
    //                             setCurrDetails(row.theme_name)
    //                             const getUrl = new URL(`${SuperLeadzBaseURL}/api/v1/get/active-template/`)
    //                             const form_data = new FormData()
    //                             form_data.append("shop", outletData[0]?.web_url)
    //                             form_data.append("app", "superleadz")
    //                             form_data.append('theme_id', row.theme_name.id)
    //                             form_data.append('campaign_name', row.theme_name.campaign_name)
    //                             axios({
    //                                 method: "POST",
    //                                 url: getUrl,
    //                                 data: form_data
    //                             }).then((data) => {
    //                                 // data.data.response.forEach(row => {
    //                                 //     newArr.push(row.theme_name.
    //                                 // })
    //                                 if ((data.data.response.length === 0) || (data.data.response.length > 0 && activeThemes.includes(row.theme_name.id))) {
    //                                     setModal1(true)
    //                                 } else {
    //                                     setConflictThemes([...data.data.response])
    //                                     setConflictModal(true)
    //                                 }
    //                             }).catch((err) => {
    //                                 console.log({ err })
    //                             })
    //                         }} type='checkbox' checked={activeThemes.includes(row.theme_name.id)} className='form-check-input cursor-pointer m-0' />
    //                     </div>
    //                 )
    //             } else {
    //                 return (
    //                     <div className='text-warning m-auto'>Draft</div>
    //                 )
    //             }
    //         },
    //         type: 'select',
    //         options: [
    //             { label: "Select", value: "" },
    //             { label: "Active", value: 1 },
    //             { label: "Inactive", value: 0 },
    //             { label: "Draft", value: "is_draft" }
    //         ],
    //         isEnable: true
    //         // new Date(row.theme_name.created_at).toUTCString().replace("GMT", "")
    //     },
    //     {
    //         name: 'Campaign',
    //         selector: row => {
    //             return (
    //                 <>{row.campaign_name}</>
    //             )
    //         },
    //         type: "text",
    //         isEnable: true
    //     }
    // ]

    return (
        <Row>
            <Col md="12">
                <Card>
                    <CardBody>
                        <AdvanceServerSide
                            tableName={"Campaign Details"}
                            tableCol={columns}
                            data={allCampaigns}
                            isLoading={isLoading}
                            count={count}
                            advanceFilter={true}
                            isExpand={true}
                            ExpandableTable={ExpandedData}
                            getData={getAllThemes}
                            selectableRows={true}
                            selectedRows={checkedThemes}
                            setSelectedRows={setCheckedThemes}
                            deleteContent={deleteContent}
                            viewType={viewType}
                            create={create}
                            createLink={"/merchant/SuperLeadz/Themes/"}
                            createText={"Create Campaign"}
                        />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Campaign