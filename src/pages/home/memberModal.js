import { Modal, Form, Input, Button } from 'antd';

const App = (props) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
        handleCancel()
    };

    const handleCancel = () => {
        props.closeModal();
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <>
            <Modal title="Basic Modal" visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default App;