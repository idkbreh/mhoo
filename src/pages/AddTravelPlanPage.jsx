import { useState } from 'react';
import { Form, Input, DatePicker, Button, Card, message, Upload } from 'antd';
import { motion } from 'framer-motion';
import { ArrowLeftOutlined, InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { travelApi } from '../services/api';

const { Dragger } = Upload;

const AddTravelPlanPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileContent, setFileContent] = useState('');

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('date', values.date.format('YYYY-MM-DD'));
      formData.append('description', values.description);
      formData.append('fileContent', fileContent);
      
      await travelApi.create(formData);
      message.success('Travel plan saved successfully!');
      navigate('/travels');
    } catch (error) {
      console.error('Error saving travel plan:', error);
      message.error('Failed to save travel plan');
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
      return false;
    },
    maxCount: 1
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/travels')}
          className="mb-8"
        >
          กลับหน้าแพลนทั้งหมด
        </Button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-light text-purple-800 mb-2">แพลนใหม่ !</h1>
          <p className="text-purple-500">วางแผนการเดินทางของเรา</p>
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
                label="ไปไหนมา"
                rules={[{ required: true, message: 'Please enter a title' }]}
              >
                <Input placeholder="Where are we going?" />
              </Form.Item>
              
              <Form.Item
                name="date"
                label="วันที่เท่าไหร่"
                rules={[{ required: true, message: 'When are we going?' }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
              
              <Form.Item
                name="description"
                label="รายละเอียด"
                rules={[{ required: true, message: 'Please add some details' }]}
              >
                <Input.TextArea 
                  rows={4} 
                  placeholder="Tell me about the plan..."
                />
              </Form.Item>

              <Form.Item
                name="planFile"
                label="ไฟล์แพลนที่ทำไว้"
              >
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for .txt files
                  </p>
                </Dragger>
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="w-full rounded-full"
                >
                  บันทึกแพลน
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AddTravelPlanPage; 