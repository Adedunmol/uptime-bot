import axios from "axios"

const isSiteUp = async (website: string) => {
    
    const response = await axios.head(website);

    const statusCode = response.status

    return statusCode < 400
}

export default isSiteUp;