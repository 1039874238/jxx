import { useState } from 'react';
import { useMount } from 'ahooks';
import { connect } from 'dva';
import { Button, Switch, Upload, message, Table, Select, Modal, Input, Tabs, Card, Form, Tooltip, Empty, Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined, CloudUploadOutlined, DesktopOutlined, ChromeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Style from './index.less'

const mapStateToProps = state => ({
  ...state.techModel,
});
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};

export default connect(mapStateToProps)(props => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [browserVisible, setBrowserVisible] = useState(false);
  const [botName, setBotName] = useState('');
  const [botList, setBotList] = useState([])
  const [botForm] = Form.useForm();
  const [browserForm] = Form.useForm();

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 导入成功！`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 导入失败！`);
      }
    },
  };

  useMount(() => {
    getBot()
  })
  const showModal = () => {
    setIsModalOpen(true);
  };
  const getBot = () => {
    props.dispatch({
      type: 'techModel/getBot',
    })
      .then(res => {
        setBotList(res.data)
      })
  }
  const openBroModel = (botName) => {
    setBotName(botName)
    setBrowserVisible(true)
  }
  const handleOk = () => {
    botForm
      .validateFields()
      .then((values) => {
        console.log(values);
        props.dispatch({
          type: 'techModel/addBot',
          payload: values
        })
          .then(res => {
            if (res.state === 200) {
              getBot()
              botForm.resetFields();
              handleCancel()
              message.success(res.msg)
            } else {
              message.error(res.msg)
            }
          })
      })
  };
  const handleBroOk = () => {
    browserForm
      .validateFields()
      .then((values) => {
        console.log(values);
        const params = { ...values, botName }
        props.dispatch({
          type: 'techModel/addBrowser',
          payload: params
        })
          .then(res => {
            if (res.state === 200) {
              getBot()
              browserForm.resetFields();
              handleCancel()
              message.success(res.msg)
            } else {
              message.error(res.msg)
            }
          })
      })
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setBrowserVisible(false);
  };


  const items = [
    {
      label: `设备管理`,
      key: 1,
      children: (
        <>
          <div className={Style.options}>
            <Button type='primary' onClick={showModal}>新增</Button>
          </div>
          <div className={Style.botBox}>
            {botList.map(item => (
              <Card title={<>
                <DesktopOutlined />
                <Tooltip title={`密钥：${item.botKey}`}>
                  <span style={{ marginLeft: '8px' }}>{item.botName}</span>
                </Tooltip>
              </>} extra={<>
              <div style={{display:'flex'}}>
                <Tooltip title="新增浏览器">
                  {item?.browser.length < 8 && <Button type='link' icon={<PlusOutlined />} onClick={() => { openBroModel(item.botName) }} />}
                </Tooltip>
                <Tooltip title="导入数据">
                  <Upload {...uploadProps}>
                    <Button type='link' icon={<CloudUploadOutlined />} />
                  </Upload>
                </Tooltip>
                <Tooltip title="删除">
                  <Button type='link' icon={<DeleteOutlined />} />
                </Tooltip>
              </div>
              </>} className={Style.botitems}>
                {item?.browser.length === 0 ?
                  <Empty /> : <Row gutter={10}>
                    {item.browser.map(value => (
                      <Col span={24}>
                        <div className={Style.browserItem}>
                          <div>
                            <ChromeOutlined />
                            <span style={{ marginLeft: '8px' }}>{value.key}</span>
                          </div>
                          <div style={{ display: 'flex' }}>
                            <Tooltip title="导入数据">
                              <Upload {...uploadProps}>
                                <Button type='link' icon={<CloudUploadOutlined />} />
                              </Upload>
                            </Tooltip>
                            <Tooltip title="删除">
                              <Button type='link' icon={<DeleteOutlined />} />
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                }

              </Card>
            ))}
          </div>
        </>
      ),
    },
    {
      label: `数据管理`,
      key: 2,
      children: (
        <>
          <div className={Style.options}>
            <Button type='primary'>新增</Button>
          </div>
        </>
      ),
    }
  ]

  return (
    <>
      <div className={Style.pageMain}>
        <Tabs tabPosition="left" items={items}>
        </Tabs>
      </div>
      <Modal title="新增设备" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form {...layout} form={botForm}>
          <Form.Item
            name="botName"
            label="设备名称"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="botKey"
            label="设备密钥"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="新增浏览器" open={browserVisible} onOk={handleBroOk} onCancel={handleCancel}>
        <Form {...layout} form={browserForm}>
          <Form.Item
            name="key"
            label="浏览器名称"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="path"
            label="浏览器地址"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="model"
            label="调试模式"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});
