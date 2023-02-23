// Page "Statistiques par modèle"
// TO-DO => Responsive à améliorer => qd mobile un seul graph combiné ;  Affichage mauvaises prédiction => seulement 2 images quand mobile
//           Affichage des paramètres, classes prédites, bouton entrainement
// Faire un flex nowrap pour les images prédictions

import { Chart } from "chart.js";
import { onMount, createResource, For, createEffect, Switch, Match, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import SelectModel from "~/components/select_model";

// correction bug pas compris : https://github.com/sgratzl/chartjs-chart-wordcloud/issues/4
import { registerables } from 'chart.js';
Chart.register(...registerables);
//---------------------------------------

declare const window: any;

export default function Stats_modele() {
    // Test API
    // const testApi = async () => (await fetch(`https://fr.wikipedia.org/w/api.php?action=query&titles=Terre&prop=extracts&exchars=500&explaintext&utf8&format=json`)).json();
    // const [wiki] = createResource(testApi);
    // console.log(wiki())

    // Fonction permettant la 1ere étape de l'update chart => la suppression
    function removeData(chart:any) {

        // Récup le nombre de valeur en abscisse (époques)
        let dataLength:number = chart.data.datasets[0].data.length

        // Effectue les suppression
        for(let i=0 ; i < dataLength; i++){
            // Supprime les valeurs y (loss ou accuracy)
            chart.data.datasets.forEach((dataset:any) => {
                dataset.data.pop();
            });
            // Supprime les valeurs
            chart.data.labels.pop();
        }
        chart.update();
    }

    // Fonction permettant la 2e étape de l'update chart => chargement des nouvelles datas
    function addData(chart:any, label:any, dataTest:any, dataVal:any) {
        
        // Push des valeurs y (époques)
        chart.data.labels.push(...label);

        // Push des valeurs x (test & accuracy)
        chart.data.datasets[0].data.push(...dataTest);
        chart.data.datasets[1].data.push(...dataVal);
        chart.update();
    }

    // Fonction action selon modèle sélectionné ; À rennomer dynamicData ?
    function dynamicGraph(numModel:string){
        
        // Suppression des données précedantes
        removeData(window.myChartA);
        removeData(window.myChartL);

        //ici faut une fonction qui récup les data (époques, val&test accuracy et loss) selon le "numModel"
        //puis add data avec ces données

        //temporaire
        if(Number(numModel) == 1){

            addData(window.myChartA, [1,2,3,4,5,6,7], [40, 59, 80, 81, 90, 92, 89], [39, 50, 81, 75, 80, 79, 60]);
            addData(window.myChartL, [1,2,3,4,5,6,7], [90, 60, 55, 40, 10, 6, 7], [95, 60, 40, 30, 10, 9, 10]);
        }
        else if(Number(numModel) == 2){

            addData(window.myChartA, [1,2,3,4,5,6,7], [25,52,85,95,36,25,48], [20,20,20,30,50,60,50]);
            addData(window.myChartL, [1,2,3,4,5,6,7], [25,52,85,95,36,25,48], [20,20,20,20,20,20,40]);
        }
        else if(Number(numModel) == 3){
            addData(window.myChartA, [1,2,3,4,5,6,7], [25,26,29,89,46,48,15], [20,20,20,30,50,60,100]);
            addData(window.myChartL, [1,2,3,4,5,6,7], [20,20,20,30,50,60,50], [25,26,29,89,46,48,15]);
        }
    }

    // Fonction permettant de récup et afficher la liste des modèles
    function SelectModelCustom(){

        // Récup liste des modèles via API
        const getModels = async () => (await fetch ('http://localhost:8000/api/models')).json();
        const [models] = createResource(getModels);

        // Valeur toggle de séléction du modèle => modèle choisi
        const [valeur, setValeur] = createSignal("1"); // içi valeur par défault => 1, doit dynammiquement dépendre du local storage

        // Effect permettant de mettre à jour les infos de la page selon modèle choisi
        let pass:number = 0 // Permet de ne pas update le graph inutilement dès le chargement de la page
        createEffect(()=> {
            console.log(valeur()) // A NE PAS SUPPR => permet à tout l'effect de fonctionner ! OU remplacer par équivalent !!!
            if(pass==0){
                pass = 1;
            }
            else{
                dynamicGraph(valeur());
                console.log(valeur(),"modifié")
            }
            // fcts permettant de modifier section "Mauvaise prédiction","Paramètre",... à mettre ici
        })
        
        // Renvoie la liste des modèles dans le select
        return (
            <select value={valeur()} onInput={e=> setValeur(e.currentTarget.value)} id="countries" class="mx-auto w-6/12 bg-indigo-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <For each={models()}>{(model) =>
                    <option value={model.id}>{model.name}</option>
                }</For>
            </select>
        )
    }

    // Fonction permettant d'afficher les graphs metrics (1ère fois, après chargement de la page => "onMount")
    function handleGraph(chartId:string, type:string, dataTest:Array<number>, dataVal:Array<number>){
        const ctx = document.getElementById(chartId) as HTMLCanvasElement;

        const labels = [1,2,3,4,5,6,7];
        const data = {
          labels: labels,
          datasets: [{
            label: 'Test ' + type,
            data: dataTest,
            fill: false,
            borderColor: 'rgb(46, 128, 185)',
            tension: 0.1
          },{
            label: 'Validation ' + type,
            data: dataVal,
            fill: false,
            borderColor: 'rgb(255, 128, 17)',
            tension: 0.1
          }]
        };

        if(type == "Accuracy"){
            window.myChartA = new Chart(ctx, {
                type:"line",
                data: data,
                options: {
                    scales: {
                        y: {
                            title: {
                                display:true,
                                text: type
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: type
                            }
                        }
                    }
                }
            });
        }
        else if(type == "Loss"){
            window.myChartL = new Chart(ctx, {
                type:"line",
                data: data,
                options: {
                    scales: {
                        y: {
                            title: {
                                display:true,
                                text: type
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: type
                            }
                        }
                    }
                }
            });
        }
        console.log(window.myChartA);
    } 

    // Valeur par default => à améliorer : depend modèle par default défini par signal en global
    var defaultChartValueAT = [40, 59, 80, 81, 90, 92, 89];
    var defaultChartValueAV = [39, 50, 81, 75, 80, 79, 60];
    var defaultChartValueLT = [90, 60, 55, 40, 10, 6, 7];
    var defaultChartValueLV = [95, 60, 40, 30, 10, 9, 10];
    
    // S'éxecute après le return, permet ici de charger les graphs dans les canvas
    onMount(()=> {
        handleGraph("accuracyChart", "Accuracy", defaultChartValueAT , defaultChartValueAV); // Graph accuracy
        handleGraph("lossChart", "Loss", defaultChartValueLT, defaultChartValueLV); // Graph loss
    })

    // Permet d'afficher une card "Mauvaise prédiction"
    function BadPredictionCard(props:any){
        return (
            <div class="flex flex-col border-2 border-[#7D6ADE] rounded-xl sm:w-64 sm:p-2 mx-auto my-1 bg-[#7D6ADE] sm:m-2">
                <div class="flex w-28 items-center m-auto sm:w-52 sm:m-auto">
                    <img src={props.url} alt={props.reelleClasse}/>
                </div>
                <div>
                    <p>Prédiction: {props.prediction}</p>
                    <p>Vrai: {props.reelleClasse}</p>
                </div>
            </div>
        )
    }

    function ClassCard(props:any){
        return (
            <div class="bg-[#7D6ADE] rounded-xl mx-auto">
                <div class="flex flex-col px-2">
                    <div class="text-white mx-auto">{props.class}</div>
                    <div class="text-white mx-auto">{props.number} images</div>
                </div>
            </div>
        )
    }
    
    // Return de la page finale à charger
    return (
        <main class="sm:container mx-auto">
            <div class="flex flex-col justify-center mx-auto">
                <SelectModelCustom />

                {/* Affichage des metrics */}
                <p class="text-center text-white text-2xl">Metrics</p>
                <div class="flex flex-wrap">
                    <div class="m-auto" style="width:400px; height:200px">
                        <canvas class="bg-white m-2" id="accuracyChart"></canvas>
                    </div>
                    <div class="m-auto" style="width:400px; height:200px">
                        <canvas class="bg-white m-2" id="lossChart"></canvas>
                    </div>
                </div>

                {/* Affichage des mauvaise prrédictions  */}
                <p class="text-center text-white text-2xl">Mauvaises prédictions</p>
                <div class="grid grid-cols-3 mx-auto">
                    <BadPredictionCard url="https://assets.afcdn.com/recipe/20210514/120317_w1024h1024c1cx1060cy707.jpg" reelleClasse="Pizza" prediction="Tacos"/>
                    <BadPredictionCard url="https://assets.afcdn.com/recipe/20130627/42230_w1024h1024c1cx1250cy1875.jpg" reelleClasse="Hamburger" prediction="Pizza"/>
                    <BadPredictionCard url="https://img.cuisineaz.com/660x660/2019/04/17/i146583-tacos-poulet-curry.jpeg" reelleClasse="Tacos" prediction="Hamburger"/>
                </div>

                {/* Affichage des paramètres */}
                <p class="text-center text-white text-2xl">Paramètres</p>
                <div class="flex flex-col mx-auto">
                    <div class="relative w-96 h-6 border-b-2 border-white">
                        <div class="absolute left-0 text-white">Learning-rate</div>
                        <div class="absolute right-0 text-white">0.001</div>
                    </div>
                    <div class="relative  w-96 h-6 border-b-2 border-white">
                        <div class="absolute left-0 text-white">Dropout</div>
                        <div class="absolute right-0 text-white">0.4</div>
                    </div>
                    <div class="relative  w-96 h-6 border-b-2 border-white">
                        <div class="absolute left-0 text-white">Époques</div>
                        <div class="absolute right-0 text-white">18</div>
                    </div>
                </div>

                {/* Affichage classes prédites */}
                <p class="text-center text-white text-2xl my-3">Classes prédites</p>  
                <div class="flex flex-wrap w-96 mx-auto">
                    <ClassCard class="Tacos" number="1000"/>
                    <ClassCard class="Hamburger" number="1000"/>
                    <ClassCard class="Pizza" number="1000"/>
                </div>

                {/* Affichage boutton entrainement */}
                <div class="flex justify-center mt-10">
                    <a type="button" class="flex w-28 h-10 rounded-2xl bg-[#7D6ADE]" href="/entrainement">
                        <div class="text-white m-auto">
                            Entrainement
                        </div>
                    </a>
                </div>
            </div>
        </main>
    )
}