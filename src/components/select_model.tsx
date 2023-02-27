import { createResource, For } from "solid-js";
import { models, setModels, setSelectedModel } from "~/store/signaux"

const fetchModels = async () => (await fetch(`http://localhost:8000/api/models`)).json();

export default function SelectModel(props: any){
    const [_models] = createResource(fetchModels)

    if (_models() !== undefined && _models() !== null) {
      setModels(_models())
    }

    const handleChange = (e: any) => {
      setSelectedModel(_models().filter((md:any) => md.id == e.target.value)[0])
      if(typeof(props._onchange) == 'function') props._onchange(e)
    }

    return <select onChange={handleChange} id="models" class="mx-auto w-64 bg-indigo-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Aucun model sélectionner</option>
            <For each={_models()}>{(model, i) =>
                <option value={model.id}>{model.name}</option>
            }</For>
        </select>
}