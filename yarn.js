// Dichtewerte
const materialDichten = {
    pet: 1.38,
    pa6: 1.14,
    pa12: 1.01,
    pe: 0.95,
    pp: 0.91,
    pps: 1.35,
    pvdf: 1.78,
    peek: 1.31
  };

//Input fields
const material = document.getElementById("material");
const diameterOptions = document.getElementById("diameter-options");
let diameterField = document.getElementById("diameter");



//Buttons
const calcButton = document.getElementById("berechne");
const resetButton = document.getElementById("reset");

//Output fields
const outputMaterial = document.getElementById("output-material");
const outputDensity = document.getElementById("output-density");
const outputWeight = document.getElementById("output-weight");
const outputDiameter = document.getElementById("output-diameter");
const outputLength = document.getElementById("output-length");

let selectedMaterial = material.options[material.selectedIndex];
let selectedContent = selectedMaterial.innerText;
let selectedDensity = materialDichten[selectedMaterial.value];



//Option bei änderung anpassen
material.addEventListener("change", () => {
    selectedDensity = currentDensity();
});

diameterOptions.addEventListener("change", () => {
    let currentDiamter = parseFloat(diameterOptions.value);
    console.log(currentDiamter)
    diameterField.value = currentDiamter;
});

//Aktuelle Dichte
function currentDensity(){
    selectedMaterial = material.options[material.selectedIndex];
    selectedContent = selectedMaterial.innerText;
    selectedDensity = materialDichten[selectedMaterial.value];
    return selectedDensity;
}

//eingetragene Werte übernehmen
function outputDirect(){
    const diameterRaw = document.getElementById("diameter").value;
    const diameter = parseFloat(diameterRaw.trim().replace(",", "."));

    const weightRaw = document.getElementById("kg").value;
    const weight = parseFloat(weightRaw.trim().replace(",", "."));

    const taraRaw = document.getElementById("tara").value;
    let tara = parseFloat(taraRaw.trim().replace(",", "."));
    
    const threadsRaw = document.getElementById("threads").value;
    let threads = parseInt(threadsRaw.trim());

    outputMaterial.innerText = selectedContent;
    outputDensity.innerText = selectedDensity;
    
    if(!isNaN(diameter)){
    outputDiameter.innerHTML = diameter;
    console.log("Diameter wurde eingegeben.");
    }
    else {
        outputDiameter.innerHTML = "--";
        console.log("Diameter wurde nicht eingegeben.");
    }

    if(!isNaN(weight)){
        outputWeight.innerHTML = weight - tara;
        console.log("Gewicht wurde eingegeben.");
        }
        else {
            outputWeight.innerHTML = "--";
            console.log("Gewicht wurde nicht eingegeben.");
        }

    if(!isNaN(tara)){
        
        console.log("Tara wurde eingegeben.");
        }
        else {
            tara = 0;
            
            console.log("Tara wurde nicht eingegeben.");
        }

    if(!isNaN(threads)){
        
        console.log("Fäden wurde eingegeben.");
        }
        else {
            threads = 1;
            console.log("Fäden wurde nicht eingegeben.");
        }

    return {diameter, weight, tara, threads};

}

const initialState ={
    diameter: "",
    diameterOptions: "-",
    kg: "",
    tara: "0",
    threads: "1"
};

function lengthCalc(){
const {diameter, weight, tara, threads} = outputDirect();
outputDirect();
const nettoWeight = weight - tara;
const density = currentDensity();

const yarnLength = ((40 * nettoWeight) / (Math.PI * Math.pow(diameter, 2) * density)) / threads;

outputLength.innerHTML = yarnLength.toFixed(2);
}

//test
calcButton.addEventListener("click", lengthCalc);




