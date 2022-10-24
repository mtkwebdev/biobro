
const tabSelector = document.querySelector(".tab-selector");

// tab selector buttons 
const newPatient = document.querySelector("#add-new-patient");
const addSpecimen = document.querySelector("#add-specimen");
const showSpecimens = document.querySelector("#show-specimens");

// tabs to select
const patentRecordContainer = document.querySelector("#patent-record-container");
const patentSpecimensContainer = document.querySelector("#patent-specimens-container");
const patientResultsContainer = document.querySelector("#patient-results-container");

// Dry functions 
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

	tabSelector.addEventListener("click", (e) => {
		// console.log(e.target.id);
		switch (e.target.id) {
			case "add-new-patient":
				removeAllTabButtonActiveClasses();
				newPatient.classList.add("tab-active");
				hideAllTabContent()
				patentRecordContainer.classList.remove("hide");
				break;
				
				case "add-specimen":
					removeAllTabButtonActiveClasses();
					addSpecimen.classList.add("tab-active");
					hideAllTabContent()
					patentSpecimensContainer.classList.remove("hide");
					break;
					
					case "show-specimens":
						removeAllTabButtonActiveClasses();
						showSpecimens.classList.add("tab-active");
						hideAllTabContent()
						patientResultsContainer.classList.remove("hide");
						break;
		}
	});
