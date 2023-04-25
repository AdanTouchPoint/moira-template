import { fetchData } from "./fetchData";
import { mailerExtracter } from "../helpers/mailerExtracter";

const fetchRepresentatives = async (petitionMethod, backendURLBase, endpoint, clientId, params = '', setMp, setShowLoadSpin, setShowList, setAllDataIn) => {
    const datos = await fetchData(petitionMethod, backendURLBase, endpoint, clientId, params)
    const emails = await mailerExtracter(datos.data)
    setAllDataIn(emails)
    setMp(datos.data)
    setShowLoadSpin(false)
    setShowList(false)
    // await console.log(datos)

}


export{
    fetchRepresentatives
}
