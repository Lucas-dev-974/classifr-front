export const Formater = (data: any) => {
    const formdata = new FormData()
    Object.keys(data).forEach(_data => formdata.append(_data, data[_data]) )
    return formdata
}

export const request = async (url: string, method: string, data: any) => {

    const host = 'http://localhost:8000/'

    const response = await fetch(host + url, {
        method: method,
        body: data
    })

    return {
        status: response.status,
        json: await response.json()
    }
}