"use client";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import List from "./List";
import EmailForm from "./EmailForm";
import ThankYou from "./ThankYou";
import Card from "react-bootstrap/cjs/Card";
import { Link, animateScroll as scroll } from "react-scroll";
import { fetchRepresentatives } from "../assets/petitions/fetchRepresentatives";
import ProgressBar from "./ProgressBar";

const MainForm = ({
  setLeads,
  leads,
  dataUser,
  setDataUser,
  mp,
  setMp,
  setEmailData,
  emailData,
  clientId,
  states,
  tweet,
  typData,
  mainData,
  backendURLBase,
  endpoints,
  backendURLBaseServices,
  setAllDataIn,
  allDataIn,
}) => {
  const [showLoadSpin, setShowLoadSpin] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showFindForm, setShowFindForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(true);
  const [tac, setTac] = useState(false);

  const handleTerms = (e) => {
    if (e.target.checked === true) {
      setTac(true);
    } else {
      setTac(false);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  const { zipCode, emailUser } = dataUser;
  const formFields = mainData.formFields;
  const click = async (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = (email) => {
      return emailRegex.test(email);
    };
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (
      tac === false ||
      isValidEmail(emailUser) === false
    ) {
      setError(true);
      return;
    }
    setShowLoadSpin(true);
    setError(false);
    fetchRepresentatives(
      "GET",
      backendURLBase,
      endpoints.teGetRepresentativesPerStates,
      clientId,
      `&state=${dataUser.state}`,
      setMp,
      setShowLoadSpin,
      setShowList,
      setAllDataIn
    ).catch((error) => console.log("error", error));
    scroll.scrollToBottom();
  };
  if (!mainData) return "loading datos";
  if (!mp) return "loading datos";
  return (
    <div className={"contenedor main-form-flex-container"}>
      <Card className="bg-dark card-img text-white main-image-container">
        <Card.Header
          className="card-img"
          style={{
            backgroundImage: `url(${mainData.mainImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          alt={"header"}
        />
        <Card.ImgOverlay className={"card-img-overlay"}>
          <Card.Body>
            <Card.Text className={"text"}>{mainData.title}</Card.Text>
            <Card.Text className={"text2"}>{mainData.subtitle}</Card.Text>
          </Card.Body>
        </Card.ImgOverlay>
      </Card>
      <ProgressBar leads={leads} mainData={mainData} />
      <div className={"container instructions"}>{mainData.instruction}</div>
      <div className={"form-container"}>
        <div hidden={showFindForm} className={"container container-content"}>
        {error ? (
            <Alert variant={"danger"}>
              Todos lo campos son necesarios, por favor introduzca los
              faltantes.
            </Alert>
          ) : null}
          <Form
            name="fm-find"
            onSubmit={click}
            noValidate
            validated={validated}
          >
            <h3 className="find-her-mp-text">{mainData.subtitleForm}</h3>
            <div className="fields-form">
            {formFields.map((field, key) => {
              console.log(field, key);
              return field.type !== "state" ? (
                  <Form.Group className="field" key={key}>
                    <Form.Label className="select-label">{field.label}</Form.Label>
                    <Form.Control
                      id="emailInput-mainForm"
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.type}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
              ) : (
states.length > 0 ? 
<Form.Group className={"field"} key={key}>
<Form.Label className="select-label">{field.label}</Form.Label>
 <Form.Select
   aria-label="DefaulValue"
   required
   name={field.type}
   id="stateSelect-mainForm"
   onChange={handleChange}
 >
   <option key={"vacio"} value={""}>
     {field.placeholder}
   </option>
   {states.sort().map((estate) => (
     <option key={estate} value={estate}>
       {estate}
     </option>
   ))}
 </Form.Select>
</Form.Group> 
:
   <Form.Group className="field" key={key}>
   <Form.Label className="select-label">{field.label}</Form.Label>
   <Form.Control
     id="emailInput-mainForm"
     type={field.type}
     placeholder={field.placeholder}
     name={field.type}
     onChange={handleChange}
     required
   />
 </Form.Group>

              );
            })}
            </div>
            <Form.Group className="field select-styles-form" style={{ textAlign: "justify" }} controlId="conditions">
              <Form.Check
                id="tycCheckbox-mainForm"
                name="conditions"
                onClick={handleTerms}
                required
                label={
                  <a
                    target={"_blank"}
                    rel={"noreferrer"}
                    href={mainData.termsAndConditionsURL}
                  >
                    {" "}
                    {mainData.termsAndConditionsTxt}
                  </a>
                }
              />
            </Form.Group>
            <Form.Group>
              <Button
                id="findButton-mainForm"
                type={"submit"}
                variant={"dark"}
                size={"lg"}
                onClick={click}
                className={"u-full-width capitalize-style find-btn-main-form"}
              >
                {mainData.findBtnText}
              </Button>
            </Form.Group>
            {showLoadSpin ? (
              <Loader
                visible={showLoadSpin}
                type="Puff"
                color="#000000"
                height={100}
                width={100}
                timeout={10000}
              />
            ) : null}
          </Form>
          <div className={"container senators-container"} hidden={showList}>
            <div className="note-container">
              <p>{mainData.note}</p>
            </div>
            <h2>{mainData.positionName}</h2>
            <div className="representatives-container">
              {mp.length > 0 ? (
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
                />
              ) : (
                <Alert variant="danger">
                  No representatives have been found with the state that has
                  provided us
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
      <EmailForm
        setLeads={setLeads}
        leads={leads}
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
        showThankYou={showThankYou}
      />
    </div>
  );
};
export default MainForm;
