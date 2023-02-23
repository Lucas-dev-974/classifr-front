import { createResource, For, onMount } from "solid-js"
import ChooseClasses from "~/components/train_add_classes"
import SelectModel from "~/components/select_model"

import { trainClassesSelect } from "~/store/signaux";



export default function entrainement(){
    const train = () => {

    }

    return <main class="pt-4 sm:container text-white mx-auto">

        <div class="px-10">
            <div class="flex items-center">
                <h3>Sélectionner sur quel classe entrainer </h3>
                <ChooseClasses />
            </div>

            <div class="flex felx-wrap">
                <For each={trainClassesSelect}>{(classe, i) =>
                    <button type="button" class="mx-3 justify-center text-white  bg-[#7D6ADE] font-medium rounded-lg text-sm  px-5 py-2.5 mt-4">{classe.name}</button>
                }</For>
            </div>
        </div>    

        <div class="px-10 mt-10">
            <div class="flex items-center">
                <h3>Sélectionner un modèle</h3>
                <ChooseClasses />
            </div>                
            <SelectModel />
        </div> 

        <div class="px-10 mt-10">
            <h3>Paramètre d'entrainement</h3>

            <div id="model-settings">
                <div class="w-full flex my-2">
                    <p class="mx-3" style="width: 150px">Learning-rate</p>
                    <input type="number" class="p-1 text-zinc-900" />
                </div>
                <div class="w-full flex my-2">
                    <p class="mx-3" style="width: 150px">Dropout</p>
                    <input type="number" class="p-1 text-zinc-900" />
                </div>
                <div class="w-full flex my-2">
                    <p class="mx-3" style="width: 150px">Epoques</p>
                    <input type="number" class="p-1 text-zinc-900"  name="epoques"/>
                </div>

                <div class="w-full flex my-2">
                    <p class="mx-3" style="width: 150px">Data augmentation</p>
                    <input type="checkbox" />
                </div>
            </div>              
        </div>    

        <div class="px-10 mt-10">
            <h3>Paramètre d'entrainement</h3>

            <div id="model-settings" class="ml-3 bg-slate-800 p-5 rounded">
                <p>Feedback de l'entrainement</p>
            </div>              
        </div>    
        <div class="flex juitify-center w-full mx-auto absolute">
            <button type="button" onClick={train} class="w-64 justify-center text-white  bg-[#7D6ADE] font-medium rounded-lg text-sm px-5 py-2.5 mt-4">Entrainer</button>
        </div>
    </main>
}
const ar: Array<number> = []