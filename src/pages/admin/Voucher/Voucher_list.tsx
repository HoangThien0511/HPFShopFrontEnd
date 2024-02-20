import { Button, message, Popconfirm, Table } from 'antd';
import { Link } from 'react-router-dom';
import Column from 'antd/es/table/Column';
import { useGetVouchersQuery, useRemoveVoucherMutation } from '../../../api_slice/api_voucher';
import moment from 'moment';
import { log } from 'console';

type Props = {}

const Voucher_list = (props: Props) => {

    const { data: listVoucher = [], isLoading: loadingVoucher } = useGetVouchersQuery();
    const [removeVoucher, { isLoading: loadingRemove }] = useRemoveVoucherMutation()

    const onhandleRemoveVoucher = (id: any) => {
        removeVoucher(id).then(
            message.error("Mã giảm giá đã bị xóa bỏ!")
        )
    }

    if (loadingVoucher) return <div>Loading...</div>;
    return (
        <>
            <Link style={{ color: 'white' }} to={'/admin/voucher/news'}>
                <Button type="primary" style={{ margin: '-40px 1200px 10px 0' }}>Thêm mới</Button>
            </Link>

            <Table
                dataSource={listVoucher.map((item) => ({
                    key: item._id,
                    id_product: item.id_product,
                    discount: item.discount,
                    userUsed: item.userUsed,
                    code: item.code,
                    type: item.type,
                    quantity: item.quantity,
                    expirationDate: moment(item.expirationDate).format('DD/MM/YYYY HH:mm'),
                    description: item.description,
                }))}
            >
                <Column className='col-1' title="Mã Voucher" dataIndex="code" key="code" />
                <Column className='col-1' title="Tổng Voucher" dataIndex="quantity" key="quantity" />
                <Column className='col-1' title="Đã hết" dataIndex="userUsed" key="userUsed" />
                <Column className='col-1' title="Loại Voucher" dataIndex="type" key="type" />
                <Column className='col-3' title="Mô tả" dataIndex="description" key="description" />
                <Column className='col-2' title="Ngày hết hạn" dataIndex="expirationDate" key="expirationDate" />
                <Column
                    title="Action"
                    key="action"
                    className='col-2'
                    render={(voucher) => {
                        return (
                            <Popconfirm
                                placement="top"
                                title="Bạn có muốn xóa không?"
                                onConfirm={() => onhandleRemoveVoucher(voucher.key)}
                                okText="Có"
                                cancelText="Không"
                            >
                                <Button
                                    type="primary"
                                    style={{ margin: '0 5px' }}
                                    danger
                                >
                                    Xóa
                                </Button>

                                <Link style={{ color: 'white' }} to={`/admin/voucher/update/${voucher.key}`}>
                                    <Button type="primary" style={{ backgroundColor: 'green' }}>Cập nhật</Button>
                                </Link>
                            </Popconfirm>
                        );
                    }}
                ></Column>

            </Table >
        </>
    )
}

export default Voucher_list