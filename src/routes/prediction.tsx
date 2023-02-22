import { createSignal, Show } from "solid-js";
import SelectModel from "~/components/select_model";

export default function Prediction() {
    var file: any = null
    const [on, setOn] = createSignal('predict')

    const predict = () =>{
      if(file === null){
        console.error('Désoler un fichier est attendue !')
      }else{
        console.log('ok can do prediction')
        setOn('predicted')
      }
    }

    const badPrediction = () => {
      setOn('badpredicted')
    }
     
    const handleImage = (e: object) => {
      const reader = new FileReader()
      const image_area = document.getElementById('selected_img')

      reader.onload = (e) => {
        image_area!.innerHTML = ''
        const image = new Image()

        image.src = reader.result
        image_area.style.width = "100%"
        image_area.style.height = '100%'
        image_area.style.background = 'url(' + image.src + ')'
        image_area.style.backgroundPosition = 'center'
        image_area.style.backgroundSize = 'cover'
      }

      try{
        file = e.target.files[0]
        reader.readAsDataURL(file)

      }catch(error){
        console.error(error)
      }
    }

    const nextPrediction = () => {
      setOn('predict')
      file = null
      
    }

    return (
      <main class="lg:container relative mx-auto">
        <section class="w-full"> {/** Selection modèle */}
            <SelectModel />

            <div id="televersement_image" class="w-full  relative mt-10">
              <h3 class="w-full text-xl	text-center text-white">Téléverser une image</h3>
              <p class="w-full text-center text-white text-sm">Clicker sur l’icone image pour en choisir une</p>
            </div>

            <div class="flex justify-center mt-2">
                <label style="width: 250px; height: 250px" class="flex justify-center transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                    <div class="flex items-center space-x-2" id="selected_img">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#929292" d="M7 17h10q.3 0 .45-.275t-.05-.525l-2.75-3.675q-.15-.2-.4-.2t-.4.2L11.25 16L9.4 13.525q-.15-.2-.4-.2t-.4.2l-2 2.675q-.2.25-.05.525T7 17Zm-2 4q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Z"/></svg>
                    </div>
                    <input type="file" name="file_upload" class="hidden" accept="image/png, image/jpg, image/jpeg " onChange={handleImage}/>
                </label>
            </div>
            <div class="w-full flex justify-center flex-wrap">
              <Show when={on() == 'predict'}>
                
                  <button type="button" onClick={predict} class="w-64 justify-center text-white  bg-[#7D6ADE] font-medium rounded-lg text-sm px-5 py-2.5 mt-4">Prédire</button>
                
              </Show>

              <Show when={on() == 'predicted'}>
                <div class="w-full flex justify-center">
                  <button type="button" onClick={predict} class="w-64 justify-center text-white  bg-[#7D6ADE] font-medium rounded-lg text-sm px-5 py-2.5 mt-4">Bonne</button>
                </div>  
                <div class="w-full flex justify-center">
                  <button type="button" onClick={badPrediction} class="w-64 justify-center text-white  bg-[#AE4141] font-medium rounded-lg text-sm px-5 py-2.5 mt-4">Mauvaise</button>
                </div>  
              </Show>

              <Show when={on() == 'badpredicted'}>
                <div class="w-full text-center text-white">
                  Si mauvaise prédiction veuillez sélectionner la catégorie qui aurais du être prédite
                </div>

                <div class="w-4/5 bg-[#7D6ADE] rounded-lg relative top-12 " style='height: 134px'>
                  fe
                </div>
              </Show>

            </div>

            <div class="w-full flex justify-center mt-20" style='bottom: 0'>
              <button type="button" onClick={predict} class="w-64 justify-center text-white  bg-[#7D6ADE] font-medium rounded-lg text-sm px-5 py-2.5 mt-4">Prédiction suivante</button>
            </div>
        </section>
      </main>
    );  
  }
  