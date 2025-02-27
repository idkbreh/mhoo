import { useState } from 'react';
import { Card, Button, List, Empty } from 'antd';
import { motion } from 'framer-motion';
import { CoffeeOutlined, RedoOutlined, ArrowLeftOutlined, HistoryOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { restaurantApi } from '../services/api';

const RandomRestaurantPage = () => {
  const navigate = useNavigate();
  const [currentPick, setCurrentPick] = useState(null);
  const [history, setHistory] = useState([]);

  const restaurants = [
    "AKA", "pepper lunch", "Sushiro", "Fast Food",
    "MK Restaurant", "ไม่ต้องกิน อดไปมื้อนึง", "KFC", "McDonald's", 
    "ก๋วยเตี๋ยวร้านไหนก็ได้", "ข้าวตามสั่งร้านไหนก็ได้", "Katei", 
    "ร้าน branch อะไรก็ได้"
  ];

  const randomize = async () => {
    const pick = restaurants[Math.floor(Math.random() * restaurants.length)];
    setCurrentPick(pick);
    const newHistory = [{
      name: pick,
      date: new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }, ...history].slice(0, 5); // Keep only last 5 items
    setHistory(newHistory);
    try {
      await restaurantApi.addVisit(pick);
    } catch (error) {
      console.error('Error saving restaurant visit:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="max-w-3xl mx-auto">
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
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-light text-purple-800 mb-2">สุ่มร้านอาหาร</h1>
          <p className="text-purple-500">มื้อนี้กินอะไรดี?</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="mb-8"
        >
          <Card className="text-center p-6 bg-white rounded-lg shadow-sm">
            {currentPick ? (
              <div className="py-8">
                <CoffeeOutlined className="text-5xl text-purple-500 mb-4" />
                <h2 className="text-2xl font-medium text-purple-800 mb-4">{currentPick}</h2>
                <Button 
                  type="primary" 
                  icon={<RedoOutlined />}
                  onClick={randomize}
                  className="rounded-full"
                >
                  สุ่มใหม่
                </Button>
              </div>
            ) : (
              <div className="py-8">
                <Empty
                  description={
                    <span className="text-purple-400">คลิกเพื่อหาเรื่องร้านอาหาร</span>
                  }
                />
                <Button 
                  type="primary" 
                  onClick={randomize}
                  className="rounded-full mt-4"
                >
                  กินกัน !
                </Button>
              </div>
            )}
          </Card>
        </motion.div>

        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card 
              title={
                <div className="flex items-center text-purple-800">
                  <HistoryOutlined className="mr-2" />
                  <span>ประวัติการสุ่ม</span>
                </div>
              }
              className="border-none shadow-sm"
            >
              <List
                dataSource={history}
                renderItem={(item) => (
                  <List.Item className="flex justify-between items-center py-3">
                    <span className="text-purple-600 font-medium">{item.name}</span>
                    <span className="text-purple-400 text-sm">{item.date}</span>
                  </List.Item>
                )}
              />
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RandomRestaurantPage; 