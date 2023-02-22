import { createEffect } from 'solid-js';
import { render } from 'solid-js/web';
import { createStore, Store, SetStoreFunction } from 'solid-js/store';

export const [user, setUser]                  = createStore({})
export const [modelSetting, setModelSettings] = createStore({})

const [_notif, setNotif] = createStore([])

export const notifs = () => {
    return _notif
}

export const  pushNotif = (__notif: any) => {
    const notif = {
        id:      notifs().length + 1,
        message: __notif.message,
        color:   __notif.color ?? 'blue'
    }

    
    setNotif([...notifs(), notif]);
}

export const removeNotif = (notifid: number) => {
    console.log('okokok', notifid)
    setNotif((items: any) => items.filter((item: any) => item.id !== notifid));
} 



export const [trainClassesSelect, setTrainClassesSelect] = createStore([]);