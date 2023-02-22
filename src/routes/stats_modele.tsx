// Page "Statistiques par modèle"
// TO-DO => Responsive à améliorer => qd mobile un seul graph combiné ;  Affichage mauvaises prédiction => seulement 2 images quand mobile
//           Affichage des paramètres, classes prédites, bouton entrainement
// Faire un flex nowrap pour les images prédictions

import { Chart } from "chart.js";
import { onMount } from "solid-js";
import SelectModel from "~/components/select_model";

// correction bug pas compris : https://github.com/sgratzl/chartjs-chart-wordcloud/issues/4
import { registerables } from 'chart.js';
import { List } from "postcss/lib/list";
Chart.register(...registerables);
//---------------------------------------

export default function Stats_modele() {

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

        new Chart(ctx, {
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

    onMount(()=> {
        handleGraph("accuracyChart", "Accuracy", [40, 59, 80, 81, 90, 92, 89], [39, 50, 81, 75, 80, 79, 60]);
        handleGraph("lossChart", "Loss", [90, 60, 55, 40, 10, 6, 7], [95, 60, 40, 30, 10, 9, 8]);
    })

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
    
    return (
        <main class="sm:container mx-auto">
            <div class="flex flex-col justify-center">
                <SelectModel />
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

                {/* Affichage des mauvaise prrédictions */}
                <p class="text-center text-white text-2xl">Mauvaises prédictions</p>
                <div class="grid grid-cols-3 mx-auto">
                    <BadPredictionCard url="https://assets.afcdn.com/recipe/20210514/120317_w1024h1024c1cx1060cy707.jpg" reelleClasse="Pizza" prediction="Tarte aux pommes"/>
                    <BadPredictionCard url="https://assets.afcdn.com/recipe/20130627/42230_w1024h1024c1cx1250cy1875.jpg" reelleClasse="Hamburger" prediction="Pizza"/>
                    <BadPredictionCard url="https://static.750g.com/images/1200-675/a96d46e59b4f0ab8169c7cb0cb932a84/la-cuisson.jpg" reelleClasse="Tarte aux pommes" prediction="Hamburger"/>
                </div>

                {/* Affichage des paramètres */}
                <p class="text-center text-white text-2xl">Paramètres</p>
                <div class="flex flex-col mx-auto">
                    <div class="flex flex-wrap w-96">
                        <div class="flex text-white">Learning-rate</div>
                        <div class="flex text-white pl-5">0.001</div>
                    </div>
                    <div class="flex">
                        <div class="text-white">Dropout</div>
                        <div class="text-white">0.4</div>
                    </div>
                    <div class="flex">
                        <div class="text-white">Époques</div>
                        <div class="text-white">18</div>
                    </div>
                {/* Affichage classes prédites */}

                {/* Affichage boutton entrainement */}
                </div>
            </div>
        </main>
    )
}