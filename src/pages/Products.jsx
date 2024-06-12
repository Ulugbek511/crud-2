// src/pages/Products.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

const Products = () => {
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const showModal = (product = null) => {
    setEditingProduct(product);
    setVisible(true);
  };

  const handleOk = async (values) => {
    try {
      if (editingProduct) {
        const response = await axios.put(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${editingProduct.id}`, values);
        setProducts(products.map(p => (p.id === editingProduct.id ? response.data : p)));
      } else {
        const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/products', values);
        setProducts([...products, response.data]);
      }
      setVisible(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setEditingProduct(null);
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger style={{ marginLeft: 8 }}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Product
      </Button>
      <Table dataSource={products} columns={columns} rowKey="id" loading={loading} />

      <Modal
        title={editingProduct ? "Edit Product" : "Add New Product"}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingProduct || { name: '', price: '' }}
          onFinish={handleOk}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: 'Please input the product price!' }]}
          >
            <Input placeholder="Price" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProduct ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
