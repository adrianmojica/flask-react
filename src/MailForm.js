import React,{useState} from "react";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import "bootstrap/dist/css/bootstrap.min.css";

const MailForm = () => {
    const initialState = { 
        name: "",
        discount: "",
        code: "",
        email: "",
        template: "",
        htmlBody:""
    }
    const [formData, setFormData] = useState(initialState);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData( data => ({
            ...data,
            [name]: value
        }))
    }
    const handleSubmit =(e) => {
        e.preventDefault();
        const {name,discount,code,email,template,htmlBody}=formData;
        // setFormData(initialState);
        axios.post('/confirmation', formData)
        .then(function(response){
            console.log(response);
            //if response is positive show template in modal with confirm button.
                if (response.data !== "" && response.data) {
                    let templateHTML = response.data;
                    console.log(templateHTML)
                    setFormData(data => ({...data,'htmlBody': templateHTML}));
                    handleShow();
                } else {
                    //show Error
                }
            })
            .catch(function(error){
                console.log(error);

            });
        // setFormData(initialState);
    }

    const sendEmail =(e) => {
        e.preventDefault();
        axios.post('/api/email-out', formData)
        .then(function(response){
            console.log(response);
            handleClose();
            })
            .catch(function(error){
                console.log(error);

            });
        setFormData(initialState);
    
    }
    return (
        <div id="config-form" className="form-group">
            <form onSubmit={handleSubmit}>
                <label className="col-form-label" htmlFor="name">Name</label>
                <input
                    className="form-control"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="First Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label className="col-form-label" htmlFor="discount">Discount</label>
                <div className="input-group mb-3">
                    <input 
                        className="form-control"
                        id="discount" 
                        type="text"
                        name="discount" 
                        placeholder="Discount Amount"
                        value={formData.discount}
                        onChange={handleChange}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">%</span>
                    </div>
                </div>
                <label className="col-form-label" htmlFor="code">Code</label>
                <input 
                    className="form-control"
                    id="code" 
                    type="text" 
                    name="code"
                    value={formData.code}
                    placeholder="CODE"
                    onChange={handleChange}
                />
                <label className="col-form-label" htmlFor="email">Email</label>
                <input 
                    className="form-control"
                    id="email" 
                    type="email" 
                    placeholder="email@mail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <div className="form-group">
                    <label htmlFor="template">Select template</label>
                    <select name="template" className="form-control" value={formData.template} id="template" onChange={handleChange}>
                        <option value="fall">Fall</option>
                        <option value="holiday">Holiday</option>
                        <option value="summer">Summer</option>
                    </select>
                </div>
                <button className="btn btn-success">Preview</button>
                
            </form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Email confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{__html: formData.htmlBody}}>
                   
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={sendEmail}>
                    Confirm and Send
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}

export default MailForm;