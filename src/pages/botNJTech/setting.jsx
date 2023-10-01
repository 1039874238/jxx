import { connect } from 'dva';
import { useMount } from 'ahooks';
import { Form, Input, Button } from 'antd';
const mapStateToProps = state => ({
    ...state.techModel,
});

export default connect(mapStateToProps)(props => {

    const [settingForm] = Form.useForm();

    useMount(() => {
        getConfig()
    })

    const handleSave = () => {
        settingForm.validateFields()
            .then((values) => {
                console.log(values);
                props.dispatch({
                    type: 'techModel/updateConfig',
                    payload: values
                })
                    .then(res => {
                        console.log(res);
                    })
            })
    }
    const getConfig = () => {
        props.dispatch({
            type: 'techModel/getConfig'
        })
            .then(res => {
                if(res.data.length>0){
                    settingForm.apiKey = res.data[0].apiKey
                }
            })
    }

    return (
        <>
            <Form layout={'vertical'} form={settingForm}>
                <Form.Item
                    name="apiKey"
                    label="验证码识别Key"
                    help={<Button type='link'>没有Key,去注册</Button>}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                >
                    <Button type='primary' onClick={handleSave}>保存</Button>
                </Form.Item>
            </Form>
        </>
    )
})