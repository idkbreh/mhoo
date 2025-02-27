import { useState, useEffect } from 'react';
import { Card, Button, List, Modal } from 'antd';
import { motion } from 'framer-motion';
import { FileOutlined, PlusOutlined, ArrowLeftOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { travelApi } from '../services/api';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const TravelPlanPage = () => {
  const [travels, setTravels] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fileModalVisible, setFileModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [travelToDelete, setTravelToDelete] = useState(null);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const data = await travelApi.getAll();
        setTravels(data);
      } catch (error) {
        console.error('Error fetching travels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, []);

  const handleDelete = async () => {
    try {
      await travelApi.delete(travelToDelete);
      setTravels(travels.filter(travel => travel._id !== travelToDelete));
      setDeleteModalVisible(false);
      setTravelToDelete(null);
    } catch (error) {
      console.error('Error deleting travel plan:', error);
    }
  };

  const showDeleteConfirm = (id) => {
    setTravelToDelete(id);
    setDeleteModalVisible(true);
  };

  const showFileContent = (file) => {
    setSelectedFile(file);
    setFileModalVisible(true);
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
          <h1 className="text-3xl font-light text-purple-800 mb-2">แพลนทั้งหมดที่เคยทำ</h1>
          <p className="text-purple-500">เผื่ออยากย้อนมาดูว่าเคยไปไหนมาบ้าง</p>
        </motion.div>

        <div className="text-center mb-8">
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/travels/add')}
            className="rounded-full"
          >
            แพลนใหม่ !
          </Button>
        </div>

        <motion.div layout>
          {travels.map((travel, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="mb-4"
            >
              <Card 
                className="border-none shadow-sm hover:shadow-md transition-shadow"
                actions={[
                  <EyeOutlined 
                    key="view"
                    onClick={() => showFileContent(travel.planFile)}
                    className="text-purple-500 hover:text-purple-700"
                  />,
                  <DeleteOutlined 
                    key="delete" 
                    onClick={() => showDeleteConfirm(travel._id)}
                    className="text-red-500 hover:text-red-700"
                  />
                ]}
              >
                <h3 className="text-xl font-medium text-purple-800 mb-2">{travel.title}</h3>
                <p className="text-purple-400 text-sm mb-2">{new Date(travel.date).toLocaleDateString()}</p>
                <p className="text-purple-600 mb-4">{travel.description}</p>
                {travel.planFile && (
                  <div className="flex items-center text-purple-500">
                    <FileOutlined className="mr-2" />
                    <span>{travel.planFile.filename}</span>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Modal
          title={selectedFile?.filename || "Plan Details"}
          open={fileModalVisible}
          onCancel={() => setFileModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setFileModalVisible(false)}>
              Close
            </Button>
          ]}
          width={800}
        >
          <div className="max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap font-sans text-purple-800 p-4 bg-purple-50 rounded-lg">
              {selectedFile?.content || "No content available"}
            </pre>
          </div>
        </Modal>

        <DeleteConfirmModal
          visible={deleteModalVisible}
          onCancel={() => {
            setDeleteModalVisible(false);
            setTravelToDelete(null);
          }}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default TravelPlanPage; 