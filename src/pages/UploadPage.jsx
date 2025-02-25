import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { Button, Typography, Container, backdropClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const [parsedData, setParsedData] = useState([]);
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setParsedData(results.data);
          localStorage.setItem('csvData', JSON.stringify(results.data)); // Store data for MappingPage
        },
      });
    },
  });

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center', 
      backgroundColor: '#f5f5f5'},
    dropzone: {
      width: '100%',
      maxWidth: '600px',
      padding: '20px',
      border: '2px dashed #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      cursor: 'pointer',
      marginBottom: '20px',
    },
    dropzoneText: {
      color: '#888',
    },
    uploadButton: {
      marginTop: '20px',
    },
  };

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' , color: '#333' }}>
        Upload CSV File
      </Typography>
      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        <Typography variant="body1" style={styles.dropzoneText}>Drag & drop a CSV file here, or click to select one</Typography>
      </div>
      <Button
        variant="contained"
        onClick={() => navigate('/mapping')}
        disabled={!parsedData.length}
        style={styles.uploadButton}
      >
        Next
      </Button>
    </Container>
  );
}

export default UploadPage;
