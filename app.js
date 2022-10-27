// tab selector buttons 
const tabSelector = document.querySelector(".tab-selector");
const newPatientTab = document.querySelector("#add-new-patient");
const addSpecimenTab = document.querySelector("#add-specimen");
const showSpecimensTab = document.querySelector("#show-specimens");

// tabs to select
const patientRecordContainer = document.querySelector("#patient-record-container");
const patientSpecimensContainer = document.querySelector("#patient-specimens-container");
const patientResultsContainer = document.querySelector("#patient-results-container");

//forms 
const patientRecordContainerForm = document.getElementById("patient-record-container-form");
const patientSpecimensContainerForm = document.getElementById("patient-specimens-container-form");
// const patientRecordContainerForm = document.getElementById("patient-record-container-form");

// specific inputs 
const selectPatient = document.getElementById("select-patient")
const searchResults = document.getElementById("search-results")

// data stores
let allPatientRecords = []
let allSpecimens = []
let allPatientResults = []
let newPatientRecord = {}
let newPatientSpecimen = {}

// generic reusable functions 
	function removeAllTabButtonActiveClasses() {
		const tabButton = document.querySelectorAll(".tab-button");
		for (let i = 0; i < tabButton.length; i++) {
			tabButton[i].classList.remove("tab-active");
		}
	}

	function hideAllTabContent() {
		const tabContent = document.querySelectorAll(".tab-content");
		for (let i = 0; i < tabContent.length; i++) {
			tabContent[i].classList.add("hide");
		}
	}

	function toggleHideAndShow(selectAll, remove, add){
		const htmlSelector = document.querySelectorAll(selectAll);
		if(remove){
			for (let i = 0; i < htmlSelector.length; i++) {
				htmlSelector[i].classList.remove(remove);
			}
		}else{
			for (let i = 0; i < htmlSelector.length; i++) {
				htmlSelector[i].classList.add(add);
			}
		}
	}

	function betterToggleHideAndShow(selectAll, {remove, add}){
		const htmlSelector = document.querySelectorAll(selectAll);
		if(remove){
			for (let i = 0; i < htmlSelector.length; i++) {
				htmlSelector[i].classList.remove(remove);
			}
		}else{
			for (let i = 0; i < htmlSelector.length; i++) {
				htmlSelector[i].classList.add(add);
			}
		}
	}

	const addPatientRecord= () => {
		newPatientRecord = {}
		newPatientRecord.lastName = document.querySelector('#patientLastName').value
		newPatientRecord.firstNames = document.querySelector('#patientFirstNames').value
		newPatientRecord.patientAddress = document.querySelector('#patientAddress').value
		newPatientRecord.patientDOB = document.querySelector('#patientDOB').value
		newPatientRecord.patientCRN = document.querySelector('#patientCRN').value

		let duplicateRecord = allPatientRecords.findIndex(existingRecords => existingRecords.patientCRN === newPatientRecord.patientCRN)
	
		if(duplicateRecord === -1){
			allPatientRecords.push(newPatientRecord)
			const addNewOption = document.createElement('option')
			addNewOption.innerText = `${newPatientRecord.patientCRN} / ${newPatientRecord.patientDOB} - ${newPatientRecord.lastName}`
			selectPatient.appendChild(addNewOption)

		}else{ return }
	}

	function addSpecimensToRecord(){
		newPatientSpecimen = {}
		newPatientSpecimen.patient = document.querySelector('#select-patient').value
		newPatientSpecimen.specimen = document.querySelector('#select-specimen').value
		newPatientSpecimen.triage = document.querySelector('#select-triage').value
		newPatientSpecimen.description = document.querySelector('#sample-description').value

		let duplicateSpecimen = allSpecimens.findIndex(existingSpecimens => String(Object.values(existingSpecimens)) === String(Object.values(newPatientSpecimen)))
		// console.log(String(Object.values(newPatientSpecimen)))
		if(duplicateSpecimen === -1){
			allSpecimens.push(newPatientSpecimen)
		}
		
	}


tabSelector.addEventListener("click", (e) => {
	// console.log(e.target.id);
	switch (e.target.id) {
		case "add-new-patient":
			// removeAllTabButtonActiveClasses();
			// hideAllTabContent()
			// toggleHideAndShow(".tab-button","tab-active")
			// toggleHideAndShow(".tab-content", null, "hide")
			betterToggleHideAndShow(".tab-button",{remove:"tab-active", add:null})
			betterToggleHideAndShow(".tab-content", {remove:null, add:"hide"})
			newPatientTab.classList.add("tab-active");
			patientRecordContainer.classList.remove("hide");
			break;
			
			case "add-specimen":
			// removeAllTabButtonActiveClasses();
			// hideAllTabContent()
			// toggleHideAndShow(".tab-button","tab-active")
			// toggleHideAndShow(".tab-content", null, "hide")
			betterToggleHideAndShow(".tab-button",{remove:"tab-active", add:null})
			betterToggleHideAndShow(".tab-content", {remove:null, add:"hide"})
				addSpecimenTab.classList.add("tab-active");
				patientSpecimensContainer.classList.remove("hide");
				break;
				
				case "show-specimens":
			// removeAllTabButtonActiveClasses();
			// hideAllTabContent()
			// toggleHideAndShow(".tab-button","tab-active")
			// toggleHideAndShow(".tab-content", null, "hide")
			betterToggleHideAndShow(".tab-button",{remove:"tab-active", add:null})
			betterToggleHideAndShow(".tab-content", {remove:null, add:"hide"})
					showSpecimensTab.classList.add("tab-active");
					patientResultsContainer.classList.remove("hide");
					break;
	}
});


patientRecordContainerForm.addEventListener('submit', (e) => {
	// stop automatic page reload
	e.preventDefault();
	addPatientRecord()
	// console.log(allPatientRecords)
});

patientSpecimensContainerForm.addEventListener('submit', (e) => {
	e.preventDefault();
	addSpecimensToRecord()
	// console.log(allSpecimens)
})

const resultsTable = document.getElementById('results-table')
const defaultTable = `	
<tr>
	<th>Patient DOB / CRN</th>
	<th>Specimen Type</th>
	<th>Specimen Triage</th>
	<th>Sample Description</th>
</tr>
`

function showResults(e){

	resultsTable.innerHTML = defaultTable
	
	for(let i = 0; i < allSpecimens.length; i++){
		if(allSpecimens[i].patient.toLowerCase().includes(e.target.value)){
			let row = document.createElement('tr')

			let triage

			if(allSpecimens[i].triage.toLowerCase().includes('critical')){
				triage = 'Critical'
			}else{
				triage = allSpecimens[i].triage
			}

			let results = `
				<tr>
					<td>${allSpecimens[i].patient}</td>
					<td>${allSpecimens[i].specimen}</td>
					<td><span class="tablet tablet-${allSpecimens[i].triage.toLowerCase()}">${triage}</span></td>
					<td><p class="text-wrap">${allSpecimens[i].description}</p></td>
				</tr>
				`
				row.innerHTML = results
			resultsTable.appendChild(row)
		}
	}
}

searchResults.addEventListener('input',(e)=>{
	// console.log(e.target.value)
	if(e.target.value){
		showResults(e)
	}else{
		resultsTable.innerHTML = defaultTable
	}
})