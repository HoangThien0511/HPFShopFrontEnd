import {
    Button,
    Form,
    Input,
    message,
    Upload,
    Modal,
    Radio,
} from "antd";
import { useLocalStorage } from "react-use";
import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../../../api_slice/api_user";
import { isAuthenticate } from "../../../../utils/LocalStorage";
import { uploadCloudinary } from "../../../../api_slice/api_upload";
import { useNavigate } from "react-router-dom";
// import { yupResolver } from '@hookform/resolvers/yup'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useFormik } from "formik";

type Prop = {
}


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .max(20, 'Tên không được quá 20 ký tự')
        .required('Vui lòng nhập tên'),
    age: Yup.number()
        .typeError('Tuổi phải là số')
        .integer('Tuổi phải là số nguyên')
        .min(16, 'Tuổi phải lớn hơn hoặc bằng 16')
        .max(100, 'Tuổi phải nhỏ hơn hoặc bằng 100')
        .required('Vui lòng nhập tuổi'),
    address: Yup.string()
        .min(10, 'Địa chỉ tối thiểu 10 ký tự')
        .max(100, 'Địa chỉ tối đa 100 ký tự')
        .required('Vui lòng nhập địa chỉ'),
});

const AccountInformation = (props: Prop) => {
    const navigate = useNavigate()
    const [isUpdateImg, setIsUpdateImg] = useState<any>(true)
    const [header, setHeader] = useLocalStorage<any>('userHeader');
    const user = isAuthenticate();
    const [form] = Form.useForm<any>();
    const [url, setUrl] = useState<any>("");
    const [fileList, setFileList] = useState<any>([]);

    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            address: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => {
        const getProfiles = async () => {
            const dataUser: any = await getProfile(user?.token);
            console.log('dataUser', dataUser)
            setFileList([{ url: dataUser.avatar }]);
            form.setFieldsValue({
                name: dataUser?.name,
                address: dataUser?.address,
                age: dataUser?.age,
                gender: dataUser?.gender,
                avatar: dataUser?.avatar,
                phoneNumber: dataUser?.phoneNumber,
            });
        };
        getProfiles();
    }, []);


    const onChange = ({ fileList: newFileList }: { fileList: any }) => {
        setFileList(newFileList);
    };

    const onFinish = async (data: any) => {
        const dataPost: any = { name: data.name, age: data.age, address: data.address, gender: data.gender };
        console.log('dataPost', dataPost)
        if (url) { // chỉ cập nhật hình đại diện nếu hình ảnh mới được tải lên
            dataPost.avatar = url;
        }
        if (data.age) {
            dataPost.age = data.age;
        }
        console.log('dataPost', dataPost);
        try {
            Modal.confirm({
                title: 'Bạn có chắc chắn muốn cập nhật thông tin tài khoản không ?',
                onOk: async () => {
                    updateProfile(user?.token, dataPost)
                        .then((data) => {
                            message.success('Cập nhật thông tin tài khoản thành công.', 4);
                            navigate('/info/account');
                        })
                        .catch((error) => {
                            message.error('Không thể cập nhật tài khoản', 4);
                        });
                },
            });
        } catch (error: any) {
            message.error(`${error.response.data.message}`, 4);
        }
    };


    const uploadImage = async (options: any) => {
        const { onSuccess, onError, file } = options;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "vev60ldv");
        try {
            setIsUpdateImg(false)
            const res = await uploadCloudinary(formData);
            onSuccess("Ok");
            message.success("Tải lên ảnh đại diện thành công !");
            setIsUpdateImg(true)
            setUrl(res.data.secure_url);
        } catch (err) {
            onError({ err });
        }
    };

    return (
        <div className="ml-3">
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
                        autoComplete="off"
                        form={form}
                    >

                        <Form.Item
                            label="Tên"
                            name="name"
                            help={formik.touched.name && formik.errors.name}
                            validateStatus={
                                formik.touched.name && formik.errors.name ? "error" : ""
                            }
                        >
                            <Input
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại:"
                            name="phoneNumber"
                        >
                            <Input disabled={true} />
                        </Form.Item>

                        <Form.Item
                            name="age"
                            label="Tuổi"
                            help={formik.touched.age && formik.errors.age}
                            validateStatus={
                                formik.touched.age && formik.errors.age ? "error" : ""
                            }
                        >
                            <Input
                                name="age"
                                type="number"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ:"
                            name="address"
                            help={formik.touched.address && formik.errors.address}
                            validateStatus={
                                formik.touched.address && formik.errors.address ? "error" : ""
                            }
                        >
                            <Input
                                name="address"
                                type="string"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Item>

                        <Form.Item label="Giới tính" name="gender">
                            <Radio.Group>
                                <Radio value={0}>Nam</Radio>
                                <Radio value={1}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item label="Ảnh đại diện">
                            {/* <ImgCrop rotationSlider> */}
                            <Upload
                                customRequest={uploadImage}
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                name="avatar"
                            >
                                {fileList.length < 1 && "+ Upload"}
                            </Upload>
                            {/* </ImgCrop> */}
                        </Form.Item>

                        <Form.Item>
                            {isUpdateImg ?
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        backgroundColor: "#95532d",
                                        marginTop: "15px"
                                    }}>
                                    Lưu
                                </Button>
                                :
                                <Button
                                    type="primary"
                                    disabled className="bg-gray-500 text-white"
                                    htmlType="submit"
                                    style={{
                                        backgroundColor: "#95532d",
                                        marginTop: "15px"
                                    }}>
                                    Đang tải ảnh lên
                                </Button>
                            }
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AccountInformation;