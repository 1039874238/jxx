import { connect } from 'dva';
import { useMount } from 'ahooks';
import { Form, Input, Button, message, Switch,InputNumber  } from 'antd';
import { useState } from 'react';
const mapStateToProps = state => ({
    ...state.techModel,
});

export default connect(mapStateToProps)(props => {

    const [settingForm] = Form.useForm();
    const noticeValue = Form.useWatch('notice', settingForm);
    const [configId, setConfigId] = useState(null)

    useMount(() => {
        getConfig()
    })
    const goToApi = () => {
        window.open('https://www.345api.cn/user/doc?id=4')
    }

    const goToWx = () => {
        window.open('https://work.weixin.qq.com/wework_admin/loginpage_wx?from=myhome')
    }

    const handleSave = () => {
        settingForm.validateFields()
            .then((values) => {
                props.dispatch({
                    type: 'techModel/updateConfig',
                    payload: { ...values, ...(configId && { id: configId }) }
                })
                    .then(res => {
                        if (res.state === 200) {
                            message.success(res.msg)
                            getConfig()
                        }
                    })
            })
    }
    const getConfig = () => {
        props.dispatch({
            type: 'techModel/getConfig'
        })
            .then(res => {
                if (res.data.length > 0) {
                    settingForm.setFieldsValue({
                      maxRunNum: res.data[0].maxRunNum,
                        apiKey: res.data[0].apiKey,
                        notice: res.data[0].notice,
                        wxCompanyId: res.data[0].wxCompanyId,
                        wxAppId: res.data[0].wxAppId,
                        wxSecret: res.data[0].wxSecret,
                    })
                    setConfigId(res.data[0]._id)
                }
            })
    }

    return (
        <>
            <Form layout={'vertical'} form={settingForm}>
                <Form.Item
                    name="maxRunNum"
                    label="最大执行脚本数量"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber min={1} max={1000} precision={0}/>
                </Form.Item>
                <Form.Item
                    name="apiKey"
                    label="验证码识别Key"
                    help={<Button type='link' onClick={goToApi}>没有Key,去注册</Button>}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="notice"
                    label="通知"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                {noticeValue && <>
                    <h3>配置企业微信</h3>
                    <Button type='link' onClick={goToWx}>没有企业微信,去注册</Button>
                    <Form.Item
                        name="wxCompanyId"
                        label="企业ID"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="wxAppId"
                        label="应用ID"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="wxSecret"
                        label="应用Secret"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </>}
                <Form.Item
                >
                    <Button type='primary' onClick={handleSave}>保存</Button>
                </Form.Item>
            </Form>
        </>
    )
})
