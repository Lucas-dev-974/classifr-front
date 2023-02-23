import { createResource, For } from 'solid-js';

export default function SelectModel(){
    const getModels = async () => (await fetch ('http://localhost:8000/api/models')).json();
    const [models] = createResource(getModels);
    console.log(models())

    return (
        <select id="countries" class="mx-auto w-6/12 bg-indigo-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <For each={models()}>{(model) =>
                <option value={model.id}>{model.name}</option>
            }</For>
        </select>
    )
}