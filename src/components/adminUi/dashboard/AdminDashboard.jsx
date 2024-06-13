import React from 'react';
import FileUpload from '../fileupload/FileUploads';
import FileStats from '../filestats/FileStats';
import FileList from '../filelists/FileLists'
import styles from './AdminDashboard.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [files,setFiles] = useState([])

  const fetchFiles = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      Swal.fire('Error', 'You are not authorized. Please login.', 'error');
      navigate('/admin-login');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/api/data/allfiles',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data) {
        setFiles(response.data);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };
  useEffect(()=>{
    
    fetchFiles();

  },[])
  return (
    <div className={styles.adminDashboard}>
      <FileUpload />
      {/* <FileStats /> */}
      <FileList files={files} fetchFiles={fetchFiles}/>
    </div>
  );
}

export default AdminDashboard;
