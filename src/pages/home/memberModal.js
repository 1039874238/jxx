import { Modal, Form, Input, Row,Col, message,Space  } from 'antd';
import { connect } from 'dva'
import { useEffect, useState } from 'react';
const mapStateToProps = (state) => ({
    projectModel: state.projectModel,
})

export default connect(mapStateToProps)((props) => {
    const [form] = Form.useForm();
    const [project,setProject] = useState([
        {
            teachPlanCourseId:8590,
            contentType:11,
            maxTime:720,
            contentId:'kcjs_1_2',
            courseName:'领导力与管理沟通(专升本)'
        }
    ])
    useEffect(() => {
        if (props.config.title === '修改') {
            const { record } = props.config
            const initValue = {
                memberName: record.memberName,
                memberTag: record.memberTag,
                position: record.position,
                status: record.status,
            }
            delete initValue.key
            form.setFieldsValue(initValue)
        } else {
            form.resetFields()
        }
    }, [form, props.config])
    const [initValue] = useState({
        cookies:''
    })

    const getProject = (value)=>{
        props.dispatch({
            type:'projectModel/getProjectWithCookie',
            payload:{cookie:value}
        })
        console.log(value);
        const initValue = {
            8590:{
            contentType:11,
            maxTime:720,
            contentId:'kcjs_1_2',
            courseName:'领导力与管理沟通(专升本)'
            }
        }
        form.setFieldsValue(initValue)
    }

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        props.closeModal();
    };

    const onFinish = (values) => {
        let cookie = values.cookie
        let userInfo = values.userInfo
        delete values.cookie
        delete values.userInfo
       let params =  Object.keys(values).map(item=>{
            return {...values[item],teachPlanCourseId:item,cookie,userInfo}
        })
        let type = 'projectModel/createProject'
        if (props.config.title === '修改') {
            type = 'projectModel/updateProject'
        }
        props.dispatch({
            type,
            payload: params
        })
            .then(res => {
                if (res.state === 200) {
                    message.success(res.msg)
                    handleCancel()
                    props.onSearch()
                } else {
                    message.warn(res.msg)
                }
            })
    };

    return (
        <>
            <Modal title={props.config.title} visible={props.visible} onOk={handleOk} onCancel={handleCancel} width={800}>
                <Form
                    form={form}
                    name="basic"
                    initialValues={initValue}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={8}>
                        <Col span={12}>
                        <Form.Item
                        label="学员信息"
                        name="userInfo"
                    >
                        <Input/>
                    </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Form.Item
                        label="Cookie"
                        name="cookie"
                        rules={[
                            {
                                required: true,
                                message: '请输入Cookie',
                            },
                        ]}
                    >
                        <Input.Search  rows={2} onSearch={getProject}/>
                    </Form.Item>
                        </Col>
                    </Row>
                    {project.length>0 && <Space direction="vertical" style={{display: 'flex'}}>
                        <Row gutter={8}>
                            <Col span={6}>科目</Col>
                            <Col span={6}>章节ID</Col>
                            <Col span={6}>内容类型</Col>
                            <Col span={6}>视频时长(秒)</Col>
                        </Row>
                        {project.map(item=>(
                            <Form.Item>
                            <Input.Group>
                                <Row gutter={8}>
                                    <Col span={6}>
                                    <Form.Item
                                            name={[item.teachPlanCourseId,'courseName']}
                                        >
                                        <Input disabled/>
                                      </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name={[item.teachPlanCourseId,'contentId']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入章节ID',
                                                },
                                            ]}
                                        >
                                        <Input disabled={props.config.title === '修改'} />
                                      </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name={[item.teachPlanCourseId,'contentType']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入内容类型',
                                                },
                                            ]}
                                        >
                                        <Input disabled={props.config.title === '修改'} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name={[item.teachPlanCourseId,'maxTime']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入视频时长(秒)',
                                                },
                                            ]}
                                        >
                                        <Input disabled={props.config.title === '修改'} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                        </Input.Group>
                        </Form.Item>
                        ))}
                    </Space>}
                </Form>
            </Modal>
        </>
    );
})