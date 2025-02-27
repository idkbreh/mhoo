import { useState, useEffect } from 'react';
import { Card, Button, Form, Input, DatePicker, List, Modal } from 'antd';
import { motion } from 'framer-motion';
import { BookOutlined, PlusOutlined, ArrowLeftOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { memoryApi } from '../services/api';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const MemoriesPage = () => {
  const [memories, setMemories] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [memoryToDelete, setMemoryToDelete] = useState(null);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const data = await memoryApi.getAll();
        setMemories(data);
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  const handleAdd = (values) => {
    setMemories(prev => [{
      ...values,
      date: values.date.format('YYYY-MM-DD')
    }, ...prev]);
    form.resetFields();
  };

  const handleDelete = async () => {
    try {
      await memoryApi.delete(memoryToDelete);
      setMemories(memories.filter(memory => memory._id !== memoryToDelete));
      setDeleteModalVisible(false);
      setMemoryToDelete(null);
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  const showDeleteConfirm = (id) => {
    setMemoryToDelete(id);
    setDeleteModalVisible(true);
  };

  const showMemoryDetails = (memory) => {
    setSelectedMemory(memory);
    setViewModalVisible(true);
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
          <h1 className="text-3xl font-light text-purple-800 mb-2">ความทรงจำของเรา</h1>
          <p className="text-purple-500">บันทึกความทรงจำของเรา</p>
        </motion.div>

        <div className="text-center mb-8">
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/memories/add')}
            className="rounded-full"
          >
            บันทึกความทรงจำ
          </Button>
        </div>

        <motion.div layout>
          {memories.map((memory, idx) => (
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
                    onClick={() => showMemoryDetails(memory)}
                    className="text-purple-500 hover:text-purple-700"
                  />,
                  <DeleteOutlined 
                    key="delete" 
                    onClick={() => showDeleteConfirm(memory._id)}
                    className="text-red-500 hover:text-red-700"
                  />
                ]}
              >
                <h3 className="text-xl font-medium text-purple-800 mb-2">{memory.title}</h3>
                <p className="text-purple-400 text-sm mb-2">{new Date(memory.date).toLocaleDateString()}</p>
                <p className="text-purple-600">{memory.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Modal
          title={selectedMemory?.title || "Memory Details"}
          open={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setViewModalVisible(false)}>
              Close
            </Button>
          ]}
          width={600}
        >
          {selectedMemory && (
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-purple-400 text-sm mb-4">
                {new Date(selectedMemory.date).toLocaleDateString()}
              </p>
              <p className="text-purple-800 whitespace-pre-wrap">
                {selectedMemory.description}
              </p>
            </div>
          )}
        </Modal>

        <DeleteConfirmModal
          visible={deleteModalVisible}
          onCancel={() => {
            setDeleteModalVisible(false);
            setMemoryToDelete(null);
          }}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default MemoriesPage; 