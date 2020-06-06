import React,{useState} from "react";

const MailForm = () => {
    const initialState = { 
        name: "",
        discount: "",
        code: "",
        email: ""
    }
    const [formData, setFormData] = useState(initialState)
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData( data => ({
            ...data,
            [name]: value
        }))
    }
    const handleSubmit =(e) => {
        e.preventDefault();
        const {name,discount,code,email}=formData;
        let template = `${name} ${discount} ${code} ${email}`;
        console.log(template);
        setFormData(initialState);
        // ajax request maybe axios?
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input 
                id="name"
                type="text"
                name="name"
                placeholder="First Name"
                value={formData.name}
                onChange={handleChange}
            />
            <label htmlFor="discount">Discount</label>
            <input id="discount" 
                type="text"
                name="discount" 
                placeholder="discount rate"
                value={formData.discount}
                onChange={handleChange}
            />
            <label htmlFor="code">Code</label>
            <input id="code" 
                type="text" 
                name="code"
                value={formData.code}
                placeholder="code"
                onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input id="email" 
                type="email" 
                placeholder="email@mail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            
            <button >Send Email</button>
        </form>
    )
}

export default MailForm;