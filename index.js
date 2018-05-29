let selectedSp = null
let selectedFlavor = null
let performancedata = ""

function resetClass(CSSclass) {
  const alreadySelected = document.querySelectorAll(`.${CSSclass}`)
  if(alreadySelected.length > 0) {
    for(e of alreadySelected)
      e.classList.remove(CSSclass)
  }
}

function toggleSp(sp) {
  selectedSp = sp
  resetClass("selectedSPDiv")
  const div = document.querySelector(`#${sp}sp`)
  div.classList.add("selectedSPDiv")

  const subDiv = document.querySelector(`#flavors`)
  subDiv.classList.remove("hidden")
}

function toggleFlavor(flavor) {
  selectedFlavor = flavor;
  resetClass("selectedFlavorDiv")
  const div = document.querySelector(`#${flavor}flavor`)

  div.classList.add("selectedFlavorDiv")
  togglePerformanceData()
}

function togglePerformanceData() {
  const dataDiv = document.querySelector("#performancedata");
  dataDiv.classList.remove("hidden")
  callApi();
}

// Retro compat.
function selectSp(sp) {
  toggleSp(sp)
}

function selectFlavor(flavor) {
  toggleFlavor(flavor)
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
          const benchmarkingResults = data[0]["benchmarks"];
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
  // $ready()...
})()