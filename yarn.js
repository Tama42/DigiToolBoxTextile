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
let diameterOptions = document.getElementById("diameter_options");
let diameterField = document.getElementById("diameter");



//Buttons
const calcButton = document.getElementById("berechne");
const resetAllButton = document.getElementById("resetAll");
const resetWeightButton = document.getElementById("resetWeight");

//Output fields
const outputMaterial = document.getElementById("output_material");
const outputDensity = document.getElementById("output_density");
const outputWeight = document.getElementById("output_weight");
const outputDiameter = document.getElementById("output_diameter");
const outputLength = document.getElementById("output_length");

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
    diameter_options: "-",
    kg: "",
    tara: "0",
    threads: "1"
};

const outputFields = {
    outputMaterial,
    outputDensity,
    outputWeight,
    outputDiameter,
    outputLength
};

function lengthCalc(){
    const {diameter, weight, tara, threads} = outputDirect();
    const nettoWeight = weight - tara;
    const density = currentDensity();
  
    const radius = diameter / 2 / 10; // mm → cm
    const crossSection = Math.PI * radius * radius * threads; // cm²
    const massInGrams = nettoWeight * 1000; // kg → g
    const volume = massInGrams / density; // cm³
    const lengthInMeters = (volume / crossSection) / 100; // cm → m
  
    outputLength.innerHTML = lengthInMeters.toFixed(2);
}

function reset(modus){
    //Modus 1 = All   2 = Weight only
    if(modus === "1"){
        console.log("Modus 1 wird ausgeführt.")
        resetInputFields(initialState);
        resetOutputFields();
    }

    if(modus === "2"){
        const subState = {kg: ""};
        resetInputFields(subState);
        resetOutputFields(["outputWeight", "outputLength"]);
    }
}

function resetInputFields(state){
    for(let key in state){
        let temp = document.getElementById(key);
        if(temp){
            temp.value = state[key];
        }
    }
}

function resetOutputFields(fieldsToReset = Object.keys(outputFields)){
    fieldsToReset.forEach(key => {
        if(outputFields[key]){
            outputFields[key].innerText = "-";
        }
    });
}

//Button-Events
calcButton.addEventListener("click", lengthCalc);
resetAllButton.addEventListener("click", () => reset("1"));
resetWeightButton.addEventListener("click", () => reset("2"));


