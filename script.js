function addSkill() {

    const skillNameInput = document.getElementById("skillName");
    const skillProgressInput = document.getElementById("skillProgress");

    const skillName = skillNameInput.value.trim();
    const skillProgress = skillProgressInput.value;

    if (skillName === "" || skillProgress === "") {
        alert("Please enter skill name and progress.");
        return;
    }

    if (skillProgress < 0 || skillProgress > 100) {
        alert("Progress must be between 0 and 100.");
        return;
    }

    const skillsList = document.getElementById("skillsList");

    // Check for duplicate skill
    const existingSkills = skillsList.querySelectorAll(".skill-header span:first-child");

    for (let skill of existingSkills) {

        if (skill.textContent.trim().toLowerCase() === skillName.toLowerCase()) {
            alert("This skill already exists!");
            return;
        }
    }

    // Create new skill
    const newSkill = document.createElement("div");

    newSkill.className = "skill-card";

    newSkill.innerHTML = `
        <div class="skill-header">
            <span>${skillName}</span>
            <span>${skillProgress}%</span>
        </div>

        <div class="progress-bar">
            <div class="progress" style="width: ${skillProgress}%;"></div>
        </div>
    `;

    skillsList.appendChild(newSkill);

    // Clear inputs
    skillNameInput.value = "";
    skillProgressInput.value = "";
}