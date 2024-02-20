import { Button, Form, Input, InputNumber } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useAddProductMutation, useEditProductMutation, useGetProductQuery } from '../../../api_slice/api_product';
import { message } from 'antd';
import { IProduct } from '../../../interfaces/i_product';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateColorsMutation, useGetColorsQuery } from '../../../api_slice/api_color';
import { useCreateCategoryMutation, useGetCategoriesQuery } from '../../../api_slice/api_categories';
import TextArea from 'antd/es/input/TextArea';
import { Divider, Select, Space } from 'antd';
import type { InputRef } from 'antd';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { uploadCloudinary } from '../../../api_slice/api_upload';
import { getProduct } from '../../../api_slice/api_user';



const Product_add = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [update_data, { isLoading }] = useEditProductMutation()
  const [create_color, { isLoading: loading_color }] = useCreateColorsMutation()
  const { data: data_Color = [], isLoading: loadding_Color } = useGetColorsQuery()
  const [create_Category, { isLoading: loading_category }] = useCreateCategoryMutation()
  const { data: dataCategory = [], isLoading: loadinggetCategory } = useGetCategoriesQuery()
  const { data: data_product, isLoading: loading_data } = useGetProductQuery(id)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [name, setName] = useState('');
  const [name_color, setName_color] = useState('');
  const inputRef = useRef<InputRef>(null);
  const [dataArrayImage, setDataArrayImage] = useState<any>([])
  const [size, setSize] = useState('');
  const [sizePrice, setSizePrice] = useState('');
  const [sizeQuantity, setSizeQuantity] = useState('');
  const [dataSize, setDataSize] = useState<ISize[]>([])
  const [isUpdateImg, setIsUpdateImg] = useState<any>(true)
  const [url, setUrl] = useState<any>("");

  type ISize = {
    size: string;
    sizePrice: number;
    sizeQuantity: number;
  }

  console.log('data_product', data_product)

  const onFinishFailed = (errorInfo: any) => {
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
      window.open(file.url, '_blank');
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };



  const handleDelete = (e: any) => {
    const shallowValue = [...dataArrayImage];
    const newDt = shallowValue.filter(item => item.uid !== e.uid)
    setDataArrayImage(newDt);

  };

  const onChange = ({ fileList: newFileList }: { fileList: any }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  const [form] = Form.useForm<any>();



  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vev60ldv");
    try {
      setIsUpdateImg(false);
      const res = await uploadCloudinary(formData);
      onSuccess("Ok");
      message.success("Tải lên ảnh sản phẩm thành công !");
      setIsUpdateImg(true);
      const imageUrl = res.data.secure_url;
      setDataArrayImage((prevData: any) => [...prevData, { url: imageUrl }]);
    } catch (err) {
      onError({ err });
    }
  };

  const onFinish = async (data: any) => {
    const dataPush = dataArrayImage.map((item: any) => item.url);
    if (url) {
      dataPush.avatar = url;
    }
    try {
      const updatedProduct: IProduct = {
        ...data,
        _id: id,
        product_images: dataPush,
      };

      await update_data(updatedProduct);

      message.success("Cập nhật thông tin sản phẩm thành công!");
      navigate("/admin/products");
    } catch (error) {
      message.error("Đã xảy ra lỗi khi cập nhật thông tin sản phẩm");
    }
  };

  useEffect(() => {
    const getProducts = () => {
      if (data_product && data_product.product_images) {
        setFileList(data_product.product_images);
        form.setFieldsValue({
          product: data_product.product_images,
        });
      }
    };
    getProducts();
  }, []);

  const uploadFileList = fileList.map(url => ({
    uid: url,
    name: 'image',
    status: 'done',
    url: url
  }));

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const new_cate = { "name_category": name }
    create_Category(new_cate);
    setName('');
    message.success("Thêm danh mục mới thành công!");
  };


  const onNameChange_color = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName_color(event.target.value);
  };

  const addItem_color = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const new_color = { "color_name": name_color }
    create_color(new_color)
    setName_color('');
    message.success("Thêm mới màu sắc thành công!");
  };

  const onChange_size = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const onChangeSizePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSizePrice(event.target.value);
  };

  const onChangeSizeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSizeQuantity(event.target.value);
  };

  const add_Size = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const item_size = { 'size': size, 'sizePrice': parseInt(sizePrice), 'sizeQuantity': parseInt(sizeQuantity) }
    setDataSize([...dataSize, item_size]);
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="product_add">
        {data_product && (
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ width: "100" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              ['category']: data_product.category,
              ['id_voucher']: data_product.id_voucher,
              ['product_name']: data_product.product_name,
              ['product_price']: data_product.product_price,
              ['desc_product']: data_product.desc_product,
              ['product_discount']: data_product.product_discount,
              ['product_color']: data_product.product_color,
              // ['product_size']: data_product.product_size.size
              // ['product_images']: data_product.product_images,
            }}
          >

            <div
              className="content"
              style={{
                display: "flex",
              }}
            >
              <div className="content_left col-md-4 col-12">
                <Form.Item
                  className='col-12'
                  label="Tên sản phẩm"
                  name="product_name"
                  rules={[{ required: true, message: 'Tên sản phẩm là bắt buộc!' }]}
                >
                  <Input />
                </Form.Item>

                {/* MÀU SẮC */}
                <Form.Item
                  className='col-12'
                  label="Màu sắc"
                  name="product_color"
                  rules={[{ required: true, message: 'Thuộc tính màu sắc là bắt buộc!' }]}
                >
                  <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    placeholder="Chọn màu sắc"
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 4px' }}>
                          <Input
                            placeholder="Tên màu"
                            ref={inputRef}
                            value={name_color}
                            onChange={onNameChange_color}
                            style={{
                              marginBottom: "0"
                            }}
                          />
                          <Input
                            placeholder="Mã màu"
                            ref={inputRef}
                            value={name_color}
                            onChange={onNameChange_color}
                            style={{
                              marginBottom: "0"
                            }}
                          />
                          <Button
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: "-2px"
                            }}
                            type="text" icon={<PlusOutlined />} onClick={addItem_color}>
                            Thêm
                          </Button>
                        </Space>
                      </>
                    )}
                    options={data_Color.map((item) => ({ label: item.color_name, value: item.color_name }))}
                  />

                </Form.Item>

                {/* HÌNH ẢNH */}
                <Form.Item
                  className='col-12'
                  label="Hình ảnh"
                  name="product_images"
                // rules={[{ required: true, message: 'Hình ảnh là bắt buộc' }]}
                >
                  <Upload
                    listType="picture-card"
                    customRequest={uploadImage}
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={handlePreview}
                  // name='product'
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </Form.Item>
              </div>

              <div className="content_righ col-md-4 col-12">
                {/* DANH MỤC SẢN PHẨM */}
                <Form.Item
                  className='col-12'
                  label="Danh mục:"
                  name="category"
                  rules={[{ required: true, message: 'Danh mục sản phẩm là bắt buộc!' }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn danh mục"
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 4px' }}>
                          <Input
                            placeholder="Danh mục mới"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                          />
                          <Button type="text" icon={<PlusOutlined />} onClick={addItem} >
                            Thêm mới
                          </Button>
                        </Space>
                      </>
                    )}
                    options={dataCategory.map((item) => ({ label: item.name_category, value: item._id }))}
                  />
                </Form.Item>

                {/* GÍA BÁN */}
                <Form.Item
                  className='col-12'
                  label="Giá bán:"
                  name="product_price"
                  rules={[{ required: true, message: 'Giá sản phẩm là thông tin bắt buộc' }]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>

                {/* GIẢM GIÁ */}
                <Form.Item
                  className='col-12'
                  label="Giá đã giảm:"
                  name="product_discount"
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>

                {/* SIZE SẢN PHẨM */}
                <Form.Item
                  className='col-12'
                  label="Size:"
                  name="product_size"
                  rules={[{ required: true, message: 'Kích thước sản phẩm là bắt buộc!' }]}
                >
                  <Space
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Input
                      placeholder="Size"
                      ref={inputRef}
                      value={size}
                      onChange={onChange_size}
                    />
                    <Input
                      placeholder="Giá bán"
                      ref={inputRef}
                      value={sizePrice}
                      onChange={onChangeSizePrice}
                    />
                    <Input
                      placeholder="Số lượng"
                      ref={inputRef}
                      value={sizeQuantity}
                      onChange={onChangeSizeQuantity}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={add_Size}
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      Thêm
                    </Button>
                  </Space>

                </Form.Item>

                <Form.Item
                  className='col-12'
                  label="Giá bán theo size:"
                >
                  {dataSize.map((item, index) => (
                    <div className='col-12' style={{ display: 'flex' }} key={index}>{item.size} ----- {item.sizePrice}(đ) ----- {item.sizeQuantity}(c)</div>
                  ))}
                </Form.Item>
              </div>
            </div>



            {/* MÔ TẢ */}
            <Form.Item
              label="Mô tả sản phẩm:"
              className='col-12'
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22 }}
              name="desc_product"
              rules={[{ required: true, message: 'Mô tả sản phẩm không được để trống' }]}
              style={{
                marginTop: "1vw"
              }}
            >
              <TextArea rows={10} placeholder="Nội dung mô tả" />
            </Form.Item>


            {/* THÊM MỚI */}
            <Form.Item className='col-12' wrapperCol={{ offset: 2, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>

          </Form>
        )
        }
      </div>
    </div>
  )
}

export default Product_add 
