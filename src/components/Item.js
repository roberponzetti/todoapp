import React, { useState } from 'react'
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert';

const Item = ({itemId, description, completed, folderId}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleEditItem = () => {
    setIsEditing(true);
    setIsDisabled(false);
  };

  const handleUpdateItem = () => {
    axios.put(`https://localhost:3000/${itemId}`, {
      description: description,
      completed: isCompleted
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
    setIsEditing(false);
    setIsDisabled(true);
  };

  const handleGoBack = () => {
    setIsEditing(false);
    setIsDisabled(true);
  };

  const handleRemoveItem = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure to do remove this task?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.delete(`https://localhost:3000/${itemId}`, {
              description: description
            })
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleChangeStatus = (e) => {
    if(isCompleted===false){
      setIsCompleted(true);
      axios.put(`https://localhost:3000/${itemId}`, {
        completed: isCompleted
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    }else{
      setIsCompleted(false);
    }
    
  };

  return (
    <Row className="p-0 row-margin mt-5 align-items-center justify-content-center">
      <Col xs={{ span: 1 }} md={{ span: 2 }}>
        <Form.Check
          type="checkbox"
          id="check"
          checked={isCompleted}
          onChange={handleChangeStatus}
        />
      </Col>
      <Col xs={{ span: 5 }} md={{ span: 2 }}>
        <Form.Control
          id="checkControls"
          placeholder={description}
          value={description}
          disabled={isDisabled}
        />
      </Col>
      {!isEditing ? (
        <>
          <Col xs={{ span: 3 }} md={{ span: 1 }}>
            <Button
              className="editItem border-0"
              onClick={handleEditItem}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </Col>
          <Col xs={{ span: 3 }} md={{ span: 1 }}>
            <Button
              className="deleteItem border-0"
              onClick={handleRemoveItem}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </Col>
        </>
      ) : (
        <>
          <Col xs={{ span: 3 }} md={{ span: 1 }}>
            <Button
              className="saveItem border-0"
              onClick={handleUpdateItem}
            >
              Save
            </Button>
          </Col>
          <Col xs={{ span: 3 }} md={{ span: 1 }}>
            <Button
              variant="secondary"
              className="border-0"
              onClick={handleGoBack}
            >
              Cancel
            </Button>
          </Col>
        </>
      )}
    </Row>
  )
}

export default Item