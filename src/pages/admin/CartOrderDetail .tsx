import { FC, useState } from "react";
import { Table, Form, Input, Button, Modal } from "antd";

const { Item } = Form;

interface Props {
    // Khai báo các props (nếu có)
}

const columns = [
    {
        title: "Product Name",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price"
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity"
    },
    {
        title: "Total",
        dataIndex: "total",
        key: "total"
    }
];

const data = [
    {
        key: "1",
        name: "Product A",
        price: "$50.00",
        quantity: 2,
        total: "$100.00"
    },
    {
        key: "2",
        name: "Product B",
        price: "$25.00",
        quantity: 1,
        total: "$25.00"
    }
];

const CartOrderDetail: FC<Props> = ({ /* Nhận các props (nếu có) */ }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);

    const handleCheckout = () => {
        form.resetFields();
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={false} />



            <Modal
                title="Order Summary"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Table columns={columns} dataSource={data} pagination={false} />
            </Modal>
        </div>
    );
};

export default CartOrderDetail;
