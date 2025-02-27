import { Form, Input, DatePicker, Button, Card, message } from 'antd';
import { motion } from 'framer-motion';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { memoryApi } from '../services/api';

const AddMemoryPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await memoryApi.create({
        ...values,
        date: values.date.format('YYYY-MM-DD')
      });
      message.success('Memory saved successfully!');
      navigate('/memories');
    } catch (error) {
      console.error('Error saving memory:', error);
      message.error('Failed to save memory');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/home')}
          className="mb-8"
        >
          กลับหน้าหลัก
        </Button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-light text-purple-800 mb-2">บันทึกความทรงจำ</h1>
          <p className="text-purple-500">บันทึกความทรงจำของเรา</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-none shadow-sm">
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              className="max-w-lg mx-auto"
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter a title' }]}
              >
                <Input placeholder="ความทรงจำคืออะไร" />
              </Form.Item>
              
              <Form.Item
                name="date"
                label="วันที่เท่าไหร่"
                rules={[{ required: true, message: 'วันที่เท่าไหร่' }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
              
              <Form.Item
                name="description"
                label="รายละเอียด"
                rules={[{ required: true, message: 'รายละเอียด' }]}
              >
                <Input.TextArea 
                  rows={4} 
                  placeholder="Tell me more about this memory..."
                />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="w-full rounded-full"
                >
                  บันทึกความทรงจำ
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AddMemoryPage; 