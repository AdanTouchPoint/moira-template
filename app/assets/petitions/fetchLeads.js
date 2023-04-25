import { fetchData } from "./fetchData"
const fetchLeads = (successResponse, backendURLBase, endpoints, clientId, dataUser, emailData, allDataIn) =>{
        
    fetchData('POST', backendURLBase, endpoints.toSaveLeads, clientId,`&firstName=${dataUser.userName ? dataUser.userName:''}&postalcode=${dataUser.zipCode ? dataUser.zipCode:dataUser.state}&emailData=${dataUser.emailUser}&representative=${allDataIn}&emailMessage=${dataUser.text}&subject=${dataUser.subject}&sended=${successResponse}`)
    // axios.post(`https://payload-demo-tpm.herokuapp.com/leads?&firstName=${dataUser.userName ? dataUser.userName:''}&postalcode=${dataUser.zipCode ? dataUser.zipCode:dataUser.state}&emailData=${dataUser.emailUser}&representative=${emailData.name}&emailMessage=${dataUser.text}&city=${emailData.state}&party=${emailData.party}&clientId=${clientId}&sended=${respuestaDeExito}`, dataUseryEmail)
}

export {
    fetchLeads
}