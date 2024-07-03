export const buildHistory = ({ timestamp, title }, user) => {
    // const oldData = JSON.parse(window.localStorage.getItem(`user-${user}-history`))

    // if (oldData) {
    //     const newData = [{ timestamp, title }, ...oldData]
    //     window.localStorage.setItem(`user-${user}-history`, JSON.stringify(newData))
    // }else{
    //     window.localStorage.setItem(`user-${user}-history`, JSON.stringify([{ timestamp, title }]))
    // }    

    const oldData = JSON.parse(window.localStorage.getItem(`user-${user}-history`)) || [];

    const newData = [{ timestamp, title }, ...oldData];
    window.localStorage.setItem(`user-${user}-history`, JSON.stringify(newData));
}