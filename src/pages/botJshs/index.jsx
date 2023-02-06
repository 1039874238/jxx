import { connect } from 'dva';
import { Button, Space, Upload,message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const mapStateToProps = state => ({
  ...state.haishiModel,
});

export default connect(mapStateToProps)(props => {
    const configProps = {
        name: 'students',
        accept:'.xlsx',
        showUploadList:false,
        action: 'api/jshs/uploadUserList',
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
  return (
    <>
      <div className="option_box">
        <Space>
          <Button type="primary">查询</Button>
          <Upload {...configProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {/* <Button type="primary">新增</Button> */}
        </Space>
      </div>
    </>
  );
});
