const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel');

// get all contacts
// route = get /api/contacts
// @access private 

const getContact = asyncHandler(async(req,res)=> {
    const contacts =await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
})
// create contact
// route = post /api/contacts
// @access private 
const constants = require("../constants");
const createContact = asyncHandler(async(req,res)=> {
    console.log(req.body)
    console.log(constants.VALIDATION_ERROR)
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(constants.SERVER_ERROR)
        throw new Error("all fields are mendatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact)
})
// get a specific contact
// route = post /api/contacts/:id
// @access private 
const getContactOf = asyncHandler(async(req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(constants.NOT_FOUND);
        throw new Error("Contact not found")
    }
    res.json(contact)
})

// update a specific contact
// route = post /api/contacts/:id
// @access private 
const updateContactOf =asyncHandler(async(req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(constants.NOT_FOUND);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user don't have permisson to update other users contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact)
})

// delete a specific contact
// route = post /api/contacts/:id
// @access private 
const deleteContactOf =asyncHandler(async(req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(constants.NOT_FOUND);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user don't have permisson to update other users contact");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
})



module.exports = {getContact,createContact,getContactOf,updateContactOf,deleteContactOf}