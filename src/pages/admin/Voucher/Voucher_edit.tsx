import React from 'react'
import { useNavigate } from 'react-router-dom';
// Form
import { Button, DatePicker, Form, Input, Select } from 'antd';

// Noti
import { notification, Space, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../../api_slice/api_product';
import { useEditVoucherMutation, useGetVoucherQuery } from '../../../api_slice/api_voucher';
import { IVoucher } from '../../../interfaces/i_voucher';
type NotificationType = 'success';


// Form End

type Props = {}

const Voucher_edit = (props: Props) => {
    const { id } = useParams()
    const [form] = Form.useForm();

    const navigate = useNavigate()


    const { data: dataProducts = [], isLoading: loading } = useGetProductsQuery()
    const [editVoucher, result] = useEditVoucherMutation()
    const { data: dataVoucher, isLoading, error } = useGetVoucherQuery(id)


    const onFinish = (values: IVoucher) => {
        const voucher = { ...values, _id: id }
        console.log("check data voucher: ", voucher);
        editVoucher(voucher)
        message.success("Sửa voucher thành công!");
        navigate("/admin/voucher")
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    if (isLoading) return <div>Loading...</div>;
    return (
        <>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{
                    ['code']: dataVoucher?.code,
                    ['type']: dataVoucher?.type,
                    ['discount']: dataVoucher?.discount,
                    ['quantity']: dataVoucher?.quantity,
                    // ['startDate']: dataVoucher?.startDate,
                    // ['expirationDate']: dataVoucher?.expirationDate,
                    ['id_product']: dataVoucher?.id_product,
                }}
            >

                <Form.Item
                    label="Mã voucher"
                    name="code"
                    rules={[{ required: true, message: 'Mã voucher là bắt buộc!' }]}
                >
                    <Input disabled={true} />
                </Form.Item>

                <Form.Item
                    className='col-md-4 col-12'
                    label="Loại voucher"
                    name="type"
                    rules={[{ required: true, message: 'Loại voucher là bắt buộc!' }]}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 10 }}
                    style={{ maxWidth: 600 }}
                >

                    <Select
                        style={{ width: "100%" }}
                        placeholder="Chọn kiểu voucher áp dụng"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                            </>
                        )}
                        options={[
                            { value: "%", label: 'Theo phần trăm' },
                            { value: "Giá", label: 'Theo giá' },
                        ]}
                        disabled={true}
                    />

                </Form.Item>

                <Form.Item
                    label="Giảm giá "
                    name="discount"
                    rules={[{ required: true, message: 'Giảm giá là bắt buộc!' }]}
                >
                    <Input disabled={true} />
                </Form.Item>

                <Form.Item
                    label="Số lượng Voucher"
                    name="quantity"
                    rules={[{ required: true, message: 'Số lượng là bắt buộc!' }]}
                >
                    <Input disabled={true} />
                </Form.Item>



                <Form.Item
                    label="Thời gian kết thúc"
                    name="expirationDate"
                    rules={[
                        {
                            required: true,
                            message: 'Thời hạn voucher là bắt buộc!'
                        },
                    ]}
                >
                    <DatePicker format="YYYY-MM-DD HH:mm:ss" />

                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>

            </Form>
        </ >
    )
}

export default Voucher_edit 