export default function SelectModel(){
    const getModels = async () => {

    }

    
    return <div class="w-ful h-40l  mx-auto flex justify-cente flex-wrap">
        <h3 class="w-full text-white text-lg  text-center mx-auto pb-4">Sélectionner un modèle</h3>
        <div class="w-full flex justify-center">
            <select id="countries" class="mx-auto w-6/12 bg-indigo-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Aucun model sélectionner</option>
                <option value="mobilnet">Mobilnet</option>
                <option value="xception">Xception</option>
                <option value="vgg16">vgg16</option>
                <option value="cnn">CNN from skratch</option>
            </select>
        </div>
    </div>
}