window.addEventListener("load", function () {
    getDate();
    
    
});

document.addEventListener("DOMContentLoaded", function(){
    let rangeSlider = document.getElementById('nutzeffekt');
    let valueDisplay = document.getElementById('newert');
    
    function updateValueDisplay() {
        valueDisplay.textContent = rangeSlider.value;
        
    }
    
    rangeSlider.addEventListener("input", updateValueDisplay);
    updateValueDisplay();

    
});




function getDate(){
    const date = document.getElementById('date');
    const heute = new Date().toLocaleString('de-DE');

    date.innerHTML = heute;
    return heute;
}

function berechne(){
    const meter = document.getElementById('laenge').value;
    const pick = document.getElementById('schuss').value;
    const speed = document.getElementById('speed').value;
    const efficiency = document.getElementById('nutzeffekt').value;

    const rest = document.getElementById('rest');
    const termin = document.getElementById('termin');
    
    const mpStunde = document.getElementById('mpstunde');
    const mpSchicht = document.getElementById('mpschicht');
    const mpTag = document.getElementById('mptag');

    const hunderMeter = document.getElementById('hundertMeter');

    const date = getDate();

    
    
    
    if(meter > 0 && pick > 0 && speed > 0 && efficiency > 0){
        const restValue = runden(((meter/(speed/pick/100*60))/100*((100-efficiency)+100)));

        rest.innerHTML = restValue;

        
        const curentTime = new Date().getTime();
        const finishAt = new Date(curentTime + (restValue*60*60*1000)).toLocaleString("de-DE");

        termin.innerHTML = finishAt;

        console.log(typeof finishAt, typeof rest, typeof curentTime);
    
    }

    

    if (pick > 0 && speed > 0 && efficiency > 0){
        let mps = runden(speed/pick/100*60)
        mpStunde.innerHTML = mps;
        mpSchicht.innerHTML = runden(mps * 8);
        mpTag.innerHTML = runden(mps * 24);
        hunderMeter.innerHTML = runden(100/(speed/pick/100*60));
    }

   
}


function runden(zahl){
    let temp = zahl*100;
    temp = Math.round(temp);
    temp /= 100;
    return temp;
}

function reset(){
    const defaultEfficiency = 95;

    document.getElementById('laenge').value = null;
    document.getElementById('schuss').value = null;
    document.getElementById('speed').value = null;
    document.getElementById('nutzeffekt').value = defaultEfficiency;
    document.getElementById('newert').textContent = defaultEfficiency;

    document.getElementById('rest').innerHTML = "-";
    document.getElementById('termin').innerHTML = "-";

    document.getElementById('mpstunde').innerHTML = "-";
    document.getElementById('mpschicht').innerHTML = "-";
    document.getElementById('mptag').innerHTML = "-";
    document.getElementById('hundertMeter').innerHTML = "-";
}