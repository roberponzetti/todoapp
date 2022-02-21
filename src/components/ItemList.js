import React, {useState, useEffect} from 'react'
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import '../styles.css';
import Item from './Item';

const Items = () => {
    const [description, setDescription] = useState('');
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      axios
        //.get(`https://my-json-server.typicode.com/roberponzetti/demo/list`)
        // .get(`https://localhost:3000`)
        .get(`https://robertodoapp-api.herokuapp.com`)
        .then((response) => setItems(response.data))
        .finally(() => setIsLoading(false));
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('https://localhost:3000', {
        description: description,
        completed: false
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      setDescription('');
    };


    return (
      <div className="mt-5">
      <h1>To-do list</h1>
      <Row className="p-0 row-margin mt-5 align-items-center justify-content-center">  
        <Col xs={{ span: 12 }} md={{ span: 4 }}>    
          <Form onSubmit={handleSubmit}>
            <div className="input-group">
              <Form.Control
                id="newTask"
                placeholder="New task"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="input-group-append">
                <Button
                  variant="primary"
                  disabled={description ? '' : 'disabled'}
                  type="submit"
                >
                  Add
                </Button>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
      {isLoading ? (
        <div className="mt-5" role="status">
          <span className="h3 sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {items.length ? (
            <>
              {items.map((item) => (
                <Item key={item.itemId} {...item}/>
              ))}
            </>
          ) : (
            <h3 className="mt-5">No tasks</h3>
          )}
        </>
      )}
    </div>
    );
}

export default Items