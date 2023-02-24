export const Formater = (data: any) => {
    const formdata = new FormData()

    Object.keys(data).forEach((_data, i) => {
        console.log(_data, i)
        formdata.append(_data, data[_data])
    })

    return formdata
}

