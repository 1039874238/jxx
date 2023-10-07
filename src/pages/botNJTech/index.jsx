import { useState } from 'react';
import { useMount } from 'ahooks';
import { connect } from 'dva';
import { Button, Switch, Upload, message, Modal, Input, Tabs, Card, Form, Tooltip, Empty, Row, Col, Popconfirm } from 'antd';
import { PlusOutlined, CloudUploadOutlined, DesktopOutlined, ChromeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Style from './index.less'
import { Space } from 'antd';
import DataManagement from './dataManagement';
import Setting from './setting';

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
  const [browserType, setBrowserType] = useState('new')
  const [browserId, setBrowserId] = useState(null)
  const [botForm] = Form.useForm();
  const [browserForm] = Form.useForm();

  const uploadProps = {
    name: 'students',
    accept: '.xlsx',
    showUploadList: false,
    action: 'autoLearnApi/bot/uploadUserList',
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
  const openBroModel = (botName, type, row) => {
    setBrowserType(type)
    if (type === 'edit') {
      setBrowserId(row._id)
      browserForm.setFieldsValue({
        key: row.key,
        path: row.path,
        model: row.model === 'new' ? false : true
      })
    } else {
      setBrowserId(null)
    }
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
        const params = { ...values, botName }
        if (browserType === 'edit') {
          params.id = browserId
        }
        if (!params.model) {
          params.model = 'new'
        }
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
    botForm.resetFields();
    browserForm.resetFields();
  };

  const deleteBot = (botName) => {
    props.dispatch({
      type: 'techModel/deleteBot',
      payload: {
        botName
      }
    })
      .then(res => {
        if (res.state === 200) {
          getBot()
          message.success(res.msg)
        } else {
          message.error(res.msg)
        }
      })
  }

  const deleteBrowser = (browser) => {
    props.dispatch({
      type: 'techModel/deleteBrowser',
      payload: {
        id: browser._id,
        botName: browser.botName,
        key: browser.key
      }
    })
      .then(res => {
        if (res.state === 200) {
          getBot()
        }
      })
  }


  const items = [
    {
      label: `设备管理`,
      key: 1,
      children: (
        <>
          <div className={Style.options}>
            <Space>
              <Button type='primary' onClick={showModal}>新增</Button>
              <Upload {...uploadProps} data={{ type: '0' }}>
                <Button icon={<CloudUploadOutlined />} >
                  导入
                </Button>
              </Upload>
              <Button type='primary' onClick={getBot}>刷新</Button>
            </Space>
          </div>
          <div className={Style.botBox}>
            {botList.length === 0 && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <Empty /></div>}
            {botList.map(item => (
              <Card title={<>
                <DesktopOutlined />
                <Tooltip title={`密钥：${item.botKey}`}>
                  <span style={{ marginLeft: '8px' }}>{item.botName}</span>
                </Tooltip>
              </>} extra={<>
                <div style={{ display: 'flex' }}>
                  <Tooltip title="新增浏览器">
                    {item?.browser.length < 8 && <Button type='link' icon={<PlusOutlined />} onClick={() => { openBroModel(item.botName, 'new') }} />}
                  </Tooltip>
                  <Tooltip title="导入数据">
                    <Upload {...uploadProps} data={{ type: '1', botName: item.botName }}>
                      <Button type='link' icon={<CloudUploadOutlined />} />
                    </Upload>
                  </Tooltip>
                  <Tooltip title="删除">
                    {item.browser.length === 0 && <Button type='link' icon={<DeleteOutlined />} onClick={() => { deleteBot(item.botName) }} />}
                  </Tooltip>
                </div>
              </>} className={Style.botitems}>
                {item?.browser.length === 0 ?
                  <Empty /> : <Row gutter={10}>
                    {item.browser.map(value => (
                      <Col span={24}>
                        <div className={Style.browserItem}>
                          <div className={value.status === '0' ? '' : Style.active}>
                            <ChromeOutlined />
                            <span style={{ marginLeft: '8px' }}>{value.key}</span>
                          </div>
                          <div style={{ display: 'flex' }}>
                            <Tooltip title="导入数据">
                              <Upload {...uploadProps} data={{ type: '2', botName: item.botName, key: value.key }}>
                                <Button type='link' icon={<CloudUploadOutlined />} />
                              </Upload>
                            </Tooltip>
                            <Tooltip title="修改">
                              <Button type='link' icon={<EditOutlined />} onClick={() => { openBroModel(item.botName, 'edit', value) }} />
                            </Tooltip>
                            <Popconfirm
                              title="此操作将删除该浏览器及该浏览器下所有的数据"
                              onConfirm={() => { deleteBrowser(value) }}
                              okText="确认"
                              cancelText="取消"
                            >
                              <Tooltip title="删除">
                                <Button disabled={value.status === '1'} type='link' icon={<DeleteOutlined />} />
                              </Tooltip>
                            </Popconfirm>

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
          <DataManagement />
        </>
      ),
    },
    {
      label: `设置`,
      key: 3,
      children: (
        <>
          <Setting />
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
            <Input disabled={browserType === 'edit'} />
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
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});
