import { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { motion } from 'framer-motion';
import { 
  HeartFilled, 
  CompassOutlined, 
  BookOutlined, 
  CarOutlined,
  ClockCircleOutlined,
  CoffeeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { restaurantApi } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [recentRestaurants, setRecentRestaurants] = useState([]);

  useEffect(() => {
    const startDate = new Date('2024-11-09T00:00:00');
    
    const updateTimer = () => {
      const now = new Date();
      const difference = now - startDate;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    // Update immediately and then every second
    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchRecentRestaurants = async () => {
      try {
        const data = await restaurantApi.getRecent();
        setRecentRestaurants(data.map(r => r.name));
      } catch (error) {
        console.error('Error fetching recent restaurants:', error);
      }
    };

    fetchRecentRestaurants();
  }, []);

  const stats = {
    placesVisited: 24,
    restaurantsVisited: 2,
    upcomingTrips: 2
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-light text-purple-800 mb-2">เรื่องของหมูกับหมาอ้วน</h1>
          <p className="text-purple-500">9 November 2024</p>
        </motion.div>

        {/* Stats Section */}
        <Row gutter={[16, 16]} className="mb-12">
          <Col xs={24} sm={24} md={12} className="mb-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white rounded-lg shadow-sm"
            >
              
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <div className="text-3xl font-light text-purple-800 mb-1">
                    {timeTogether.days}
                  </div>
                  <div className="text-sm text-purple-400">วัน</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-purple-800 mb-1">
                    {timeTogether.hours}
                  </div>
                  <div className="text-sm text-purple-400">ชม</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-purple-800 mb-1">
                    {timeTogether.minutes}
                  </div>
                  <div className="text-sm text-purple-400">นาที</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-purple-800 mb-1">
                    {timeTogether.seconds}
                  </div>
                  <div className="text-sm text-purple-400">วินาที</div>
                </div>
              </div>
            </motion.div>
          </Col>


          <Col xs={12} sm={8} md={4}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-4 bg-white rounded-lg shadow-sm"
            >
              <CoffeeOutlined className="text-2xl text-purple-500 mb-2" />
              <div className="text-3xl font-light text-purple-800 mb-1">{stats.restaurantsVisited}</div>
              <div className="text-sm text-purple-400">ร้านอาหาร</div>
            </motion.div>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-4 bg-white rounded-lg shadow-sm"
            >
              <CarOutlined className="text-2xl text-purple-500 mb-2" />
              <div className="text-3xl font-light text-purple-800 mb-1">{stats.upcomingTrips}</div>
              <div className="text-sm text-purple-400">แพลนทั้งหมด</div>
            </motion.div>
          </Col>
        </Row>

        {/* Menu Section */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card 
                className="h-full border-none shadow-sm hover:shadow-md transition-shadow bg-white"
                bodyStyle={{ padding: '24px' }}
              >
                <div className="text-center mb-6">
                  <CoffeeOutlined className="text-3xl text-purple-500 mb-2" />
                  <h2 className="text-xl font-medium text-purple-800 mb-1">สุ่มร้านอาหารจ้า</h2>
                  <p className="text-purple-400 text-sm mb-4">เผื่อวันนึงไม่รู้จะกินไรแล้ว</p>
                  <Button type="primary" className="rounded-full bg-purple-600 hover:bg-purple-700 border-none" onClick={() => navigate('/random')}>
                    Let's Eat!
                  </Button>
                </div>
                <div className="text-sm text-purple-600">
                  {/* <p className="mb-2 ">ของโปรดของเราสองคน</p> */}
                  {/* {recentRestaurants.map((restaurant, idx) => (
                    <p key={idx} className="mb-1 text-purple-500">{restaurant}</p>
                  ))} */}
                </div>
              </Card>
            </motion.div>
          </Col>
          
          <Col xs={24} md={8}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card 
                className="h-full border-none shadow-sm hover:shadow-md transition-shadow bg-white"
                bodyStyle={{ padding: '24px' }}
              >
                <div className="text-center mb-6">
                  <CoffeeOutlined className="text-3xl text-purple-500 mb-2" />
                  <h2 className="text-xl font-medium text-purple-800 mb-1">ย้อนดูความทรงจำ</h2>
                  <p className="text-purple-400 text-sm mb-4">วันไหนทะเลาะกันขอให้มาดูที่นี่นะ</p>
                  <Button type="primary" className="rounded-full bg-purple-600 hover:bg-purple-700 border-none" onClick={() => navigate('/memories')}>
                    บันทึกความทรงจำ
                  </Button>
                </div>
                <div className="text-sm text-purple-600">
                  {/* <p className="mb-2 ">ของโปรดของเราสองคน</p> */}
                  {/* {recentRestaurants.map((restaurant, idx) => (
                    <p key={idx} className="mb-1 text-purple-500">{restaurant}</p>
                  ))} */}
                </div>
              </Card>
            </motion.div>
          </Col>
          
          <Col xs={24} md={8}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card 
                className="h-full border-none shadow-sm hover:shadow-md transition-shadow bg-white"
                bodyStyle={{ padding: '24px' }}
              >
                <div className="text-center">
                  <ClockCircleOutlined className="text-3xl text-purple-500 mb-2" />
                  <h2 className="text-xl font-medium text-purple-800 mb-1">แพลนทั้งหมดที่เคยทำ</h2>
                  <p className="text-purple-400 text-sm mb-4">เก็บไว้ดู + ให้แม่เธอด้วย</p>
                  <Button type="primary" className="rounded-full bg-purple-600 hover:bg-purple-700 border-none" onClick={() => navigate('/travels')}>
                    แพลนใหม่ !
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage; 