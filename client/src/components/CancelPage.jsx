import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CancelPage = () => {
  const navigate = useNavigate();
  const { carID } = useParams();
  
  useEffect(() => {
    navigate(`/models`);
  }, [carID, navigate]);
  
  return null; 
};

export default CancelPage;