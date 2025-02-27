import { useState } from 'react';
import { Button, DatePicker, Form, message } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';

const IndexPage = () => {
  const [showDateForm, setShowDateForm] = useState(false);
  const navigate = useNavigate();
  
  const handleEnter = () => {
    setShowDateForm(true);
  };

  const handleDateSubmit = (values) => {
    const selectedDate = values.date.format('YYYY-MM-DD');
    // Our special date
    const specialDate = '2024-11-09';
    
    if (selectedDate === specialDate) {
      // Set cookie that expires in 7 days
      const d = new Date();
      d.setTime(d.getTime() + (7*24*60*60*1000));
      document.cookie = `key=iloveyounajajubjub;expires=${d.toUTCString()};path=/`;
      
      alert('ยินดีต้อนรับKub ❤️');
      navigate('/home');
    } else {
      alert('วันที่ไม่ถูกต้อง ลองใหม่นะ 🔒');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <p className="text-4xl md:text-6xl  text-pink-600 mb-4">
            Hi kub babe
        </p>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-5xl mb-8"
        >
          <HeartFilled className="text-red-500" />
        </motion.div>
        
        {!showDateForm ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="primary"
              size="large"
              onClick={handleEnter}
              className="font-bold bg-pink-500 hover:bg-pink-600 border-none px-8 py-2 rounded-full text-lg"
            >
              Enter Website
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md w-full mx-auto"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              วันแรกที่คบกันคือ ?
            </h2>
            <Form onFinish={handleDateSubmit}>
              <Form.Item
                name="date"
                rules={[{ required: true, message: 'Please select our special date!' }]}
              >
                <DatePicker 
                  className="w-full" 
                  placeholder="Select our special date"
                  size="large"
                />
              </Form.Item>
              <Button 
                type="primary"
                htmlType="submit"
                size="large"
                className=" w-full bg-pink-500 hover:bg-pink-600 border-none"
              >
                Enter Website
              </Button>
            </Form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default IndexPage;
