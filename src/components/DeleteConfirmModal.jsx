import { Modal, Form, DatePicker, message } from 'antd';

const DeleteConfirmModal = ({ visible, onCancel, onConfirm }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const selectedDate = values.date.format('YYYY-MM-DD');
    const specialDate = '2024-11-09';
    
    if (selectedDate === specialDate) {
      onConfirm();
      form.resetFields();
    } else {
      message.error('วันที่ไม่ถูกต้อง ลองใหม่นะ 🔒');
    }
  };

  return (
    <Modal
      title="Confirm Delete"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Delete"
      onOk={() => form.submit()}
    >
      <p className="mb-4 text-purple-600">Please enter our special date to confirm deletion:</p>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="date"
          rules={[{ required: true, message: 'Please select the date' }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DeleteConfirmModal; 