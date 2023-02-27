import { createSignal, onMount } from "solid-js"
import { pushNotif } from "~/store/signaux";
import { Formater, request } from "~/services";

export default function AddModel(){
    const [modelName, setModelName] = createSignal('');

    let file:  File;
    var modal: any;

    // Récupère l'élément modal au montage du composant
    onMount(() =>  modal = new te.Modal(document.getElementById('add_model')) )
    
    // Récupère le fichier sélectionner et le stock dans la variable file
    const handleFile = (e: any) => file = e.target.files[0]

    const addModel = async (e: any) => {
        if(checkForm() != ''){
            pushNotif({ message: checkForm() })
            return false
        }   

        const formdata = Formater({name: modelName(), file: file})
        const response = await request('api/model/create', 'POST', formdata)

        if(response.status != 200){
            pushNotif({message: 'Désoler une erreur est survenue lors de l\'import du modèle veuillez réesayer ultérieurement'})
            return false
        }
        
        modal.hide()
    }

    /**
     * Cette fonction vas érifier si les champs requis son compléter 
     * @returns {string} errors
     */
    const checkForm = () => {
        let errors = ''
        
        if(!file || file === undefined || file === null) errors += 'Veuillez sélectionner un fichier'
        if(modelName().length == 0)                      errors += 'Veuillez entrer un nm pour le modèle.'

        return errors
    }


    return <>
        <button type="button"  data-te-toggle="modal" data-te-target="#add_model"  >
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
                <path fill="#32a64b" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"/>
            </svg>
        </button>

        <div  data-te-modal-init class="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" id="add_model" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
            <div data-te-modal-dialog-ref class=" relative flex min-h-[calc(100%-1rem)]  translate-y-[-50px] items-center opacity-0 transition-all duration-100 min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                <div class="pointer-events-auto  flex w-full flex-col rounded-md border-none bg-[#4544AB] ">
                    <div class="flex items-center justirelativefy-center rounded-t-md border-b border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                            Ajouter un modèle 
                        </h5>
                    </div>
                    <div class="relative p-4 pt-5 pb-3">
                        <div class="mb-3 w-full">
                            <label for="formFileSm" class="mb-2 inline-block text-neutral-700 dark:text-neutral-200" >Sélectionner un fichier .h5</label>
                            <input onChange={handleFile} class="relative m-0  w-full  flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1 text-sm font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent" id="formFileSm" type="file" />
                        </div>

                        <div class="relative " data-te-input-wrapper-init>
                            <input type="text" class="rounded text-black min-h-[auto] w-full border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1 text-sm font-normal  outline-none transition duration-300 ease-in-out file:-mx-3 hover:file:bg-neutral-200 focus:border-primary focus:bg-white" id="exampleFormControlInput1" placeholder="Nom du modèle" 
                            onKeyPress={(e) => setModelName(e.currentTarget.value)} value={modelName()}  />
                        </div>
                    </div>
                    <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md  p-4 dark:border-opacity-50">
                        <button onClick={addModel} type="button" class="w-full rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 "  data-te-ripple-init data-te-ripple-color="light">
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}