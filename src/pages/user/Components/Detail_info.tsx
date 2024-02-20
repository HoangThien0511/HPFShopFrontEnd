import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  
  const onFinish = (values: any) => {
      console.log('Success:', values);
  };  
  
  const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
  };

type Props = {}

const Detail_info = (props: Props) => {


    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const [loading, setLoading] = useState(false);
    
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    


  return (
    <div>
        <div className="title_content">
            <b>Quản lý thông tin cá nhân</b>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản !</p>
        </div>
        <div className="info_content">
            <div className="col-md-8 col-12 form_info">
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Tên đăng nhập:"
                        name="user"
                        initialValue={"Ductham087"}
                    >
                        <Input
                            disabled={true}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Họ và tên:"
                        name="user_name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email:"
                        name="user_email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại:"
                        name="user_phoneNumber"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giới tính:"
                        name="user_sex"
                    >
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>Nam</Radio>
                            <Radio value={2}>Nữ</Radio>
                            <Radio value={3}>Khác</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Ngày sinh:"
                        name="user_birthDay"
                    >
                        <Space direction="vertical">
                            <DatePicker onChange={onChangeDate} />
                        </Space>
                    </Form.Item>
                    
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            style={{
                                backgroundColor:"#95532d",
                                marginTop:"15px"
                            }}
                        >
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="col-md-2 col-12 avatar">                        
            </div>
        </div>
    </div>
  )
}

export default Detail_info