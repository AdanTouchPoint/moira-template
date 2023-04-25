'use client'
import React, {useState} from 'react'
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";

import InputGroup from "react-bootstrap/InputGroup"
import Col from "react-bootstrap/cjs/Col";
import Alert from "react-bootstrap/Alert";
import Loader from "react-loader-spinner";
import { fetchData } from '../assets/petitions/fetchData';
import {fetchLeads} from '../assets/petitions/fetchLeads';

const EmailForm = ({setShowThankYou, setShowFindForm, dataUser, setDataUser, showEmailForm, setShowEmailForm, emailData, setEmailData, clientId, backendURLBase, endpoints, backendURLBaseServices, mainData, allDataIn}) => {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false)
    const [showLoadSpin, setShowLoadSpin] = useState(false)
    const handleChange = e => {
        e.preventDefault()
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value.replace(/\n\r?/g, '<br/>' ).replace(/#/g, " ")
        })
        setEmailData({
            ...dataUser,
            ...emailData,
            [e.target.name]: e.target.value.replace(/\n\r?/g, '<br/>' ).replace(/#/g, " ")
        })
    }
    const {userName, text, subject } = dataUser
    const send = async e => {
        e.preventDefault()
        // console.log(allDataIn, 'allDAtaIn')
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (
            userName.trim() === '' || 
            text.trim() === '' || 
            subject.trim() === ''
            ) {
                //console.log(payload.success)
                setError(true)
                return
            }
        setError(false)
        const payload = await fetchData('GET', backendURLBaseServices, endpoints.toSendEmails, clientId, `to=${allDataIn}&subject=${dataUser.subject}&firstName=${dataUser.userName}&emailData=${dataUser.emailUser}&text=${dataUser.text.replace(/\n\r?/g, "<br/>")}` )
        setShowLoadSpin(false)
        if (payload.success === true) {
            fetchLeads(true, backendURLBase, endpoints, clientId, dataUser, emailData, allDataIn)
            setShowEmailForm(true)
            setShowThankYou(false)
        }
        if(payload.success !== true){
        fetchLeads(false, backendURLBase, endpoints, clientId, dataUser, emailData, allDataIn)
        
            return (
                <Alert>
                   The mail has not been sent successfully, please try again later
                    <Button
                    className={'button-email-form'}
                    variant={'dark'}
                    onClick={back}>
                    Regresar
                </Button>
                </Alert>
            )
        }
    }
    const back = e => {
        e.preventDefault()
        setShowFindForm(false)
        setShowEmailForm(true)
    }
    
    return (
        <>
        {
        
        
        <div className={'emailContainer'} hidden={showEmailForm}>
            {error ? <Alert variant={'danger'}>
            All fields are required, please fill in the missing ones.
            </Alert> : null}
            <Form onSubmit={send} noValidate validated={validated}>
                <div className={'formEmail'}>
                    <Col>
                        <Form.Group
                            controlId="name">
                            <Form.Label>
                                {mainData.emailFormUserNameLabel}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={mainData.emailFormUserNamePlaceholder}
                                name="userName"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group
                            controlId="email">
                            <Form.Label>
                                {mainData.emailFormUserLabel}
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={emailData.emailUser}
                                onChange={handleChange}
                                name="emailUser"
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                </div>
                
                <div className='input-subject'>
                    <Col>
                        <Form.Group
                            controlId="subject">
                            <Form.Label>
                                {mainData.emailFormSubjectPlaceholder}
                            </Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                as="input"
                                type="text"
                                name="subject"
                                defaultValue={dataUser.subject.trim()}
                                required
                            />
                        </Form.Group>
                    </Col>
                </div>
                <Col>
                    <Form.Group className='input-text-form'>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            defaultValue={dataUser.text}
                            onChange={handleChange}
                            name="text"
                            required
                        />
                    </Form.Group>
                </Col>
                <Loader
                    visible={showLoadSpin}
                    type="Puff"
                    color="#000000"
                    height={100}
                    width={100}
                    timeout={5000} 
                />
            </Form>
            <div className={'container buttons-container-email-form'}>
                <Button
                    type={'submit'}
                    className={'button-email-form'}
                    variant={'dark'}
                    onClick={send}>
                    {emailData.sendButton? 'please enter a send-button text on your dashboard':'Enviar'}
                </Button>
                <Button
                    className={'button-email-form'}
                    variant={'dark'}
                    onClick={back}>
                    {emailData.backButton? 'please enter a back-button text on your dashboard':'Regresar'}
                </Button>
            </div>
        </div>
    }
    </>
    )
}

export default EmailForm


