import { Button, Form, Input, InputNumber } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useAddProductMutation } from '../../../api_slice/api_product';
import { message } from 'antd';
import { IProduct } from '../../../interfaces/i_product';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { useNavigate } from 'react-router-dom';
import { useCreateColorsMutation, useGetColorsQuery } from '../../../api_slice/api_color';
import { useCreateCategoryMutation, useGetCategoriesQuery } from '../../../api_slice/api_categories';
import TextArea from 'antd/es/input/TextArea';
import { Divider, Select, Space } from 'antd';
import type { InputRef } from 'antd';
import { uploadCloudinary } from '../../../api_slice/api_upload';



const Product_add = () => {
  const navigate = useNavigate()
  const [dataArrayImage, setDataArrayImage] = useState<any>([])
  const [create_data, { isLoading }] = useAddProductMutation()
  const [create_color, { isLoading: loading_color }] = useCreateColorsMutation()
  const { data: data_Color = [], isLoading: loadding_Color } = useGetColorsQuery()
  const [create_Category, { isLoading: loading_category }] = useCreateCategoryMutation()
  const { data: dataCategory = [], isLoading: loading_getCategory } = useGetCategoriesQuery()
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const inputRef = useRef<InputRef>(null);
  const [name, setName] = useState('');
  const [name_color, setName_color] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [sizePrice, setSizePrice] = useState('');
  const [sizeQuantity, setSizeQuantity] = useState('');
  const [dataSize, setDataSize] = useState<ISize[]>([])
  const [dataColor, setDataColor] = useState<ISize[]>([])

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
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  type ISize = {
    size: string;
    sizePrice: number;
    sizeQuantity: number;
  }

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

  const oncChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const addColor = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setDataColor([...dataColor, color])
  };

  // THÊM MỚI SIZE VÀ GIÁ
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

  const dataPush = dataArrayImage.map((item: any) => item.url)
  // ADD PRODUCTS START
  const onFinish = (values: IProduct) => {

    const product: IProduct = {
      category: values.category,
      product_discount: values.product_discount,
      product_name: values.product_name,
      product_price: values.product_price,
      product_size: dataSize,
      product_desc: values.product_desc,
      product_color: dataColor,
      product_images: dataPush,
    }

    create_data(product)
    message.success("Thêm sản phẩm mới thành công!");

    setDataArrayImage([]);
    setDataSize([]);
    setTimeout(() => {
      navigate("/admin/products")
    }, 1500)

  };

  // UPLOAD IMAGES START
  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vev60ldv");
    try {
      const res = await uploadCloudinary(formData);
      onSuccess(res);
    } catch (err) {
      onError({ err });
    }
  };


  const handleChange = ({ file: { status, error, uid, response } }: UploadChangeParam<UploadFile<any>>) => {
    switch (status) {
      case "done":
        const updatedDataArrayImage = [...dataArrayImage, { uid, url: response.data.url }];
        setDataArrayImage(updatedDataArrayImage);
        break;
      default:
        break;
    }
  };


  const handleDelete = (e: any) => {
    const shallowValue = [...dataArrayImage];
    const newDt = shallowValue.filter(item => item.uid !== e.uid)
    setDataArrayImage(newDt);

  };



  if (isLoading) return <div>Đang tải...</div>;
  return (
    <div>
      <div className="product_add">
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ width: "100" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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
                label="Color:"
                name="product_color"
              // rules={[{ required: true, message: 'Kích thước sản phẩm là bắt buộc!' }]}
              >
                <Space
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Input
                    placeholder="Color"
                    ref={inputRef}
                    value={color}
                    onChange={oncChangeColor}
                  />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={addColor}
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
                label="Màu sản phẩm:"
              >
                {dataColor.map((item, index) => (
                  <div className='col-12' style={{ display: 'flex' }} key={index}>{item}</div>
                ))}
              </Form.Item>

              {/* HÌNH ẢNH */}
              <Form.Item
                className='col-12'
                label="Hình ảnh"
                name="product_image"
              // rules={[{ required: true, message: 'Hình ảnh là bắt buộc' }]}
              >
                <Upload
                  listType="picture-card"
                  onPreview={handlePreview}
                  customRequest={uploadImage}
                  onChange={handleChange}
                  onRemove={(e) => handleDelete(e)}
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
                label="Giá gốc:"
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
            name="product_desc"
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
      </div>
    </div>
  )
}

export default Product_add 
