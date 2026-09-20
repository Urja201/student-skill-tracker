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

    <div class="skill-actions">
        <button onclick="editSkill(this)">✏ Edit</button>
        <button onclick="deleteSkill(this)">🗑 Delete</button>
    </div>
`;

    skillsList.appendChild(newSkill);

    // Clear inputs
    skillNameInput.value = "";
    skillProgressInput.value = "";
    
}
function deleteSkill(button) {
    const skillCard = button.parentElement.parentElement;

    const skillName = skillCard.querySelector(".skill-header span").textContent;

    const confirmDelete = confirm("Delete " + skillName + "?");

    if (confirmDelete) {
        skillCard.remove();
    }
}


function editSkill(button) {
    const skillCard = button.parentElement.parentElement;

    const skillNameElement = skillCard.querySelector(".skill-header span:first-child");
    const progressElement = skillCard.querySelector(".skill-header span:nth-child(2)");
    const progressBar = skillCard.querySelector(".progress");

    const newProgress = prompt(
        "Enter new progress (0-100):",
        parseInt(progressElement.textContent)
    );

    if (newProgress === null) {
        return;
    }

    if (newProgress === "" || newProgress < 0 || newProgress > 100) {
        alert("Progress must be between 0 and 100.");
        return;
    }

    progressElement.textContent = newProgress + "%";
    progressBar.style.width = newProgress + "%";
}