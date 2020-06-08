import React,{useState} from "react";
import axios from 'axios';
import DOMPurify from 'dompurify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


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

    // setting up  state pieces

    const [formData, setFormData] = useState(initialState);
    const [show, setShow] = useState(false);
    const [isInvalid, setIsInvalid] = useState(true);
    const [isTouched, setIsTouched] = useState(false);

    // handlers for modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //handlers for form inputs and submit and validation
    const handleChange = (e) => {
        setIsTouched(true);
        const {name,value} = e.target;
        if (value === '') {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
        }
        setFormData( data => ({
            ...data,
            [name]: value
        }))
        

    }
    const handleSubmit =(e) => {
        e.preventDefault();
        
        const {name,discount,code,email,template,htmlBody}=formData;
        if(!isInvalid){
            //able to submit the form
            // ajax call to get email template
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
        }
       
        
    }
    
    //ajax call to API to send email 
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
    // render my Mailform and modal modules
    return (
        <div id="config-form" className="form-group">
            <div>
                
            </div>
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
                    required={true}
                />
                <label className="col-form-label" htmlFor="discount">Discount</label>
                <div className="input-group discountField">
                    <input 
                        className="form-control"
                        id="discount" 
                        type="number"
                        name="discount" 
                        placeholder="Discount Amount"
                        value={formData.discount}
                        onChange={handleChange}
                        required={true}
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
                    required={true}
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
                    required={true}
                />
                <div className="form-group selector">
                    <label htmlFor="template">Select template</label>
                    <select name="template" className="form-control" required={true} default="fall" value={formData.template} id="template" onChange={handleChange}>
                        <option value="">Choose a template</option>
                        <option value="fall">Fall</option>
                        <option value="holiday">Holiday</option>
                        <option value="summer">Summer</option>
                    </select>
                </div>
                {isInvalid && isTouched && <Alert variant="danger">All fields must be completed</Alert>}
                <button className="btn btn-success">Preview</button>
                
            </form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Email confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formData.htmlBody) }} >
                
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={sendEmail}>
                    Confirm and Send
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}

export default MailForm;