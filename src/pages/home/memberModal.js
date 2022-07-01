import { Modal, Form, Input, Select, message } from 'antd';
import { connect } from 'dva'
import { useEffect, useState } from 'react';
const mapStateToProps = (state) => ({
    memberModel: state.memberModel,
})
const { Option } = Select;

export default connect(mapStateToProps)((props) => {
    const [form] = Form.useForm();
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
        position: 0,
        status: 0
    })

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        props.closeModal();
    };
    const onFinish = (values) => {
        let type = 'memberModel/createMember'
        if (props.config.title === '修改') {
            type = 'memberModel/updateMember'
        }
        props.dispatch({
            type,
            payload: values
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
            <Modal title={props.config.title} visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={initValue}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="村庄名称"
                        name="memberName"
                        rules={[
                            {
                                required: true,
                                message: '请输入村庄名称',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="村庄标签"
                        name="memberTag"
                        rules={[
                            {
                                required: true,
                                message: '请输入村庄标签',
                            },
                        ]}
                    >
                        <Input disabled={props.config.title === '修改'} />
                    </Form.Item>

                    <Form.Item
                        label="职位"
                        name="position"
                        rules={[
                            {
                                required: true,
                                message: '请选择职位',
                            },
                        ]}
                    >
                        <Select style={{ width: 120 }}>
                            <Option value={0}>成员</Option>
                            <Option value={1}>长老</Option>
                            <Option value={2}>副首领</Option>

                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="部落"
                        name="status"
                        rules={[
                            {
                                required: true,
                                message: '请选择部落',
                            },
                        ]}
                    >
                        <Select style={{ width: 120 }}>
                            <Option value={0}>海天盛宴。</Option>
                            <Option value={1}>已退出</Option>

                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
})