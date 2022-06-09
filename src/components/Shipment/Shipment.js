import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../../App';
import { useContext } from 'react';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] =useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

  return (
   
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={loggedInUser.name}{...register("name", { required: true })} placeholder="Enter your name."/>
        {errors.name && <span className='error'>Name is required.</span>}
        <input defaultValue={loggedInUser.email}{...register("email", { required: true })} placeholder="Enter your email."/>
        {errors.email && <span className='error'>Email is required.</span>}
        <input defaultValue={loggedInUser.address}{...register("address", { required: true })} placeholder="Enter your address."/>
        {errors.address && <span className='error'>Address is required.</span>}
        <input defaultValue={loggedInUser.phone}{...register("phone", { required: true })} placeholder="Enter your phone no."/>
        {errors.phone && <span className='error'>Phone Number is required.</span>}
        <input {...register("zip", { required: true })} placeholder="Enter your zip code."/>
        {errors.zip && <span className='error'>Zip Code is required.</span>}
        
        <input type="submit" />
    </form>
  );
};

export default Shipment;