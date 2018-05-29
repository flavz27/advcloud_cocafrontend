let selectedSp = "toto"
let selectedFlavor = "tiny"
let performancedata = ""
let x = null
let y = null
y.style.display = "none";

function selectSp(sp) {
  selectedSp = sp;
  var alreadySelected = document.getElementById("selectedSPDiv")
  if(alreadySelected) {
    alreadySelected.removeAttribute("id")
  } //TODO fucking shit
  console.log("already selected" + alreadySelected)
  var div = document.getElementById(sp + "sp");
  div.setAttribute("id", "selectedSPDiv");
  toggleFlavorDiv();
}

function toggleFlavorDiv() {
  // var x = document.getElementById("flavors");
  x.removeAttribute('class');
}

function selectFlavor(flavor) {
  selectedFlavor = flavor;
  var div = document.getElementById(flavor + "flavor");
  var alreadySelected = document.getElementById("selectedFlavorDiv")
  if(alreadySelected){
    alreadySelected.removeAttribute("id")
  } //TODO fucking shit
  console.log("already selected" + alreadySelected)
  div.setAttribute("id", "selectedFlavorDiv");
  togglePerformanceData();

  selectedFlavor = flavor;
  var div = document.getElementById(flavor + "flavor");

  togglePerformanceData();
}

function togglePerformanceData() {
  // var y = document.getElementById("performancedata");
  y.style.display = "block";
  callApi();
}

function callApi() {
  fetch("http://lsds.hesge.ch/coca/api/v1.0/performance?serviceprovider=" + selectedSp + "&flavor=" + selectedFlavor)
    .then(function(response) {
      response.json().then(function(data) {
        console.log("i'm in the response callback")
        var benchmarkingtable = document.getElementById("performancedatatable").getElementsByTagName('tbody')[0];
        benchmarkingtable.innerHTML = "";
        console.log(benchmarkingtable);
        if(!data[0]){
          var row = benchmarkingtable.insertRow(0);
          var cell1 = row.insertCell(0);
          cell1.innerHTML = "No results (yet)"
          console.log("no results");
        } else{
          let benchmarkingResults = data[0]["benchmarks"];
          console.log(benchmarkingResults)


          for (var result in benchmarkingResults){
            var row = benchmarkingtable.insertRow(0);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = result + ". "+benchmarkingResults[result].test
            var cell2 = row.insertCell(1);
            cell2.innerHTML = benchmarkingResults[result].metric
            var cell3 = row.insertCell(2);
            cell3.innerHTML = benchmarkingResults[result].value
            var cell4 = row.insertCell(3);
            cell4.innerHTML = benchmarkingResults[result].unit
            console.log(benchmarkingResults[result].value);
          }
        }

      });
    })
    .catch(function(e) {
      console.log(e);
      // This is where you run code if the server returns any errors
    });
}


(function(){
 x = document.querySelector("#flavors");
 y = document.querySelector("#performancedata");
})();