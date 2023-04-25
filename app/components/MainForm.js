'use client'
import React, {useEffect, useState} from 'react';
import Loader from "react-loader-spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import List from './List'
import EmailForm from "./EmailForm";
import ThankYou from "./ThankYou";
import Card from "react-bootstrap/cjs/Card";
import {Link, animateScroll as scroll} from "react-scroll";
import { fetchRepresentatives } from '../assets/petitions/fetchRepresentatives';

const MainForm = ({dataUser, setDataUser, mp, setMp, setEmailData, emailData, clientId, states, tweet, typData, mainData, backendURLBase, endpoints, backendURLBaseServices, setAllDataIn, allDataIn}) => {
    const [showLoadSpin, setShowLoadSpin] = useState(false)
    const [showList, setShowList] = useState(true)
    const [showFindForm, setShowFindForm] = useState(false)
    const [showEmailForm, setShowEmailForm] = useState(true)
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false)
    const [showThankYou, setShowThankYou] = useState(true)
    const [tac, setTac] = useState(false)

    const handleTerms = (e) => {
        if (e.target.checked === true) {
          setTac(true)
      } else {
        setTac(false)
      }
    }

    const handleChange = e => {
        e.preventDefault();
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })

    }
    const { zipCode, emailUser } = dataUser;

    const click = async e => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (
        tac === false || zipCode.trim() === '' || emailUser.trim() === '') {
            
            setError(true)
            return
        }
        
        setShowLoadSpin(true)
        setError(false)
        fetchRepresentatives('GET',backendURLBase, endpoints.teGetRepresentativesPerStates, clientId, `&state=${dataUser.state}`, setMp, setShowLoadSpin, setShowList, setAllDataIn)        
        .catch(error => console.log('error', error));



        scroll.scrollToBottom();
    }
    
   
    if(!mainData) return 'loading datos'
    if(!mp) return 'loading datos'
    // console.log('Main page data', mainData)
    //         console.log('Email data', dataUser)
    //         console.log('States data', states)
    //         console.log('tweets', tweet)
    //         console.log('TYPdata', typData)
    return (

        <div className={'contenedor main-form-flex-container'} >
            <Card className="bg-dark card-img text-white main-image-container">
                <Card.Header className='card-img'  style={{ backgroundImage: `url(${ mainData.mainImg })`, backgroundPosition: 'center', backgroundSize: 'cover' } } 
                     alt={'header'}/>
                     <Card.ImgOverlay className={'card-img-overlay'}>
                         <Card.Body>
                         <Card.Text className={'text'} >
                                 { mainData.title}
                         </Card.Text>
                             <Card.Text className={'text2'} >
                             { mainData.subtitle}
                             </Card.Text>
                         </Card.Body>
                     </Card.ImgOverlay>
            </Card>
            <div className={'container instructions' } >
                { mainData.instruction}
            </div>
            <div className={'form-container'}>
                <div hidden={showFindForm} className={'container container-content'} >
                    {error ? <Alert variant={'danger'}>
                    Todos lo campos son necesarios, por favor introduzca los faltantes.
                    </Alert> : null}
                    <Link
                        activeClass="active"
                        to="section1"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                    </Link>
                    <Form onSubmit={click} noValidate validated={validated}>
                        <h3 className='find-her-mp-text'>{mainData.firstFormLabel1}</h3>
                        <Form.Group>
                            <Form.Control
                                type="email"
                                placeholder={mainData.firstFormPlaceholder1}
                                name="emailUser"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <p className='select-label'>{mainData.firstFormLabel2}</p>
                            {/* <Form.Select className='select-styles-form' aria-label="DefaulValue" required name ='state' onChange={handleChange}
                                >
                                <option key={'vacio'} value={''}>{mainData.firstFormPlaceholder2}</option>
                                {
                                    states.sort().map((estate)=>(
                                        <option key={estate} value={estate} >{estate}</option>
                                    ))
                                }
                            </Form.Select> */}
                            <Form.Control
                                type="text"
                                placeholder={mainData.firstFormPlaceholder2}
                                name="zipCode"
                                onChange={handleChange}
                                required
                                maxLength="5"
                            />
                        </Form.Group>
                        <Form.Group style={{textAlign: "justify"}} controlId="conditions">
                            <Form.Check
                            name="conditions"
                            onClick={handleTerms}
                            required
                            label={
                                <a target={"_blank"} rel={"noreferrer"} href={mainData.termsAndConditionsURL}> {mainData.termsAndConditionsTxt}</a>
                            }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button
                                type={'submit'}
                                variant={'dark'}
                                size={'lg'}
                                onClick={click}
                                className={'u-full-width capitalize-style find-btn-main-form'}
                            >
                                {mainData.findBtnText}
                            </Button>
                        </Form.Group>
                        {showLoadSpin ? <Loader
                            visible={showLoadSpin}
                            type="Puff"
                            color="#000000"
                            height={100}
                            width={100}
                            timeout={10000} 
                        /> : null }
                    </Form>

                    <div className={'container senators-container'} hidden={showList}>
                        <div className='note-container'>
                            <p>{mainData.note}</p>
                        </div>
                        <h2>{mainData.positionName}</h2>
                        <div className='representatives-container'>
                            {mp.length > 0 ?  (
                                <List
                                    setShowEmailForm={setShowEmailForm}
                                    setShowFindForm={setShowFindForm}
                                    showFindForm={showFindForm}
                                    emailData={emailData}
                                    setEmailData={setEmailData}
                                    dataUser={dataUser}
                                    mp={mp}
                                    clientId={clientId}
                                    // key={index}
                                    tweet={tweet}
                                    allDataIn={allDataIn}
                                    setAllDataIn={setAllDataIn}
                                />)  
                            : <Alert variant='danger'>No representatives have been found with the state that has provided us</Alert> }
                        </div>
                    </div>
                    
                </div>
            </div>
            <EmailForm
                setShowThankYou={setShowThankYou}
                setShowFindForm={setShowFindForm}
                setShowEmailForm={setShowEmailForm}
                showEmailForm={showEmailForm}
                dataUser={dataUser}
                emailData={emailData}
                setEmailData={setEmailData}
                setDataUser={setDataUser}
                clientId={clientId}
                endpoints={endpoints}
                backendURLBase={backendURLBase}
                backendURLBaseServices={backendURLBaseServices}
                mainData={mainData}
                allDataIn={allDataIn}
                setAllDataIn={setAllDataIn}
            />
            <ThankYou
                emailData={emailData}
                setDataUser={setDataUser}
                setEmailData={setEmailData}
                setShowFindForm={setShowFindForm}
                setShowThankYou={setShowThankYou}
                clientId={clientId}
                typData={typData}
                showThankYou={showThankYou}/>
           
        </div>
    )
}
export default MainForm


